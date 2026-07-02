  import { useEffect, useState, useRef } from 'react'
  import type { ShirtColor, Design, AiProvider, CartItem, PrintMode } from './types/tshirt'
  import { uploadImage, createDesign, deleteDesignApi, getDesigns, updateDesign } from './api/api'
  import { generateDesignImage } from './utils/generateDesignImage'
  import './App.css'
import ShirtSelector from './components/editor/PreviewPanel/ShirtSelector'
import ShirtPreview from './components/editor/PreviewPanel/ShirtPreview'
import PromptForm from './components/editor/PromptPanel/PromptPanel'
import SavedDesigns from './components/SavedDesigns'
import Cart from './components/Cart'
import ChekoutForm from './components/CheckoutForm'
import { getAutoPlacementApi, applyDesignCommandApi } from './api/api'
import PropertiesPanel from './components/editor/PropertiesPanel/PropertiesPanel'
import { toPng } from "html-to-image"



  function App() {
    const [shirtColor, setShirtColor] = useState<ShirtColor>("white")
    const [prompt, setPrompt] = useState("")
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)
    const [designSize, setDesignSize] = useState({width: 260,height: 260})
    const [rotation, setRotation] = useState(0)
    const [position, setPosition] = useState({x: 0, y: 0})
    const [isDragging, setIsDragging] = useState(false)
    const [savedDesigns, setSavedDesigns] = useState<Design[]>([])
    const [editingDesignId, setEditingDesignId] = useState<number | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedProvider, setSelectedProvider] = useState<AiProvider>("comfy")
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [placementCommand, setPlacementCommand] = useState("")
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
    const [baseDesignSize, setBaseDesignSize] = useState({ width: 260, height: 320 })
    const [scale, setScale] = useState(1)
    const [printMode, setPrintMode] = useState<PrintMode>("front")
    useEffect(()=>{
      const loadDesigns = async ()=>{
          const data = await getDesigns()
          setSavedDesigns(data)
      }
      loadDesigns()
    }, [])
    const handleGenerate = async () => {
      try{
        setError(null)
          setIsGenerating(true)
          if (!prompt.trim()) {
           setError("Please enter a prompt")
             return
          }
         const image =  "/mockups/test-design.jpg"/*await generateDesignImage(prompt, selectedProvider)*/
        
          setGeneratedImage(image)
          const img = new Image()

img.onload = () => {
const SHIRT_WIDTH = 600
const SHIRT_HEIGHT = 700

  const ratio = img.width / img.height

let width = SHIRT_WIDTH
let height = width / ratio

 if (height < SHIRT_HEIGHT) {
  height = SHIRT_HEIGHT
  width = height * ratio
}
  setDesignSize({ width, height })
  setPosition({
  x: (SHIRT_WIDTH - width) / 2,
  y: (SHIRT_HEIGHT - height) / 2,
})
}

img.src = image
          setRotation(0)
          /*const placement = await getAutoPlacementApi()
          
          setPosition(placement.position)
          setSize(placement.size)
          setRotation(placement.rotation)*/
      }
      catch(error){
          setError(error instanceof Error ? error.message : "Could not generate image")
      }
      finally{
           setIsGenerating(false)
      }  
    }
    
  const saveDesign = async () => {
    if(!generatedImage){
    return
  }
    if(editingDesignId !== null){
      const existingDesign = savedDesigns.find(p => p.id === editingDesignId)
      if(!existingDesign) return
      const updatedDesign: Design = {
        ...existingDesign,
        prompt,
         image: generatedImage,
        shirtColor,
        position, 
        size: designSize,
        rotation
      }
      const savedDesign = await updateDesign(editingDesignId, updatedDesign)
      setSavedDesigns((p=>p.map(r=>r.id === editingDesignId ? savedDesign :r)))
      setEditingDesignId(null)
    }
  else {
    const design = {
      prompt,
      image: generatedImage,
      shirtColor,
      position, 
      size: designSize,
      rotation
    }
    const savedDesign = await createDesign(design)
    setSavedDesigns([...savedDesigns, savedDesign])
  }
    }
    const deleteDesign = async (id: number) => {
        await deleteDesignApi(id)
        setSavedDesigns(prev => prev.filter((item)=> item.id !== id))
  }
    const editDesign = (id: number) => {
        const editingDesign =savedDesigns.find(prev=> prev.id === id)
        if(!editingDesign) return
        setPrompt(editingDesign.prompt)
        setGeneratedImage(editingDesign.image)
        setShirtColor(editingDesign.shirtColor)
        setPosition(editingDesign.position)
        setDesignSize(editingDesign.size)
        setRotation(editingDesign.rotation)
        setEditingDesignId(id)
    }
     const cancelEdit = () =>{
        setEditingDesignId(null)
        setPrompt("")
        setGeneratedImage(null)
        setPosition({ x: 130, y: 130 })
        setDesignSize({ width: 140, height: 140 })
        setRotation(0)
    }
    const handleUploadImage = async (file: File) => {
  try {
    setError(null)

    const uploaded = await uploadImage(file)

    setGeneratedImage(`http://localhost:3002${uploaded.imageUrl}`)
    
  } catch {
    setError("Could not upload image")
  }
}   
      const addCart = (id: number) => {
  setCartItems(prev => {
    const existingItem = prev.find(item => item.designId === id)

    if (existingItem) {
      return prev.map(item =>
        item.designId === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }

    const cartItem: CartItem = {
      designId: id,
      quantity: 1,
      size: "M"
    }

    return [...prev, cartItem]
  })
}
        const removeCart = (id: number)=>{
          setCartItems(prev => prev.filter(c=> c.designId !== id))
        }
        const changeQuantity = (id: number, delta: number) =>{
           setCartItems(prev => {
          const changegQuantity = prev.map(item => 
          item.designId === id
          ? { ...item, quantity: item.quantity + delta }
          : item )
          return changegQuantity.filter(item=> item.quantity>0)
   })
        }
        /*const handleApplyPlacementCommand = async () => {
  const result = await applyDesignCommandApi({
    command: placementCommand,
    position,
    size: designSize,
    rotation,
  })

  setPosition(result.position)
  setDesignSize(result.size)
  setRotation(result.rotation)
}*/

const previewRef = useRef<HTMLDivElement>(null)
    
      const exportPreview = async ()=>{
          if (!previewRef.current) return
        const dataUrl = await toPng(previewRef.current)
        const link = document.createElement("a")
        link.href = dataUrl
        link.download = "t-shirt-design.png"
        link.click()
      }
        
        /* после shirtpreview <PropertiesPanel
  position = {position}
  saveDesign={saveDesign}
  setSize = {setDesignSize}
  designSize = {designSize}
  setPosition = {setPosition}
  setRotation = {setRotation}
  exportPreview = {exportPreview}
  placementCommand= {placementCommand}
  setPlacementCommand={setPlacementCommand}
  onApplyPlacementCommand = {handleApplyPlacementCommand}
  rotation={rotation}
  editingDesignId={editingDesignId}
  onCancelEdit={cancelEdit}
  />*/

    return (
      <main className='app'>
        <header className='app-header'>
        {isCheckoutOpen && (
        <ChekoutForm
          onCancel={() => setIsCheckoutOpen(false)}
          onPlaceOrder={(data) => {
            console.log(data)
           }}
           />
            )}
            
        <Cart
          cartItems = {cartItems}
          changeQuantity = {changeQuantity}
          removeCart={removeCart}
          savedDesigns = {savedDesigns}
          onCheckout={() => setIsCheckoutOpen(true)}
        />
        </header>
        
        <section className="editor-layout">
          
        <PromptForm
        onUploadImage = {handleUploadImage}
        prompt = {prompt}
        onPromptChange = {setPrompt}
        onGenerate = {handleGenerate}
        isGenerating = {isGenerating}
        error = {error}
        onProviderChange = {setSelectedProvider}
        selectedProvider = {selectedProvider}
        />
        <section className='preview-panel'>
       <ShirtSelector
        shirtColor = {shirtColor}
        setShirtColor = {setShirtColor}/>
      <ShirtPreview
      isDragging = {isDragging}
      designSize = {designSize}
      setPosition = {setPosition}
      setIsDragging = {setIsDragging}
      generatedImage = {generatedImage}
      position = {position}
      rotation = {rotation}
      shirtColor={shirtColor}
      editingDesignId= {editingDesignId}
      previewRef = {previewRef}
      scale = {scale}
      setScale = {setScale}
      printMode={printMode}
      setPrintMode={setPrintMode}
      />
      </section>
      
  

  </section>
  <section className="saved-designs-section">
      <SavedDesigns
      savedDesigns = {savedDesigns}
      deleteDesign= {deleteDesign}
      editDesign = {editDesign}
      onAddCart = {addCart}
      />
      </section>   
        </main>
        
    )
  }

  export default App
