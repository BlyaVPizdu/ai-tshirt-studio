import type { ShirtColor, PrintMode } from "../../../types/tshirt";
import { shirtImages } from "../../../constants/shirtImages";
import "./PreviewPanel.css";
import { useRef } from "react";
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
    scale: number
    setScale: React.Dispatch<React.SetStateAction<number>>
    printMode: PrintMode
    setPrintMode: React.Dispatch<React.SetStateAction<PrintMode>>
}

function ShirtPreview({printMode, setPrintMode, setScale, scale ,designSize, previewRef, rotation, position, isDragging,setPosition,setIsDragging,shirtColor, generatedImage}: Props) {
  const finalWidth = designSize.width * scale
const finalHeight = designSize.height * scale

     
    return(
        <section>
         <button
  onClick={() => {
    setPrintMode("front")
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }}
>
  Front Print
</button>

<button
  onClick={() => {
    setPrintMode("allOver")
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }}
>
  All Over
</button>
         <div ref={previewRef} className="shirt-preview">
  <div className="shirt-canvas">
    <img
      className="shirt-image"
      src={shirtImages[shirtColor]}
      alt="T-shirt"
    />

  <div
  className={printMode === "allOver" ? "full-shirt-area" : "front-print-area"}
>
  <p style={{ position: "absolute", zIndex: 999, color: "red" }}>
    {printMode}
  </p>

  {generatedImage && (
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
      onMouseDown={() => setIsDragging(true)}
      onDragStart={(event) => event.preventDefault()}
    />
  )}
</div>
  </div>
</div>
        </section>
    )
}export default ShirtPreview


