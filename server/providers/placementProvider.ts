type ApplyPlacementInput = {
  command: string
  position: { x: number; y: number }
  size: number
  rotation: number
}
export function applyPlacementCommand(input: ApplyPlacementInput) {
  let x = input.position.x
  let y = input.position.y
  let size = input.size
  let rotation = input.rotation

  const text = input.command.toLowerCase()

  if (text.includes("выше")) y -= 20
  if (text.includes("ниже")) y += 20
  if (text.includes("левее")) x -= 20
  if (text.includes("правее")) x += 20
  if (text.includes("больше")) size += 20
  if (text.includes("меньше")) size -= 20
  if (text.includes("вправо")) rotation += 15
  if (text.includes("влево")) rotation -= 15

  size = Math.min(Math.max(size, 50), 300)
  x = Math.min(Math.max(x, 0), 400 - size)
  y = Math.min(Math.max(y, 0), 500 - size)

  return {
    position: { x, y },
    size,
    rotation,
  }
}