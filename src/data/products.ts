import type { Product } from "../types/tshirt"

export const products: Product[] = [
  {
    id: 1,
    name: "Tired Knight",
    price: 12990,
    image: "/products/tired-knight.png",
    category: "Knight",
  },
  {
    id: 2,
    name: "Try Alone",
    price: 11990,
    image: "/products/try-alone.png",
    category: "Graphic",
  },
  {
    id: 3,
    name: "Dark Flowers",
    price: 12990,
    image: "/products/dark-flowers.png",
    category: "Graphic",
  },
  {
    id: 4,
    name: "No Signal",
    price: 10990,
    image: "/products/no-signal.png",
    category: "Minimal",
  },
]