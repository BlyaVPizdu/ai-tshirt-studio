  import { useEffect, useState } from 'react'
  import type { ShirtColor, Design, AiProvider } from './types/tshirt'
  import { createDesign, deleteDesignApi, getDesigns, updateDesign } from './api/api'
  import { generateDesignImage } from './utils/generateDesignImage'
  import './App.css'
import ShirtSelector from './components/ShirtSelector'
import ShirtPreview from './components/ShirtPreview'
import PromptForm from './components/PromptForm'
import SavedDesigns from './components/SavedDesigns'

  function App() {
    const [shirtColor, setShirtColor] = useState<ShirtColor>("white")
    const [prompt, setPrompt] = useState("")
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)
    const [size, setSize] = useState(140)
    const [rotation, setRotation] = useState(0)
    const [position, setPosition] = useState({x: 130, y: 130})
    const [isDragging, setIsDragging] = useState(false)
    const [savedDesigns, setSavedDesigns] = useState<Design[]>([])
    const [editingDesignId, setEditingDesignId] = useState<number | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedProvider, setSelectedProvider] = useState<AiProvider>("pollinations")
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
         const image = await generateDesignImage(prompt, selectedProvider)
          setGeneratedImage(image)
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
        size,
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
      size,
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
        setSize(editingDesign.size)
        setRotation(editingDesign.rotation)
        setEditingDesignId(id)
    }
     const cancelEdit = () =>{
        setEditingDesignId(null)
        setPrompt("")
        setGeneratedImage(null)
        setPosition({ x: 130, y: 130 })
        setSize(140)
        setRotation(0)
    }
    const handleUploadImage = (file: File) => {
      const imageUrl = URL.createObjectURL(file)
       setGeneratedImage(imageUrl)}
        

    return (
      <main>
        
        <ShirtSelector
        shirtColor = {shirtColor}
        setShirtColor = {setShirtColor}/>
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
       
      <ShirtPreview
      isDragging = {isDragging}
      size = {size}
      setPosition = {setPosition}
      setIsDragging = {setIsDragging}
      generatedImage = {generatedImage}
      position = {position}
      setSize= {setSize}
      setRotation = {setRotation}
      rotation = {rotation}
      saveDesign = {saveDesign}
      shirtColor={shirtColor}
      onCancelEdit = {cancelEdit}
      editingDesignId= {editingDesignId}
      />
      <SavedDesigns
      savedDesigns = {savedDesigns}
      deleteDesign= {deleteDesign}
      editDesign = {editDesign}
      />   
        </main>
        
    )
  }

  export default App
