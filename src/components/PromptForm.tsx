import { useRef, useState } from "react"
import type { AiProvider } from "../types/tshirt"

type Props ={
    prompt: string
    onPromptChange: (value: string) => void
    onGenerate: () => Promise<void>
    isGenerating: boolean
    error:  string | null
    onUploadImage: (file: File) => void
    onProviderChange: (provider: AiProvider) => void
    selectedProvider: AiProvider
}
function PromptForm({selectedProvider, onProviderChange, onUploadImage, error, isGenerating , prompt, onPromptChange, onGenerate}: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isListening, setIsListening] = useState(false)
    const changeInput = () =>{  
        inputRef.current?.click()
    }
    const startMicro = () =>{
        const SpeechRecognition = window.SpeechRecognition ||
                            window.webkitSpeechRecognition
    if (!SpeechRecognition) {
         alert("Speech recognition is not supported")
         return}
         const recognition = new SpeechRecognition()
         recognition.lang = "ru-RU"
         /*recognition.lang = "en-US"*/
         recognition.continuous = false
        recognition.interimResults = false
         recognition.onstart = () => {
         setIsListening(true)}

        recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript
  console.log(event.results[0])
  console.log(transcript)
  onPromptChange(transcript)}

    recognition.onerror = (event) => {
  setIsListening(false)}

    recognition.onend = () => {
  setIsListening(false)}

    recognition.start()
    }
    
    return(
             <section>
          <h2>Describe your design</h2>
        <input ref={inputRef} type="file" accept="image/*"   hidden 
        onChange={(event) => {
            const file = event.target.files?.[0]
             if (!file) return
                onUploadImage(file)
                             }}/>
        <button onClick={changeInput}>+</button>
          <textarea
            value={prompt}
            onChange={(event) => onPromptChange(event.target.value)}
            placeholder="tired knight after battle, sword down, vintage style..."
          />
            <select value = {selectedProvider} onChange={(e)=> onProviderChange(e.target.value as AiProvider)}>
                  <option value="pollinations">pollinations</option>
                    <option value="openai">openai</option>
                     <option value="comfy">comfy</option>
            </select>
            <button onClick={startMicro} disabled={isListening}>{isListening ? "Listening..." : "Start"}</button>
          <button onClick={onGenerate} disabled={isGenerating}>{isGenerating ? "Generating..." : "Generate"}</button>
          {error && <p className="error-message">{error}</p>}
        </section>
    )
}
export default PromptForm