import React, { useEffect, useRef, useState } from "react";
import PlayVideo from "./PlayVideo";
import axios from "axios";
import "./WebCam.css";

const WebCam = () => {
  let videoRef = useRef(null);
  let photoRef = useRef(null);

  const [emotion, setEmotion] = useState("");
  const [showVideo, setShowVideo] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [loading, setLoading] = useState(false);
  const [array, setArray] = useState([]);

  useEffect(() => {
    getUserCamera();
  }, []);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => console.log(error));
  };

  const takePicture = () => {
    const width = 600;
    const ratio = 4 / 3;
    const height = width / ratio;

    const photo = photoRef.current;
    const video = videoRef.current;

    photo.width = width;
    photo.height = height;

    const context = photo.getContext("2d");
    context.drawImage(video, 0, 0, photo.width, photo.height);

    const imgData = photo.toDataURL("image/jpeg");

    setLoading(true); // Set loading to true

    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

    const imgDataClean = imgData.replace(/^data:image\/jpeg;base64,/, "");
    const byteCharacters = atob(imgDataClean);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const imgBlob = new Blob(byteArrays, { type: "image/jpeg" });

    let formData = new FormData();
    formData.append("file", imgBlob);

    axios
      .post("http://127.0.0.1:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setEmotion(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const create_array = () => {
    let i = 1;
    let max = 8;
    const rand = [];
    while (i <= max) {
      let randNum = Math.floor(Math.random() * max);
      if (rand.indexOf(randNum) !== -1) {
        continue;
      }
      rand.push(randNum);
      i++;
    }

    setArray(rand);
  };

  if (emotion.length === 0) {
    return (
      <div className="web_cam_container">
        {loading && (
          <div className="loading-container">
            <div className="loading">Loading...</div>
          </div>
        )}
        <video
          className={`video mirror ${showVideo ? "" : "invisible"}`}
          ref={videoRef}
        ></video>
        <button
          onClick={() => {
            setShowVideo(false);
            setShowCanvas(true);
            takePicture();
          }}
        >
          Take Photo
        </button>
        <canvas
          className={`canvas ${showCanvas ? "visible" : ""}`}
          ref={photoRef}
        ></canvas>
      </div>
    );
  } else {
    let i = 1;
    let max = 8;
    const rand = [];
    while (i <= max) {
      let randNum = Math.floor(Math.random() * max);
      if (rand.indexOf(randNum) !== -1) {
        continue;
      }
      rand.push(randNum);
      i++;
    }
    return <PlayVideo emotion={emotion} array={rand} />;
  }
};

export default WebCam;
