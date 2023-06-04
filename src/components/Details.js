import React from "react";

function Details(props) {
  const { title, artist, img_src } = props.song;
  const MAX_ARTIST_LENGTH = 20;

  const truncatedArtist =
    artist.length > MAX_ARTIST_LENGTH
      ? artist.substring(0, MAX_ARTIST_LENGTH) + "..."
      : artist;

  return (
    <div className="c-player--details">
      <div className="details-img">
        <img src={img_src} alt="" />
      </div>
      <h3 className="details-title">{title}</h3>
      <h4 className="details-artist">{truncatedArtist}</h4>
    </div>
  );
}

export default Details;
