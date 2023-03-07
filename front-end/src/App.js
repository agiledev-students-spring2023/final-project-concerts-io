import './App.css';
import React from "react"
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom" 
import Home from ".//pages/Home"
import Profile from ".//pages/Profile"
import SavedConcerts from ".//pages/SavedConcerts"
import Concert from ".//pages/Concert"
import FavoriteArtists from ".//pages/FavoriteArtists"
import Artist from ".//pages/Artist"
import About from ".//pages/About"
import Menu from ".//components/Menu"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            {/* a route to the home screen */}
            <Route path="/" element={<Home />} />

            {/* a route to the profile screen */}
            <Route path="/profile" element={<Profile />} />

            {/* a route to the saved concerts screen */}
            <Route path="/saved-concerts" element={<SavedConcerts />} />

            {/* a route for just a single concert, where the id of the desired concert is passed as a parameter */}
            <Route
                path="/concerts/:concertId"
                element={<Concert />}
              />

            {/* a route to the favorite artists screen */}
            <Route path="/favorite-artists" element={<FavoriteArtists />} />

            {/* a route for just a single artist, where the id of the desired concert is passed as a parameter */}
            <Route
                path="/artists/:artistId"
                element={<Artist />}
              />

            {/* a route to the about us screen */}
            <Route path="/about" element={<About />} />

          </Routes>
          <Menu/>
      </BrowserRouter>
    </div>
    
  );
  
}

export default App;

