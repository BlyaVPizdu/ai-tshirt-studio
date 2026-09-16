import { useState, useEffect } from "react"
import { Design } from "../../types/tshirt"

import { getDesigns } from "../../api/api"
import { useCart } from "../../context/CartContext"
import StoreHeader from "../../components/store/StoreHeader/StoreHeader"
import Cart from "../../components/Cart"

import "./CartPage.css"


function CartPage() {
  const {
    cartItems,
    changeQuantity,
    removeCart,
  } = useCart()

  const [designs, setDesigns] = useState<Design[]>([])

  useEffect(() => {
    async function loadDesigns() {
      const data = await getDesigns()

      setDesigns(data)
    }
     loadDesigns()
  }, [])
  return (
    <main className="cart-page">
      <StoreHeader />

      <section className="cart-page-content">
        <h1>YOUR CART</h1>

        <Cart
          cartItems={cartItems}
          designs={designs}
          changeQuantity={changeQuantity}
          removeCart={removeCart}
        />
      </section>
    </main>
  )
}

export default CartPage