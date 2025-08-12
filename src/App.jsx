import Header from "./components/Header/Header";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Models from "./pages/Models/Models";
import Team from "./pages/Team/Team";
import Testimonials from "./pages/Testimonials/Testimonials";
import Contact from "./pages/Contact/Contact";
function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vehicle models" element={<Models />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/our team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
/*

  



*/
