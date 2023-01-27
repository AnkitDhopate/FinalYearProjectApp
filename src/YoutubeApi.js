import axios from "axios";

const KEY = "AIzaSyAqGXDYdUNHyaDiHrZvzx8j6jnbfRgSme0";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY,
    type: "video",
    videoCategoryId: "10",
  },
  headers: {},
});

// https://www.googleapis.com/youtube/v3/search?part=snippet&q=songs&type=video&videoCategoryId=10&videoDuration=short&key=AIzaSyAqGXDYdUNHyaDiHrZvzx8j6jnbfRgSme0
