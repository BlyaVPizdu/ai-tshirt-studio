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
export type AiProvider = "pollinations" | "openai" | "comfy"