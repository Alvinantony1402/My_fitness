import './App.css';
import ReactDOM from "react-dom/client";
import Home from "./Components/home.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Biceps from "./Components/Biceps.js";
import Shoulder from './Components/Shoulder';
import Triceps from './Components/Triceps';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/Biceps" element={<Biceps />}></Route>
        <Route path="/Shoulder" element={<Shoulder />}></Route>
        <Route path="/Triceps" element={<Triceps/>}></Route>
        <Route path="/Squats" element={<Biceps />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
