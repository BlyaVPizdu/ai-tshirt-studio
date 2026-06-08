type Props ={
    prompt: string
    onPromptChange: (value: string) => void
    onGenerate: () => Promise<void>
}
function PromptForm({prompt, onPromptChange, onGenerate}: Props) {
    return(
             <section>
          <h2>Describe your design</h2>

          <textarea
            value={prompt}
            onChange={(event) => onPromptChange(event.target.value)}
            placeholder="tired knight after battle, sword down, vintage style..."
          />

          <button onClick={onGenerate}>Generate</button>
        </section>
    )
}
export default PromptForm