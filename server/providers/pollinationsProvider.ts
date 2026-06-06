
export async function generateImage(prompt: string) {
        const encodedPrompt = encodeURIComponent(prompt)
        const url = `https://image.pollinations.ai/prompt/${encodedPrompt}`
        return {image: url}    
} 