import "./App.css";
import Toolbar from "./components/Toolbar/Toolbar";
import ToolbarItem from "./components/ToolbarItem/ToolbarItem";

function App() {
  return (
    <>
      <Toolbar className="top-toolbar">
        Top Toolbar
      </Toolbar>
      <Toolbar className="right-toolbar">
        Right Toolbar
        <ToolbarItem onClick={() => console.log('Hi')}/>
      </Toolbar>
      <div
        style={{
          width: "100%",
          height: "100%",
          marginTop: "3rem",
          marginRight: "5rem",
          backgroundColor: "gray",
        }}
      >
        Main content
      </div>
    </>
  );
}

export default App;
