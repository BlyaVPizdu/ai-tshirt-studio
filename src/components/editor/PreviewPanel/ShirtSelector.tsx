import type{ ShirtColor } from "../../../types/tshirt"
import { Check } from "lucide-react"
import "./PreviewPanel.css";
type Props = {
    shirtColor: ShirtColor
    setShirtColor: React.Dispatch<React.SetStateAction<ShirtColor>>
}
function ShirtSelector({shirtColor, setShirtColor}: Props){

    return(
        <div className="shirt-selector"> 
          <h2 className="shirt-name">Choose Shirt Color</h2>
           <div className="shirt-buttons">
        {(["white", "black", "washed"] as ShirtColor[]).map((color) => (
          <button
            key={color}
            onClick={() => setShirtColor(color)}
            className={
              shirtColor === color
                ? "shirt-button shirt-button-active"
                : "shirt-button"
            }
          >
            {color[0].toUpperCase() + color.slice(1)}

            {shirtColor === color && <Check size={16} />}
          </button>
        ))}
      </div>
        </div>
    )   

}
export default ShirtSelector
