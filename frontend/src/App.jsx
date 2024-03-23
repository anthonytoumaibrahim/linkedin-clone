// React stuff
import { useEffect, useState } from "react";

// Context
import { AuthContext } from "./context/AuthContext";

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
import Homepage from "./pages/Homepage";

// Utilities
import { getLocalUser } from "./utils/user";

const App = () => {
  const [user, setUser] = useState({
    id: getLocalUser() ? getLocalUser().id : 0,
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <header className="site-header container">
          <img src={logo} alt="LinkedIn" />
          <nav className="site-nav">
            <a href="/">Home</a>
            <a href="/">About</a>
            <a href="/">Company</a>
            {user.id !== 0 ? (
              ""
            ) : (
              <>
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
              </>
            )}
          </nav>
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/auth" element={<Authentication />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
