import type { CartItem, CartSize, Design } from "../types/tshirt"
import { products } from "../data/products"
import { CUSTOM_TSHIRT_PRICE } from "../config/pricing"
type Props ={
    cartItems: CartItem[]
    designs: Design[]

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
}
function Cart({ cartItems, designs, removeCart, changeQuantity}:Props){
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
        
  const design =
  item.type === "custom"
    ? designs.find(
        design => design.id === item.designId
      )
    : null

  const product =
    item.type === "product"
      ? products.find(
          product =>
            product.id === item.productId
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
      : CUSTOM_TSHIRT_PRICE
  
  const totalPrice = cartItems.reduce((total, item) => {
  if (item.type === "product") {
    const product = products.find(
      product => product.id === item.productId
    )

    if (!product) {
      return total
    }

    return total + product.price * item.quantity
  }

  return total + CUSTOM_TSHIRT_PRICE * item.quantity
}, 0)
const totalItems = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
)
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
        <div className="cart-total">
  <span>Total</span>

  <strong>
    {totalPrice.toLocaleString()} ₸
  </strong>
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