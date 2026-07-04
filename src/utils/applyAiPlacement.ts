type PlacementCommandInput = {
  command: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
}

type PlacementCommandResult = {
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
}
export function applyAiPlacement(input: PlacementCommandInput): PlacementCommandResult {
  const command = input.command.toLowerCase()

  let x = input.position.x
  let y = input.position.y
  let width = input.size.width
  let height = input.size.height
  let rotation = input.rotation
  function clamp(value: number, min: number, max: number) {
  
    return Math.min(Math.max(value, min), max)
}

  if (command.includes("выше")) y -= 20
  if (command.includes("ниже")) y += 20
  if (command.includes("левее")) x -= 20
  if (command.includes("правее")) x += 20
  if (command.includes("больше"))  {width += 20,height += 20}
  if (command.includes("меньше")) {width -= 20,height -= 20}
  if (command.includes("вправо")) rotation += 15
  if (command.includes("влево")) rotation -= 15
  width = clamp(width, 50, 600)
  height = clamp(height, 50, 700)

    x = clamp(x, 0, 600 - width)
    y = clamp(y, 0, 700 - height)
    return {
  position: { x, y },
  size: { width, height },
  rotation
}
  
}