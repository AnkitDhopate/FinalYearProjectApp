import React from "react";
import YouTube from "react-youtube";

const Video = (props) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // You can add any additional player parameters here
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    event.target.playVideo();
  };

  return (
    <YouTube
      videoId={props.videoIdC} // videoId fetched from the youtube api
      opts={opts}
      onReady={onReady}
    />
  );
};

export default Video;
