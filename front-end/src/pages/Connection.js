import { React, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Connection.css";

const Connection = (props) => {
  let [urlSearchParams] = useSearchParams(); // get access to the URL query string parameters
  const [errorMessage, setErrorMessage] = useState(``); // will contain any error message that explains why the user was redirected to this page.
  useEffect(() => {
    const qsError = urlSearchParams.get("error"); // get any 'error' field in the URL query string
    if (qsError === "authentication")
      setErrorMessage("Authentication failed, please try again");
  }, []);

  return (
    <div className="Connection">
      <h1>Connecting to my Music Account</h1>
      {errorMessage ? <p className="error">{errorMessage}</p> : ""}
      <div className="platform">
        <h2>Spotify</h2>
        <a href="http://localhost:3000/spotifyconnect"> Connect Spotify</a>
      </div>
      <div className="platform">
        <h2>Apple Music</h2>
        <a href="https://music.apple.com/subscribe"> Connect Apple Music</a>
      </div>
      <div className="platform">
        <h2>SoundCloud</h2>
        <span>
          <a href="https://soundcloud.com/"> Connect SoundCloud</a>
        </span>
      </div>
    </div>
  );
};

export default Connection;
