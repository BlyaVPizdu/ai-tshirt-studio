import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"
import type {
  CartItem,
  CartSize
} from "../types/tshirt"


type CartContextType = {
  cartItems: CartItem[]

  addProduct: (
    productId: number,
    size: CartSize
  ) => void

  addCustomDesign: (
    designId: number,
    size?: CartSize
  ) => void

  removeCart: (
    type: CartItem["type"],
    id: number,
    size: CartSize
  ) => void

  changeQuantity: (
    type: CartItem["type"],
    id: number,
    size: CartSize,
    delta: number
  ) => void
}

const CartContext = createContext<CartContextType | null>(
  null
)

type Props = {
  children: ReactNode
}

export function CartProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const addProduct = (
  productId: number,
  size: CartSize
) => {
  setCartItems(prev => {
    const existingItem = prev.find(
      item =>
        item.type === "product" &&
        item.productId === productId &&
        item.size === size
    )

    if (existingItem) {
      return prev.map(item =>
        item.type === "product" &&
        item.productId === productId &&
        item.size === size
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    }

    const newItem: CartItem = {
      type: "product",
      productId,
      size,
      quantity: 1,
    }

    return [...prev, newItem]
  })
}
const addCustomDesign = (
  designId: number,
  size: CartSize = "M"
) => {
  setCartItems(prev => {
    const existingItem = prev.find(
      item =>
        item.type === "custom" &&
        item.designId === designId &&
        item.size === size
    )

    if (existingItem) {
      return prev.map(item =>
        item.type === "custom" &&
        item.designId === designId &&
        item.size === size
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    }

    const newItem: CartItem = {
      type: "custom",
      designId,
      size,
      quantity: 1,
    }

    return [...prev, newItem]
  })
}


  const removeCart = (
  type: CartItem["type"],
  id: number,
  size: CartSize
) => {
  setCartItems(prev =>
    prev.filter(item => {
      if (type === "product") {
        return !(
          item.type === "product" &&
          item.productId === id &&
          item.size === size
        )
      }

      return !(
        item.type === "custom" &&
        item.designId === id &&
        item.size === size
      )
    })
  )
}

  const changeQuantity = (
  type: CartItem["type"],
  id: number,
  size: CartSize,
  delta: number
) => {
  setCartItems(prev => {
    const updatedItems = prev.map(item => {
      if (
        type === "product" &&
        item.type === "product" &&
        item.productId === id &&
        item.size === size
      ) {
        return {
          ...item,
          quantity: item.quantity + delta,
        }
      }

      if (
        type === "custom" &&
        item.type === "custom" &&
        item.designId === id &&
        item.size === size
      ) {
        return {
          ...item,
          quantity: item.quantity + delta,
        }
      }

      return item
    })

    return updatedItems.filter(
      item => item.quantity > 0
    )
  })
}

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addProduct,
        addCustomDesign,
        removeCart,
        changeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    )
  }

  return context
}