import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';


function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Create />} />
            <Route path='/read' element={<Read />} />
            <Route path='/edit/:id' element={<Update />} />


          </Routes>
        </Router>
      </div>



    </>
  );
}

export default App;
