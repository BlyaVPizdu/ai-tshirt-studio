import { Link } from "react-router-dom"
import ProductCard from "../../components/store/ProductCard/ProductCard"
import { products } from "../../data/products"
import "./HomePage.css"
import StoreHeader from "../../components/store/StoreHeader/StoreHeader"
function HomePage() {
  return (
    <main className="store">
     <StoreHeader />

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