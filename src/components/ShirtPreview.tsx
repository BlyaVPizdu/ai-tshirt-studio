import type { ShirtColor } from "../types/tshirt";
import { shirtImages } from "../constants/shirtImages";
import { toPng } from "html-to-image"
import { useRef } from "react";
type Props = {
    isDragging: boolean
    size: number
    setPosition: React.Dispatch<React.SetStateAction<{
    x: number;
    y: number;
    }>>
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
    shirtColor: ShirtColor
    generatedImage: string | null
    position: {
    x: number;
    y: number;}
    setSize: React.Dispatch<React.SetStateAction<number>>
    setRotation:  React.Dispatch<React.SetStateAction<number>>
    rotation: number
    saveDesign: () => Promise<void>
    onCancelEdit: ()=> void
    editingDesignId: number | null
}

function ShirtPreview({editingDesignId ,onCancelEdit, saveDesign, rotation, setRotation, setSize, position, isDragging,size,setPosition,setIsDragging,shirtColor, generatedImage}: Props) {
    const previewRef = useRef<HTMLInputElement>(null)
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
      const exportPreview = async ()=>{
          if (!previewRef.current) return
        const dataUrl = await toPng(previewRef.current)
        const link = document.createElement("a")
        link.href = dataUrl
        link.download = "t-shirt-design.png"
        link.click()
      }
    return(
        <section>
          <div ref={previewRef} className="shirt-preview"
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
      <button onClick={saveDesign}>{editingDesignId !== null ? "Update Design" :"Save Design"}</button>
      <button onClick={exportPreview}>Export PNG</button>
      {editingDesignId !== null && (<button onClick={onCancelEdit}>Cancel edit</button>)}
        </div>
    }</div>
        </section>
    )
}export default ShirtPreview


