import './App.css';
import Home from './pages/Home.js'
import {BrowserRouter,Routes,Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <div>
          <Routes>
            <Route path="/"
                   element={<Home/>}
                   />
          </Routes>
        </div>
        </BrowserRouter>
    </div>
    
  );
  
}

export default App;
