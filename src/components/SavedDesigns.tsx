import type {  CartItem, Design } from "../types/tshirt"
import { shirtImages } from "../constants/shirtImages"

type Props = {
savedDesigns: Design[]
deleteDesign: (id: number) => Promise<void>
editDesign: (id: number) => void
onAddCart: (id: number) => void

}

function SavedDesigns({ onAddCart, editDesign,savedDesigns, deleteDesign}: Props){
    const scale = 0.5
    
    
   
  return(
        <section>
      <div className="saved-designs">
      {savedDesigns.map((item) => (
        
      <div className ="saved-design-card" key={item.id}>
        <div className="saved-design-preview">
        <img className= "preview-shirt" src={shirtImages[item.shirtColor]}/>
        <img className= "preview-image" src= {item.image}
              style={{
                
                left: item.position.x * scale,
                top: item.position.y * scale,
                width: item.size * scale,
                transform: `rotate(${item.rotation}deg)`
              }}/>
          </div>  
        <p>Prompt: {item.prompt}</p>
        <p>Shirt: {item.shirtColor}</p>
        <p>Size: {item.size}</p>
        <p>Rotation: {item.rotation}</p>
        <button onClick={()=> deleteDesign(item.id)}>Delete</button>
        <button onClick={()=> editDesign(item.id)}>Edit</button>
        <button onClick={()=> onAddCart(item.id)}>Add to Cart</button>
        

      </div>
    ))}
    </div>
  </section>
    )
}
export default SavedDesigns