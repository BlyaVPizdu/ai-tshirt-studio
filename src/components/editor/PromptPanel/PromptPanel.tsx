import { useRef, useState } from "react"
import type { AiProvider } from "../../../types/tshirt"
import "./PromptPanel.css"
import { Mic, Upload } from "lucide-react"


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
             <section className="prompt-panel">
              <div className="panel-header">
          <h2>Create Design</h2>
          <p>Create AI artwork for your shirt</p>
              </div>
          <div className="prompt-section">
          <label>1. Design Prompt</label>
           <div className="prompt-input-wrapper">
          <textarea
            value={prompt}
            onChange={(event) => onPromptChange(event.target.value)}
            placeholder="tired knight after battle, sword down, vintage style..."
          />
          <button className="mic-button" onClick={startMicro} disabled={isListening}>{isListening ? "🎙️" : <Mic size={18} />}</button>
          </div>
          </div>
          <div className="provider-section">
            <label>2. AI provider</label>
            <select value = {selectedProvider} onChange={(e)=> onProviderChange(e.target.value as AiProvider)}>
                    <option value="openai">openai</option>
                     <option value="comfy">comfy</option>
                     <option value="flux-dev">flux-dev</option>
            </select>
            </div>
            <div className="reference-section">
              <label>3. Reference Image <span>(optional)</span></label>
              <input ref={inputRef} type="file" accept="image/*"   hidden 
               onChange={(event) => {
            const file = event.target.files?.[0]
             if (!file) return
                onUploadImage(file)
                             }}/>
        <button type="button" className="upload-card" onClick={changeInput}><Upload size={22} />
    <div>
      <strong>Upload Image</strong>
      <p>PNG, JPG up to 10MB</p>
    </div></button>
            </div>
             <div className="actions-section">
          <button type="button" className="generate-button" onClick={onGenerate} disabled={isGenerating || !prompt.trim()}>{isGenerating ? "Generating..." : "✦ Generate Design"}</button>
          {error && <p className="error-message">{error}</p>}
          </div>
        </section>
    )
}
export default PromptForm