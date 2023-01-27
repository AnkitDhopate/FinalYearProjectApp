import { useState } from "react";
import YoutubeApi from "./YoutubeApi";
import Video from "./Video";
import WebCam from "./WebCam";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  // const [videos, setVideos] = useState({});

  // const searchVideo = async (e) => {
  //   e.preventDefault();

  //   const res = await YoutubeApi.get("/search", {
  //     params: {
  //       q: searchText,
  //     },
  //   });

  //   setVideos(res.data.items);

  //   setSearchText("");
  // };

  return (
    <div className="App">
      <WebCam />
      {/* <form onSubmit={searchVideo}>
        <div className="search_bar">
          <input
            value={searchText}
            id="search"
            type="Search"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Video videoIdC={videos[0].id.videoId} />
        </div>
      </form> */}
    </div>
  );
}

export default App;
