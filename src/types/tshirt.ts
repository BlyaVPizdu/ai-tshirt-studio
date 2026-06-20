export type ShirtColor = "white" | "black" | "washed"
/*export type ShirtStyle = "oversized" | "vintage" | "classic"
*/
export type Design = {
  id: number
  prompt: string
  image: string
  shirtColor: ShirtColor
  position: {x: number, y: number}
  size: number
  rotation: number
}
export type AiProvider = "comfy"
export type Order = {
  id: number
  items: CartItem[]
  designId: number
  customerName: string
  phone: string
  address: string
  status: "new" | "in_progress" | "done"
  totalPrice: number
}
export type CartItem = {
  designId: number
  quantity: number
  size: "S" | "M" | "L" | "XL"
}
export type CheckoutData = {
  customerName: string
  phone: string
  address: string
}