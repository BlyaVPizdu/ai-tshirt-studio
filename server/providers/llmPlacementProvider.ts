const OLLAMA_URL = "http://127.0.0.1:11434"
const MODEL = "qwen2.5:7b"

type LlmPlacementInput = {
  command: string
  position: { x: number; y: number }
  size: number
  rotation: number
}

export async function getPlacementCommandFromLlm(input: LlmPlacementInput) {
  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      prompt: `
Ты помощник AI-конструктора футболок.

Верни только JSON без markdown.

Формат:
{
  "moveX": number,
  "moveY": number,
  "scale": number,
  "rotate": number
   editImage: boolean,
  editPrompt: string
}

Правила:
- "чуть выше" = moveY -5
- "выше" = moveY -20
- "намного выше" = moveY -50
- "чуть ниже" = moveY 5
- "ниже" = moveY 20
- "левее" = moveX -20
- "правее" = moveX 20
- "уменьши на 10%" = scale 0.9
- "увеличь на 20%" = scale 1.2
- "поверни вправо" = rotate 10
- "поверни влево" = rotate -10
- если параметр не меняется: moveX 0, moveY 0, scale 1, rotate 0
- если команда меняет только положение, размер или поворот:
editImage = false
editPrompt = ""
- если команда меняет содержание картинки:
например "сделай рыцаря грустнее", "добавь дым", "убери меч":
editImage = true
editPrompt = краткий английский prompt для ComfyUI

Текущие параметры:
x=${input.position.x}
y=${input.position.y}
size=${input.size}
rotation=${input.rotation}

Команда пользователя:
"${input.command}"
      `,
    }),
  })

  if (!res.ok) {
    throw new Error("Ollama request failed")
  }

  const data = await res.json()
  console.log(data)
  return JSON.parse(data.response)
}