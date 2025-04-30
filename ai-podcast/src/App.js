import './output.css'; 
import Home from './pages/home.js';
import History from './pages/history.js';
import Navbar from './components/navbar.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
    </Router>
  );
}

export default App;
