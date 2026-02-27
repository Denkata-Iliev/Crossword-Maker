import { useState } from "react";
import CrosswordGrid from "./components/CrosswordGrid/CrosswordGrid";
import Toolbar from "./components/Toolbar/Toolbar";
import ToolbarItem from "./components/ToolbarItem/ToolbarItem";

function App() {
  const [mode, setMode] = useState("boxPlace");

  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === "boxPlace" ? "crossword" : "boxPlace"));
  };

  return (
    <div className="w-screen h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 overflow-hidden">
      <Toolbar className="top-toolbar">Top Toolbar</Toolbar>
      <Toolbar className="right-toolbar">
        Right Toolbar
        <ToolbarItem onClick={handleModeChange} />
      </Toolbar>
      <CrosswordGrid mode={mode} />
    </div>
  );
}

export default App;
