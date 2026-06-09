type Props ={
    prompt: string
    onPromptChange: (value: string) => void
    onGenerate: () => Promise<void>
    isGenerating: boolean
    error:  string | null
}
function PromptForm({error, isGenerating , prompt, onPromptChange, onGenerate}: Props) {
    return(
             <section>
          <h2>Describe your design</h2>

          <textarea
            value={prompt}
            onChange={(event) => onPromptChange(event.target.value)}
            placeholder="tired knight after battle, sword down, vintage style..."
          />

          <button onClick={onGenerate} disabled={isGenerating}>{isGenerating ? "Generating..." : "Generate"}</button>
          {error && <p className="error-message">{error}</p>}
        </section>
    )
}
export default PromptForm