import "./PropertiesPanel.css";
import type { PrintMode } from "../../../types/tshirt";
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
   scale:  number
   setScale:  React.Dispatch<React.SetStateAction<number>>
   printMode: PrintMode
   onPrintModeChange: (mode: PrintMode) => void
}
function PropertiesPanel({scale, setScale, printMode, onPrintModeChange, position, onCancelEdit, onApplyPlacementCommand, setPlacementCommand, placementCommand, exportPreview, editingDesignId, saveDesign, rotation, setRotation, setPosition}:Props) {
/*после position field <div className="ai-comand">
      <label>AI Command</label>
      <textarea
        value={placementCommand}
      onChange={(e) => setPlacementCommand(e.target.value)}
      placeholder="Например: подними принт чуть выше"
      />
      <button className="apply-command" onClick={onApplyPlacementCommand}>
  ✦ Apply command
</button>
    </div>*/
  return <section className="properties-panel">
    <h2>Properties</h2>
    <div className="property-group">
      <button
        onClick={() => {
          onPrintModeChange("front")
          setScale(1)
          setPosition({ x: 0, y: 0 })
        }}
      >
        Front Print
      </button>
      
      <button
        onClick={() => {
          onPrintModeChange("allOver")
          setScale(1)
          setPosition({ x: 0, y: 0 })
        }}
      >
        All Over
      </button>
  <label>Scale</label>

  <button onClick={() => setScale(prev => Math.max(0.3, prev - 0.1))}>
    -
  </button>

  <span>{Math.round(scale * 100)}%</span>

  <button onClick={() => setScale(prev => Math.min(1, prev + 0.1))}>
    +
  </button>

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
    
    <button className="save-design" onClick={saveDesign}>{editingDesignId !== null ? "Update Design" :"Save Design"}</button>
    <button className="export" onClick={exportPreview}>Export PNG</button>
    <button className="reset" onClick={()=>{setPosition({ x: 130, y: 130 })
        setScale(1)
        setRotation(0)
      }}>Reset design</button>
{editingDesignId !== null && (<button onClick={onCancelEdit}>Cancel edit</button>)}
  </section>;
}

export default PropertiesPanel;