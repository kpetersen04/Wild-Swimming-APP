import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import SitesByRegion from "../pages/SitesByRegion";
import About from "../pages/About";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import SingleSwimSite from "../pages/SingleSwimSite";
import MyAccount from "../pages/MyAccount";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sites-by-region/:id" element={<SitesByRegion />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/swim-sites/:id" element={<SingleSwimSite />} />
        <Route path="/my-account/:id" element={<MyAccount />} />
      </Routes>
    </div>
  );
}

export default App;
