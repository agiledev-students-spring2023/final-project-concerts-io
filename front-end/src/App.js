import './App.css';
import React, { useState} from "react"
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom" 
import Home from ".//pages/Home"
import Profile from ".//pages/Profile"
import SavedConcerts from ".//pages/SavedConcerts"
import Concert from ".//pages/Concert"
import FavoriteArtists from ".//pages/FavoriteArtists"
import Artist from ".//pages/Artist"
import About from ".//pages/About"
import Recommended from ".//pages/Recommended"
import Login from ".//pages/Login"
import Logout from ".//pages/Logout"
import Menu from ".//components/Menu"
import Connection from ".//pages/Connection"

function App() {
  const [user, setUser] = useState({}) // a state variable that stores the logged-in user, if any
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            {/* a route to the home screen */}
            <Route path="/" element={<Home user={user} />} />

            {/* a route to the profile screen */}
            <Route path="/profile" element={<Profile user={user} />} />

            {/* a route to the saved concerts screen */}
            <Route path="/saved-concerts" element={<SavedConcerts user={user} />} />

            {/* a route to the connection to music service screen */}
            <Route path="/connection" element={<Connection user={user} />} />

            {/* a route for just a single concert, where the id of the desired concert is passed as a parameter */}
            <Route
                path="/concerts/:concertId"
                element={<Concert user={user} />}
              />

            {/* a route to the favorite artists screen */}
            <Route path="/favorite-artists" element={<FavoriteArtists user={user} />} />

            {/* a route for just a single artist, where the id of the desired concert is passed as a parameter */}
            <Route
                path="/artists/:artistId"
                element={<Artist user={user} />}
              />

            {/* a route to the about us screen */}
            <Route path="/about" element={<About />} />

            {/* a route to the recommended concerts screen */}
            <Route path="/recommended" element={<Recommended user={user} setUser={setUser}/>} />

            {/* a route to login*/}
            <Route path="/login" element={<Login user={user} setuser={setUser} />} />
            {/* a route to logout */}
            <Route path="/logout" element={<Logout user={user} setuser={setUser} />} />

          </Routes>
          <Menu user={user} setuser={setUser} />
      </BrowserRouter>
    </div>
    
  );
  
}

export default App;

