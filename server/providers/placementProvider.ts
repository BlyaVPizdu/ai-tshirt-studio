import { getPlacementCommandFromLlm } from "./llmPlacementProvider"
type ApplyPlacementInput = {
  command: string
  position: { x: number; y: number }
  size: number
  rotation: number
}
export async function applyPlacementCommand(input: ApplyPlacementInput) {
  let x = input.position.x
  let y = input.position.y
  let size = input.size
  let rotation = input.rotation

  
  const aiCommand = await getPlacementCommandFromLlm(input)
  console.log("AI COMMAND:", aiCommand)

x = x + aiCommand.moveX
y = y + aiCommand.moveY
size = size * aiCommand.scale
rotation = rotation + aiCommand.rotate

  size = Math.min(Math.max(size, 50), 300)
  x = Math.min(Math.max(x, 0), 400 - size)
  y = Math.min(Math.max(y, 0), 500 - size)

  return {
    position: { x, y },
    size,
    rotation,
    editImage: aiCommand.editImage,
  editPrompt: aiCommand.editPrompt,
  }
}
export function getAutoPlacement() {
  return {
    position: { x: 115, y: 120 },
    size: 170,
    rotation: 0,
  }
}
type AiCommandInput = {
  command: string
}

export function parseDesignCommand(input: AiCommandInput) {
  const text = input.command.toLowerCase()
  const percentMatch = text.match(/(\d+)%/)
  const percent = percentMatch ? Number(percentMatch[1]) : null
  let moveX = 0
  let moveY = 0
  let scale = 1
  let rotate = 0

  if (text.includes("чуть выше")) moveY = -10
  else if (text.includes("выше")) moveY = -20

  if (text.includes("чуть ниже")) moveY = 10
  else if (text.includes("ниже")) moveY = 20

  if (text.includes("левее")) moveX = -20
  if (text.includes("правее")) moveX = 20

  if (text.includes("больше")) scale = 1.1
  if (text.includes("меньше")) scale = 0.9

  if (text.includes("вправо")) rotate = 15
  if (text.includes("влево")) rotate = -15

if (percent !== null) {
  if (text.includes("меньше") || text.includes("уменьш")) {
    scale = 1 - percent / 100
  }

  if (text.includes("больше") || text.includes("увелич")) {
    scale = 1 + percent / 100
  }
} else {
  if (text.includes("больше")) scale = 1.1
  if (text.includes("меньше")) scale = 0.9
}

  return {
    moveX,
    moveY,
    scale,
    rotate,
    
  }
}