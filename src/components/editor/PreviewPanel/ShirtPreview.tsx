import type { ShirtColor } from "../../../types/tshirt";
import { shirtImages } from "../../../constants/shirtImages";
import "./PreviewPanel.css";

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
    rotation: number
    editingDesignId: number | null  
    previewRef: React.RefObject<HTMLDivElement | null>
}

function ShirtPreview({previewRef, rotation, position, isDragging,size,setPosition,setIsDragging,shirtColor, generatedImage}: Props) {
    
     
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
      
        </div>
    }</div>
        </section>
    )
}export default ShirtPreview


