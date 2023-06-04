import { useState, useEffect } from "react";
import Player from "./components/Player";

function PlayVideo(props) {
  const [happy] = useState([
    {
      title: "Care Ni Karda",
      artist: "Yo Yo Honey Singh",
      img_src: "./images/care-ni-karda.jpg",
      src: "./music/Care Ni Karda.mp3",
    },
    {
      title: "Tango Del Fuego",
      artist: "Parov Stelar",
      img_src: "./images/ParovStelarGeorgiaGibbs-TangoDelFuego.jpg",
      src: "./music/ParovStelarGeorgiaGibbs-TangoDelFuego.mp3",
    },
    {
      title: "Titaliya",
      artist: "Hardy Sandhu",
      img_src: "./images/titaliya.jpg",
      src: "./music/Titliaan Warga.mp3",
    },
  ]);
  const [sad] = useState([
    {
      title: "Nach Meri Rani",
      artist: "Yo Yo Honey Singh",
      img_src: "./images/nach-meri-rani.jpg",
      src: "./music/Naach Meri Rani.mp3",
    },
  ]);
  const [neutral] = useState([
    {
      title: "Burj Khalifa",
      artist: "Shashi",
      img_src: "./images/burjkalifa.jpg",
      src: "./music/BurjKhalifa.mp3",
    },
  ]);

  let fetcher = props.emotion;

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  let [songs] = happy;
  if (fetcher == "Sad") {
    songs = sad;
  } else if (fetcher == "Neutral") {
    songs = neutral;
  } else songs = happy;

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, songs.length]);

  const handleBack = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
        emotion={props.emotion}
      />
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default PlayVideo;
