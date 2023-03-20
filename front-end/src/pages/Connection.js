import {React,useEffect,useState}  from 'react';
import './Connection.css'


const Connection = (props) => {
    return(
        <div className="Connection">
            <h1>Connecting to my Music Account</h1>
            <div className="platform">
                <h2>Spotify</h2>
                <a href="https://open.spotify.com/"> link to Spotify</a>
            </div>
            <div className="platform">
                <h2>Apple Music</h2>
                <a href="https://music.apple.com/subscribe"> link to Apple Music</a>    
            </div>
            <div className="platform">
                <h2>SoundCloud</h2>
                <span><a href="https://soundcloud.com/"> link to SoundCloud</a></span>   
            </div>
        </div>
        
    )
};

export default Connection