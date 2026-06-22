type PlacementCommandInput = {
  command: string
  position: { x: number; y: number }
  size: number
  rotation: number
}

type PlacementCommandResult = {
  position: { x: number; y: number }
  size: number
  rotation: number
}
export function applyAiPlacement(input: PlacementCommandInput): PlacementCommandResult {
  const command = input.command.toLowerCase()

  let x = input.position.x
  let y = input.position.y
  let size = input.size
  let rotation = input.rotation
  function clamp(value: number, min: number, max: number) {
  
    return Math.min(Math.max(value, min), max)
}

  if (command.includes("выше")) y -= 20
  if (command.includes("ниже")) y += 20
  if (command.includes("левее")) x -= 20
  if (command.includes("правее")) x += 20
  if (command.includes("больше")) size += 20
  if (command.includes("меньше")) size -= 20
  if (command.includes("вправо")) rotation += 15
  if (command.includes("влево")) rotation -= 15
  size = clamp(size, 50, 300)

    x = clamp(x, 0, 400 - size)
    y = clamp(y, 0, 500 - size)
    return {
  position: { x, y },
  size,
  rotation,
}
  
}