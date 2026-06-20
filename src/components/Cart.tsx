import type { CartItem, Design } from "../types/tshirt"
type Props ={
    cartItems: CartItem[]
    removeCart:  (id: number) => void
    changeQuantity:  (id: number, delta: number) => void
    savedDesigns: Design[]
    onCheckout: () => void  
}
function Cart({onCheckout, savedDesigns, cartItems, removeCart, changeQuantity}:Props){
return (
    <div>
    <h2>Cart</h2>
    <div>
    {cartItems.map(item => {
  const design = savedDesigns.find(
    d => d.id === item.designId
  )
  if (!design) {
    return null
}
   
        return (
    <div key={item.designId}>
      <p>{design.prompt}</p>
      <p>Size: {item.size}</p>
      <button onClick={() => changeQuantity(item.designId, -1)}>-</button>
      <span>{item.quantity}</span>
      <button onClick={() => changeQuantity(item.designId, +1)}>+</button>
      <button onClick={()=> removeCart(item.designId)}>Remove from Cart</button>
      <button onClick={onCheckout} disabled={cartItems.length === 0}>
      Checkout </button>
    </div>
  )
      })}
      </div>
      </div>
)
}
export default Cart