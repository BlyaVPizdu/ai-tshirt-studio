import type { ShirtColor } from "../../../types/tshirt";
import { shirtImages } from "../../../constants/shirtImages";
import "./PreviewPanel.css";
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
    rotation: number
    editingDesignId: number | null  
    previewRef: React.RefObject<HTMLDivElement | null>
    onAutoPlace: (x: number, y: number) => void
}

function ShirtPreview({onAutoPlace, previewRef, rotation, position, isDragging,size,setPosition,setIsDragging,shirtColor, generatedImage}: Props) {
    const shirtImageRef = useRef<HTMLImageElement | null>(null)
     const centerDesignOnShirt = () => {
  if (!shirtImageRef.current || !previewRef.current) return

  const shirtRect = shirtImageRef.current.getBoundingClientRect()
  const previewRect = previewRef.current.getBoundingClientRect()

  const shirtX = shirtRect.left - previewRect.left
  const shirtY = shirtRect.top - previewRect.top

  const x = shirtX + shirtRect.width / 2 - size / 2
  const y = shirtY + shirtRect.height * 0.35 - size / 2

  onAutoPlace(x, y)
}
    return(
        <section>
          <div ref={previewRef} className="shirt-preview"
            onMouseMove={(event) => {
                if (!isDragging) return
            const rect = event.currentTarget.getBoundingClientRect()
            const newX = event.clientX - rect.left - size / 2
            const newY = event.clientY - rect.top - size / 2
            const maxX = rect.width - size
            const maxY = rect.height - size

          setPosition({
        x: Math.min(Math.max(newX, 0), maxX),
       y: Math.min(Math.max(newY, 0), maxY)
      })}}
            
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}>
              
        <img ref={shirtImageRef} className="shirt-image"
                    src={shirtImages[shirtColor]} alt="T-shirt"/>
                    
        
        {generatedImage && (
  <img
    className="design-image"
    src={generatedImage}
    alt="Generated design"
    style={{
      left: position.x,
      top: position.y,
      width: size,
      transform: `rotate(${rotation}deg)`
    }}
    onLoad={centerDesignOnShirt}
    onMouseDown={() => setIsDragging(true)}
    onDragStart={(event) => event.preventDefault()}
  />
)}
</div>
        </section>
    )
}export default ShirtPreview


