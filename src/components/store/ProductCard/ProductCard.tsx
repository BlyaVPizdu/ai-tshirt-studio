import type { Product } from "../../../types/tshirt"
import "./ProductCard.css"
import { Link } from "react-router-dom"

type Props = {
  product: Product
}

function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
    >
      <div className="product-image-wrapper">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
        />  
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="product-price">
          {product.price.toLocaleString()} ₸
        </p>
      </div>
    </Link>
  )
}

export default ProductCard