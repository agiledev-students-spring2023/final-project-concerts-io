import './App.css';
import Home from './pages/Home.js'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Menu from './components/Menu';


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
    <Menu/>
    </BrowserRouter>
    </div>
    
  );
  
}

export default App;
