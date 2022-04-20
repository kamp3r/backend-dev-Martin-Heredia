import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Home from '../components/Views/Home.js';
import Header from "../components/Header/Header.js";
import Products from "../components/Views/Products";
import AdminPage from '../components/Views/AdminPage.js';

function RoutesTo() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/adminPage" element={<AdminPage/>}/>
      </Routes>
    </Router>
  );
}

export default RoutesTo;
