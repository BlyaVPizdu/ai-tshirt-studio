  import { useEffect, useState } from 'react'
  import type { ShirtColor, Design } from './types/tshirt'
  import { createDesign, deleteDesignApi, getDesigns } from './api/api'
  import { generateDesignImage } from './utils/generateDesignImage'
  import './App.css'

  function App() {
    const [shirtColor, setShirtColor] = useState<ShirtColor>("white")
    const [prompt, setPrompt] = useState("")
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)
    const [size, setSize] = useState(140)
    const [rotation, setRotation] = useState(0)
    const shirtImages = {
          white: "/shirts/white.png",
          black: "/shirts/black.jpg",
          washed: "/shirts/washed.png",
    }

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
    const handleGenerate = () => {
      
         const image = generateDesignImage(prompt)
          setGeneratedImage(image)
    }
    const changeSize = (newSize: number)=>{
      const minSize = 50
    const maxSize = 300

    if (newSize < minSize) {
      setSize(minSize)
      return
    }

    if (newSize > maxSize) {
      setSize(maxSize)
      return
    }

    setSize(newSize)
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
        <h1>AI T-Shirt Studio</h1>  

        <section>
          <h2>Choose T-shirt</h2>

          <button onClick={() => setShirtColor("white")}>White</button>
          <button onClick={() => setShirtColor("black")}>Black</button>
          <button onClick={() => setShirtColor("washed")}>Washed</button>
        </section>

        <section>
          <h2>Describe your design</h2>

          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="tired knight after battle, sword down, vintage style..."
          />

          <button onClick={handleGenerate}>Generate</button>
        </section>

        <section>
          <div className="shirt-preview"
            onMouseMove={(event) => {
                if (!isDragging) return
            const rect = event.currentTarget.getBoundingClientRect()
            const newX = event.clientX - rect.left - size / 2
            const newY = event.clientY - rect.top - size / 2
            setPosition({x: Math.min(Math.max(newX, 0), 400 - size),
                        y: Math.min(Math.max(newY, 0), 500 - size)})}}
            
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}>
        <img className="shirt-image"
                    src={shirtImages[shirtColor]} alt="T-shirt"/>
        
        {generatedImage && 
        <div>
    <img className="design-image" src={generatedImage}  alt="Generated design"
      style={{ left: position.x,top: position.y, width: size, transform: `rotate(${rotation}deg)` }}
      onMouseDown = {()=>{setIsDragging(true)}}
      onDragStart={(event) => event.preventDefault()}
      />
      <button onClick={() => changeSize(size + 10)} >+</button>
      <button  onClick={() => changeSize(size - 10)}>-</button>
      <button onClick={()=>{setPosition({ x: 130, y: 130 })
        setSize(140)
        setRotation(0)
      }}>Reset design</button>
      <button onClick={()=> setRotation(rotation - 15)}>Rotate left</button>
      <button onClick={()=> setRotation(rotation + 15)}>Rotate right</button>
      <button onClick={saveDesign}>Save design</button>
        </div>
    }</div>
        </section>
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
