import { useState, useEffect } from "react";
import Player from "./components/Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function PlayVideo(props) {
  const [happy] = useState([
    {
      title: "Dil To Pagal Hai",
      artist: "Lata Mangeshkar, Udit Narayan",
      img_src: "./images/Dil To Pagal Hai.jpg",
      src: "./music/Dil To Pagal Hai.mp3",
    },
    {
      title: "Tumhein Apna Banane Ki Kasam Khai Hai",
      artist: "Anuradha Paudwal, Kumar Sanu",
      img_src: "./images/Tumhein Apna Banane Ki Kasam Khai Hai.jpg",
      src: "./music/Tumhein Apna Banane Ki Kasam Khai Hai.mp3",
    },
    {
      title: "Nashe Si Chadh Gayi",
      artist: "Arijit Singh",
      img_src: "./images/Nashe Si Chadh Gayi.jpg",
      src: "./music/Nashe Si Chadh Gayi.mp3",
    },
    {
      title: "Nacho Nacho",
      artist: "Vishal Mishra, Rahul Sipligunj",
      img_src: "./images/Nacho Nacho.jpg",
      src: "./music/Nacho Nacho.mp3",
    },
    {
      title: "Happy",
      artist: "Pharrell Williams",
      img_src: "./images/Happy-Pharrell Williams.jpg",
      src: "./music/Happy-Pharrell Williams.mp3",
    },
    {
      title: "Sooraj Dooba Hain",
      artist: "Amaal Mallik, Arijit Singh, Aditi Singh Sharma",
      img_src: "./images/Sooraj Dooba Hain.jpg",
      src: "./music/Sooraj Dooba Hain.mp3",
    },
    {
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      img_src: "./images/Watermelon Sugar.jpg",
      src: "./music/Watermelon Sugar.mp3",
    },
    {
      title: "Swag Se Swagat",
      artist: "Vishal & Shekhar, Julius Packiam, Neha Bhasin",
      img_src: "./images/Swag Se Swagat.jpg",
      src: "./music/Swag Se Swagat.mp3",
    },
  ]);

  const [sad] = useState([
    {
      title: "Jab Koi Baat Bigad Jaye",
      artist: "Vinod Khanna, Meenakshi",
      img_src: "./images/Jab Koi Baat Bigad Jaye.jpg",
      src: "./music/Jab Koi Baat Bigad Jaye.mp3",
    },
    {
      title: "Mera Dil Bhi Kitna Pagal Hai",
      artist: "Kumar Sanu, Alka Yagnik",
      img_src: "./images/Mera Dil Bhi Kitna Pagal Hai.jpg",
      src: "./music/Mera Dil Bhi Kitna Pagal Hai.mp3",
    },
    {
      title: "Tinka Tinka",
      artist: "Alisha Chinoy",
      img_src: "./images/Tinka Tinka.jpg",
      src: "./music/Tinka Tinka.mp3",
    },
    {
      title: "Agar Tum Saath Ho",
      artist: "Alka Yagnik, Arijit Singh",
      img_src: "./images/Agar Tum Saath Ho.jpg",
      src: "./music/Agar Tum Saath Ho.mp3",
    },
    {
      title: "Sunn Raha Hai Na Tu",
      artist: "Ankit Tiwari",
      img_src: "./images/Sunn Raha Hai Na Tu.jpg",
      src: "./music/Sunn Raha Hai Na Tu.mp3",
    },
    {
      title: "Back To You",
      artist: "Selena Gomez",
      img_src: "./images/Back To You.jpg",
      src: "./music/Back To You.mp3",
    },
    {
      title: "Sanu Ek Pal Chain",
      artist: "Rahat Fateh Ali Khan",
      img_src: "./images/Sanu Ek Pal Chain.jpg",
      src: "./music/Sanu Ek Pal Chain.mp3",
    },
    {
      title: "Frozen",
      artist: "Madonna",
      img_src: "./images/Frozen.jpg",
      src: "./music/Frozen.mp3",
    },
  ]);

  const [neutral] = useState([
    {
      title: "Malhari",
      artist: "Vishal Dadlani",
      img_src: "./images/Malhari.jpg",
      src: "./music/Malhari.mp3",
    },
    {
      title: "Chura Ke Dil Mera",
      artist: "Anu Malik, Alka Yagnik, Kumar Sanu",
      img_src: "./images/Chura Ke Dil Mera.jpg",
      src: "./music/Chura Ke Dil Mera.mp3",
    },
    {
      title: "Namo Namo",
      artist: "Amit Trivedi",
      img_src: "./images/Namo Namo.jpg",
      src: "./music/Namo Namo.mp3",
    },
    {
      title: "Tip Tip Barsa Paani",
      artist: "Alka Yagnik, Udit Narayan",
      img_src: "./images/Tip Tip Barsa Paani.jpg",
      src: "./music/Tip Tip Barsa Paani.mp3",
    },
    {
      title: "Girls Like You",
      artist: "Maroon 5",
      img_src: "./images/Girls Like You.jpg",
      src: "./music/Girls Like You.mp3",
    },
    {
      title: "Chammak Challo",
      artist: "Vishal & Shekhar, Akon",
      img_src: "./images/Chammak Challo.jpg",
      src: "./music/Chammak Challo.mp3",
    },
    {
      title: "Wolves",
      artist: "Selena Gomez, Marshmello",
      img_src: "./images/Wolves.jpg",
      src: "./music/Wolves.mp3",
    },
    {
      title: "Subha Hone Na De",
      artist: "Mika Singh, Shefali Alvares",
      img_src: "./images/Subha Hone Na De.jpg",
      src: "./music/Subha Hone Na De.mp3",
    },
  ]);

  let fetcher = props.emotion;

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  let [songs] = neutral;
  if (fetcher === "Sad") {
    songs = sad;
  } else if (fetcher === "Happy") {
    songs = happy;
  } else {
    songs = neutral;
  }

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
    <div className="PlayVideo">
      <div className="player-container">
        <Player
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={songs}
          emotion={props.emotion}
          array={props.array}
        />
        <button className="back_btn" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span> Back</span>
        </button>
      </div>
      <div className="playlist-container">
        <h2>Playlist</h2>
        <div className="playlist">
          {/* {songs.map((song, index) => (
            <div className="song-container" key={index}>
              <img src={song.img_src} alt={song.title} />
              <div className="song-details">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
            </div>
          ))} */}
          {props.array.map((inte, index) => (
            <div className="song-container" key={index}>
              <img src={songs[inte].img_src} alt={songs[inte].title} />
              <div className="song-details">
                <h3>{songs[inte].title}</h3>
                <p>{songs[inte].artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayVideo;
