import { Link } from "react-router-dom"
import ProductCard from "../../components/store/ProductCard/ProductCard"
import { products } from "../../data/products"
import "./HomePage.css"

function HomePage() {
  return (
    <main className="store">
      <header className="store-header">
        <Link to="/" className="logo">
          AI SHIRT
        </Link>

        <nav>
          <Link to="/">Shop</Link>
          <Link to="/create">Create</Link>
        </nav>

        <button className="cart-button">
          Cart (0)
        </button>
      </header>

      <section className="hero">
        <p className="hero-label">CREATE. WEAR. REPEAT.</p>

        <h1>
          WEAR YOUR
          <br />
          IDEA
        </h1>

        <p>
          Original drops and designs created by you.
        </p>

        <Link to="/create" className="create-button">
          CREATE YOUR OWN
        </Link>
      </section>

      <section className="catalog">
        <div className="catalog-heading">
          <h2>NEW DROPS</h2>
          <span>{products.length} products</span>
        </div>

        <div className="product-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage