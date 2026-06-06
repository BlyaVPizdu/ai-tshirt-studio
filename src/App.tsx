  import { useEffect, useState } from 'react'
  import type { ShirtColor, Design } from './types/tshirt'
  import { createDesign, deleteDesignApi, getDesigns } from './api/api'
  import { generateDesignImage } from './utils/generateDesignImage'
  import './App.css'
import ShirtSelector from './components/ShirtSelector'
import ShirtPreview from './components/ShirtPreview'

  function App() {
    const [shirtColor, setShirtColor] = useState<ShirtColor>("white")
    const [prompt, setPrompt] = useState("")
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)
    const [size, setSize] = useState(140)
    const [rotation, setRotation] = useState(0)
    

    const [position, setPosition] = useState({x: 130, y: 130})
    const [isDragging, setIsDragging] = useState(false)
    const [savedDesigns, setSavedDesigns] = useState<Design[]>([])
    useEffect(()=>{
      const loadDesigns = async ()=>{
          const data = await getDesigns()
          setSavedDesigns(data)
      }
      loadDesigns()
    }, [])
    const handleGenerate = async () => {
      
         const image = await generateDesignImage(prompt)
         console.log(image)
          setGeneratedImage(image)
    }
    
  const saveDesign = async () => {
    if(!generatedImage){
    return
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

    

    return (
      <main>
        <ShirtSelector
        shirtColor = {shirtColor}
        setShirtColor = {setShirtColor}/>
        <section>
          <h2>Describe your design</h2>

          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="tired knight after battle, sword down, vintage style..."
          />

          <button onClick={handleGenerate}>Generate</button>
        </section>
      <ShirtPreview
      isDragging = {isDragging}
      size = {size}
      setPosition = {setPosition}
      setIsDragging = {setIsDragging}
      shirtColor = {shirtColor}
      generatedImage = {generatedImage}
      position = {position}
      setSize= {setSize}
      setRotation = {setRotation}
      rotation = {rotation}
      saveDesign = {saveDesign}
      />
        
        <section>
      {savedDesigns.map((item) => (
      <div key={item.id}>
        <p>Prompt: {item.prompt}</p>
        <p>Shirt: {item.shirtColor}</p>
        <p>Size: {item.size}</p>
        <p>Rotation: {item.rotation}</p>
        <button onClick={()=> deleteDesign(item.id)}>Delete</button>
      </div>
      
    ))}
  </section>
        </main>
        
    )
  }

  export default App
