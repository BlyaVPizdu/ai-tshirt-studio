export type GenerateImageResult = {
  image: string
}

export type ImageProvider = {
  generate(prompt: string): Promise<GenerateImageResult>
}