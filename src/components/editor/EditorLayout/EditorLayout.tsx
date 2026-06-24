import PromptPanel from "../PromptPanel/PromptPanel";
import PreviewPanel from "../PreviewPanel/PreviewPanel";
import PropertiesPanel from "../PropertiesPanel/PropertiesPanel";
import "./EditorLayout.css";

function EditorLayout() {
  return (
    <main className="editor-layout">
      <PromptPanel />
      <PreviewPanel />
      <PropertiesPanel />
    </main>
  );
}

export default EditorLayout;