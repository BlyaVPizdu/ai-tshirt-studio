import { useState } from 'react'
import type { ShirtColor } from './types/tshirt'
import './App.css'

function App() {
  const [shirtColor, setShirtColor] = useState<ShirtColor>("white")
  const [prompt, setPrompt] = useState("")
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const shirtImages = {
         white: "/shirts/white.png",
         black: "/shirts/black.jpg",
         washed: "/shirts/washed.png",
  }
  const [position, setPosition] = useState({x: 130, y: 130})
  const [isDragging, setIsDragging] = useState(false)
  const handleGenerate = () => {
    setGeneratedImage("/mockups/EByblODXYAEO4sY.jpg")
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
          setPosition({x: event.clientX - rect.left - 70,
                      y: event.clientY - rect.top - 70})}}
          
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}>
      <img className="shirt-image"
                  src={shirtImages[shirtColor]} alt="T-shirt"/>
       {generatedImage && 
  ( <img className="design-image" src={generatedImage}  alt="Generated design"
    style={{ left: position.x,top: position.y}}
    onMouseDown = {()=>{setIsDragging(true)}}
    onDragStart={(event) => event.preventDefault()}/>
  )
  
  }</div>
      </section>
      </main>
  )
}

export default App
