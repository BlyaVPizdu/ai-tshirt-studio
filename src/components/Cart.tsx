import type { CartItem, Design, CartSize } from "../types/tshirt"
import { products } from "../data/products"
type Props ={
    cartItems: CartItem[]
    changeQuantity: (
    type: CartItem["type"],
    id: number,
    size: CartSize,
    delta: number
  ) => void

  removeCart: (
    type: CartItem["type"],
    id: number,
    size: CartSize
  ) => void
    savedDesigns: Design[]
    onCheckout: () => void  
}
function Cart({onCheckout, cartItems, removeCart, changeQuantity}:Props){
  if (cartItems.length === 0) {
    return <p>Cart is empty</p>
  }

  return (
    <section>
      <h2>Cart</h2>

      {cartItems.map(item => {
  const id =
    item.type === "product"
      ? item.productId
      : item.designId

  const product =
    item.type === "product"
      ? products.find(
          product =>
            product.id === item.productId
        )
      : null

  const design =
    item.type === "custom"
      ? savedDesigns.find(
          design =>
            design.id === item.designId
        )
      : null

  const name =
    item.type === "product"
      ? product?.name
      : "Custom T-shirt"

  const image =
    item.type === "product"
      ? product?.image
      : design?.image

  const price =
    item.type === "product"
      ? product?.price
      : 14990

  return (
    <div
      key={`${item.type}-${id}-${item.size}`}
      className="cart-item"
    >
      {image && (
        <img
          src={image}
          alt={name}
          className="cart-item-image"
        />
      )}

      <div className="cart-item-info">
        <h3>{name}</h3>

        <p>Size: {item.size}</p>

        {price !== undefined && (
          <p>
            {price.toLocaleString()} ₸
          </p>
        )}

        <div className="cart-quantity">
          <button
            onClick={() =>
              changeQuantity(
                item.type,
                id,
                item.size,
                -1
              )
            }
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() =>
              changeQuantity(
                item.type,
                id,
                item.size,
                1
              )
            }
          >
            +
          </button>
        </div>

        <button
          onClick={() =>
            removeCart(
              item.type,
              id,
              item.size
            )
          }
        >
          Remove
        </button>
      </div>
    </div>
  )
})}

      <button onClick={onCheckout}>
        Checkout
      </button>
    </section>
  )
}
export default Cart