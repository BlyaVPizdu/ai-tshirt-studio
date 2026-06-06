import type{ ShirtColor } from "../types/tshirt"
type Props = {
    shirtColor: ShirtColor
    setShirtColor: React.Dispatch<React.SetStateAction<ShirtColor>>
}
function ShirtSelector({shirtColor, setShirtColor}: Props){
    /*
    
    }*/
    return(
        <div>
        <h1>AI T-Shirt Studio</h1>  
        <section>
          <h2>Choose T-shirt</h2>

          <button onClick={() => setShirtColor("white")}>White</button>
          <button onClick={() => setShirtColor("black")}>Black</button>
          <button onClick={() => setShirtColor("washed")}>Washed</button>
        </section>
        </div>
    )   

}
export default ShirtSelector
