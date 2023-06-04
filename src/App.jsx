import { useState } from "react";
import YoutubeApi from "./YoutubeApi";
import Video from "./Video";
import WebCam from "./WebCam";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="App">
      <WebCam />
    </div>
  );
}

export default App;
