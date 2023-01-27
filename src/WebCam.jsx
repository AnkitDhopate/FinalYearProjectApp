import React, { useEffect, useRef, useState } from "react";
import SearchVideo from "./SearchVideo";
import axios from "axios";
import "./WebCam.css";

const WebCam = () => {
  let videoRef = useRef(null);
  let photoRef = useRef(null);

  const [emotion, setEmotion] = useState("");

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        video: {},
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

    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

    // Removing the data:image/jpeg;base64, prefix
    const imgDataClean = imgData.replace(/^data:image\/jpeg;base64,/, "");

    // Converting base64 string to a Blob
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
        setEmotion(response.data + " songs");
        console.log(response.data);

        // <SearchVideo emotion={emotion} />;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearImage = () => {
    let photo = photoRef.current;
    let context = photo.getContext("2d");
    context.clearRect(0, 0, photo.width, photo.height);
  };

  if (emotion.length == 0) {
    return (
      <div className="web_cam_container">
        {getUserCamera()}
        <video className="video mirror" ref={videoRef}></video>
        <button onClick={takePicture}>Take Photo</button>
        <button onClick={clearImage}>Clear Photo</button>
        <canvas ref={photoRef}></canvas>
      </div>
    );
  } else {
    return <SearchVideo emotion={emotion} />;
  }
};

export default WebCam;
