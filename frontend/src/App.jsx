// Styles
import "./styles/main.css";
import "./styles/utilities.css";
import "./styles/colors.css";
import "./styles/header.css";
import "./styles/buttons.css";
import "./styles/inputs.css";

// Assets
import logo from "./assets/images/logo.svg";

// React Router
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Pages
import Authentication from "./pages/Authentication";

const App = () => {
  return (
    <BrowserRouter>
      <main className="container">
        <header className="site-header">
          <img src={logo} alt="LinkedIn" />
          <nav className="site-nav">
            <a href="/">Home</a>
            <a href="/">About</a>
            <a href={process.env.REACT_APP_API_URL}>Company</a>
            <Link
              className="button button-transparent"
              to="auth?authType=signup"
            >
              Join now
            </Link>
            <Link
              className="button button-outlined button-outlined-primary"
              to="auth"
            >
              Sign in
            </Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<>Hello World!</>} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
