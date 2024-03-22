// Styles
import "./styles/main.css";
import "./styles/utilities.css";
import "./styles/colors.css";
import "./styles/header.css";
import "./styles/buttons.css";

// Assets
import logo from "./assets/images/logo.svg";

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Authentication from "./pages/Authentication";

const App = () => {
  return (
    <main className="container">
      <header className="site-header">
        <img src={logo} alt="LinkedIn" />
        <nav className="site-nav">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Company</a>
        </nav>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>Hello World!</>} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
