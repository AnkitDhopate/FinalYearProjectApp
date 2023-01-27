import React, { useEffect, useState } from "react";
import YoutubeApi from "./YoutubeApi";
import Video from "./Video";

const SearchVideo = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    async function searchVideo() {
      console.log(props.emotion);
      const resp = await YoutubeApi.get("/search", {
        params: {
          q: props.emotion,
        },
      });
      setData(resp);
    }
    searchVideo();
  }, []);

  if (Object.keys(data).length > 0) {
    return (
      <>
        <Video videoIdC={data.data.items[0].id.videoId} />
      </>
    );
  } else {
    return <>No data</>;
  }
};

export default SearchVideo;
