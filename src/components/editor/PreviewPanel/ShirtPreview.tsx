import type { ShirtColor, PrintMode } from "../../../types/tshirt";
import { shirtImages } from "../../../constants/shirtImages";
import "./PreviewPanel.css";
import { useState } from "react";
type Props = {
    isDragging: boolean
    designSize: {width: number, height: number}
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
    setScale: React.Dispatch<React.SetStateAction<number>>
    printMode: PrintMode
    onPrintModeChange: (mode: PrintMode) => void
    baseDesignSize: {
    width: number;
    height: number;
}
}

function ShirtPreview({baseDesignSize, onPrintModeChange, printMode, setScale ,designSize, previewRef, rotation, position, isDragging,setPosition,setIsDragging,shirtColor, generatedImage}: Props) {
const [isResizing, setIsResizing] = useState(false)
  const finalWidth = designSize.width
const finalHeight = designSize.height

     
    return(
        <section>
         <p
  style={{
    position: "absolute",
    zIndex: 9999,
    color: "red"
  }}
>
  {finalWidth} x {finalHeight}
</p>
         <div ref={previewRef} className="shirt-preview">
  <div className="shirt-canvas">
    <img
      className="shirt-image"
      src={shirtImages[shirtColor]}
      alt="T-shirt"
    />

  <div
  className={printMode === "allOver" ? "full-shirt-area" : "front-print-area"}
    onMouseMove={(event) => {
      if (isResizing) {
  const rect = event.currentTarget.getBoundingClientRect()

  const newScale =
    (event.clientX - rect.left) / baseDesignSize.width

  setScale(
    Math.min(
      1,
      Math.max(0.3, newScale)
    )
  )

  return
}
    if (!isDragging) return

    const rect = event.currentTarget.getBoundingClientRect()

    const newX = event.clientX - rect.left - finalWidth / 2
    const newY = event.clientY - rect.top - finalHeight / 2

    const minX = Math.min(0, rect.width - finalWidth)
    const maxX = Math.max(0, rect.width - finalWidth)

    const minY = Math.min(0, rect.height - finalHeight)
    const maxY = Math.max(0, rect.height - finalHeight)

    setPosition({
      x: Math.min(Math.max(newX, minX), maxX),
      y: Math.min(Math.max(newY, minY), maxY),
    })
  }}
  onMouseUp={() => {setIsDragging(false) 
                    setIsResizing(false)}}
  onMouseLeave={() =>  {
  setIsDragging(false)
  setIsResizing(false)
}}
>


  {generatedImage && ( <>
    <img
      className="design-image"
      src="/mockups/test-design.jpg"
      alt="Generated design"
      style={{
        left: position.x,
        top: position.y,
        width: finalWidth,
        height: finalHeight,
        transform: `rotate(${rotation}deg)`
      }}
      onMouseDown={() => {
  setIsResizing(true)
}}
      onDragStart={(event) => event.preventDefault()}
    />
    <div
      className="resize-handle"
      style={{
  left: position.x + finalWidth - 20,
  top: position.y + finalHeight - 20,
}}
 onMouseDown={(event) => {
  event.stopPropagation()
  setIsResizing(true)
}}
    />
  </>
  )}  
</div>
   <img className="shirt-overlay" src={shirtImages[shirtColor]} alt="" />
  </div>
</div>
        </section>
    )
}export default ShirtPreview


