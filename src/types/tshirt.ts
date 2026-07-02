export type ShirtColor = "white" | "black" | "washed"
/*export type ShirtStyle = "oversized" | "vintage" | "classic"
*/
export type Design = {
  id: number
  prompt: string
  image: string
  shirtColor: ShirtColor
  position: {x: number, y: number}
  size: {
    width: number
    height: number
  }
  rotation: number
}
export type AiProvider = "comfy" | "flux-dev"
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
export type PlacementPreset = "center" | "left_chest" | "back"
export type PrintMode = "front" | "allOver"