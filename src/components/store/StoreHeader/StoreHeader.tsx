import { Link } from "react-router-dom"
import { useCart } from "../../../context/CartContext"
import "./StoreHeader.css"

function StoreHeader() {
  const { cartItems } = useCart()

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <header className="store-header">
      <Link to="/" className="store-logo">
        AI SHIRT
      </Link>

      <nav className="store-nav">
        <Link to="/">Shop</Link>
        <Link to="/create">Create</Link>
      </nav>

      <Link
  to="/cart"
  className="store-cart-button"
>
  Cart ({cartCount})
</Link>
    </header>
  )
}

export default StoreHeader