import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Concert from './Concert';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Concert" element={<Concert />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

