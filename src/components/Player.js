import React, { useState, useRef, useEffect } from "react";
import Controls from "./Controls";
import Details from "./Details";

function Player(props) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  };

  let emotionEmoji;
  if (props.emotion === "Happy") {
    emotionEmoji = "😄";
  } else if (props.emotion === "Sad") {
    emotionEmoji = "😢";
  } else if (props.emotion === "Neutral") {
    emotionEmoji = "😐";
  }

  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setBlinkCount((count) => count + 1);
    }, 1000);

    return () => {
      clearInterval(blinkTimer);
    };
  }, []);

  let emotionDetectedClass = "emotion-detected";
  if (blinkCount >= 5) {
    emotionDetectedClass += " hidden";
  }

  return (
    <div className="c-player">
      <h4>Playing now</h4>
      <p className={emotionDetectedClass} style={{ color: "white" }}>
        Emotion detected: {props.emotion} {emotionEmoji}
      </p>
      <Details song={props.songs[props.array[props.currentSongIndex]]} />
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        SkipSong={SkipSong}
      />
      <audio
        className="c-player--audio"
        src={props.songs[props.array[props.currentSongIndex]].src}
        ref={audioEl}
        controls
      ></audio>
      <p>
        Next up:{" "}
        <span>{props.songs[props.array[props.nextSongIndex]].title}</span>
      </p>
      <p>
        <span> by {props.songs[props.array[props.nextSongIndex]].artist}</span>
      </p>
    </div>
  );
}

export default Player;
