import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { products } from "../../data/products"
import "./ProductPage.css"
import { useCart } from "../../context/CartContext"
import { CartSize } from "../../types/tshirt"

type Size = "S" | "M" | "L" | "XL"

function ProductPage() {
    const { addProduct, cartItems } = useCart()
  const { id } = useParams()

  const [selectedSize, setSelectedSize] = useState<CartSize>("M")

  const product = products.find(
    item => item.id === Number(id)
  )
  const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
)

  if (!product) {
    return (
      <main>
        <h1>Product not found</h1>

        <Link to="/">
          Back to shop
        </Link>
      </main>
    )
  }

  return (
    <main className="product-page">
      <header className="product-header">
        <Link to="/" className="logo">
          AI SHIRT
        </Link>

        <nav>
          <Link to="/">Shop</Link>
          <Link to="/create">Create</Link>
        </nav>

        <button>
          Cart ({cartCount})
        </button>
      </header>

      <section className="product-layout">
        <div className="product-page-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-details">
          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <p className="product-page-price">
            {product.price.toLocaleString()} ₸
          </p>

          <div className="size-section">
            <p>Size</p>

            <div className="size-options">
              {(["S", "M", "L", "XL"] as CartSize[]).map(
                size => (
                  <button
                    key={size}
                    className={
                      selectedSize === size
                        ? "size-button active"
                        : "size-button"
                    }
                    onClick={() =>
                      setSelectedSize(size)
                    }
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div>

          <button
            className="add-to-cart-button"
           onClick={() => {
  addProduct(product.id, selectedSize)
}}
          >
            ADD TO CART
          </button>

          <Link
            to="/create"
            className="customize-link"
          >
            Or create your own design
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ProductPage