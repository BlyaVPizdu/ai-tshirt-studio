import "./PropertiesPanel.css";
type Props = {
  position: {
    x: number;
    y: number;
}
  size: {
    width: number;
    height: number;
}
  rotation: number
  setSize: React.Dispatch<React.SetStateAction<{
    width: number;
    height: number;
}>>
  setPosition: React.Dispatch<React.SetStateAction<{
    x: number;
    y: number;
    }>>
  setRotation:  React.Dispatch<React.SetStateAction<number>>
  saveDesign: () => Promise<void>
  editingDesignId: number | null
  exportPreview: () => Promise<void>
  placementCommand: string
  setPlacementCommand: (value: string)=> void
  onApplyPlacementCommand: ()=> void
   onCancelEdit: ()=> void
}
function PropertiesPanel({position, onCancelEdit, onApplyPlacementCommand, setPlacementCommand, placementCommand, exportPreview, editingDesignId, saveDesign, rotation, setRotation, setPosition,size, setSize}:Props) {
  const changeSize = (newSize: number)=>{
            const minSize = 50
          const maxSize = 300
      
          if (newSize < minSize) {
            setSize(minSize)
            return
          }
      
          if (newSize > maxSize) {
            setSize(maxSize)
            return
          }
      
          setSize(newSize)
        }
  return <section className="properties-panel">
    <h2>Properties</h2>
    <div className="property-group">
  <label>Size</label>

  <input
    type="range"
    min="50"
    max="300"
    value={size}
    onChange={(e) => setSize(Number(e.target.value))}
  />
  <div className="size-controls ">
  <button  onClick={() => changeSize(size - 10)}>-</button>
  <span>{size}px</span>
  <button onClick={() => changeSize(size + 10)} >+</button>
  </div>
</div>
    <div className="property-group">
        <label>Rotation</label>
         <input
    type="range"
    min="-180"
    max="+180"
    value={rotation}
    onChange={(e) => setRotation(Number(e.target.value))}
  />
        <span>{rotation}°</span>
    </div>
    <div className="position-group">
      <h4 className="group-title">Position</h4>
    <div className="position-inputs">
      <div className="position-item">
        <span className="position-label">X</span>
    <div className="position-field">
    <input type="number" value={position.x} onChange={(e) =>
    setPosition({
      ...position,
      x: Number(e.target.value),
    })
  }/><span className="position-suffix">px</span>
  </div>
  </div>
  <div className="position-item">
    <span className="position-label">Y</span>
  <div className="position-field">
    <input type="number" value={position.y} onChange={(e) =>
    setPosition({
      ...position,
      y: Number(e.target.value),
    })
  }/>
  <span className="position-suffix">px</span></div>
  </div>
  </div>
    </div>
    <div className="ai-comand">
      <label>AI Command</label>
      <textarea
        value={placementCommand}
      onChange={(e) => setPlacementCommand(e.target.value)}
      placeholder="Например: подними принт чуть выше"
      />
      <button className="apply-command" onClick={onApplyPlacementCommand}>
  ✦ Apply command
</button>
    </div>
    <button className="save-design" onClick={saveDesign}>{editingDesignId !== null ? "Update Design" :"Save Design"}</button>
    <button className="export" onClick={exportPreview}>Export PNG</button>
    <button className="reset" onClick={()=>{setPosition({ x: 130, y: 130 })
        setSize(140)
        setRotation(0)
      }}>Reset design</button>
{editingDesignId !== null && (<button onClick={onCancelEdit}>Cancel edit</button>)}
  </section>;
}

export default PropertiesPanel;