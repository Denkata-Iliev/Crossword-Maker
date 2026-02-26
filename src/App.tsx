import { useState } from "react";
import "./App.css";
import CrosswordGrid from "./components/CrosswordGrid/CrosswordGrid";
import Toolbar from "./components/Toolbar/Toolbar";
import ToolbarItem from "./components/ToolbarItem/ToolbarItem";

function App() {
  const [mode, setMode] = useState("boxPlace");

  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === "boxPlace" ? "crossword" : "boxPlace"));
  };

  return (
    <>
      <Toolbar className="top-toolbar">Top Toolbar</Toolbar>
      <Toolbar className="right-toolbar">
        Right Toolbar
        <ToolbarItem onClick={handleModeChange} />
      </Toolbar>
      <CrosswordGrid mode={mode} />
    </>
  );
}

export default App;
