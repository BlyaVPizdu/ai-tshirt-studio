type LlmPlacementInput = {
  command: string
  position: { x: number; y: number }
  size: number
  rotation: number
}

export async function getPlacementCommandFromLlm(input: LlmPlacementInput) {
  return {
    moveX: 0,
    moveY: -10,
    scale: 1,
    rotate: 0,
  }
}