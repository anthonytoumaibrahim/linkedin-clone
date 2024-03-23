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
import Profile from "./pages/Profile";

// Utilities
import { getLocalUser, removeLocalUser } from "./utils/user";

const App = () => {
  const localUser = getLocalUser();
  const [user, setUser] = useState({
    id: localUser ? localUser.id : 0,
    name: localUser.name ?? "",
    email: localUser.email ?? "",
    is_company: localUser.is_company ?? false,
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <header className="site-header container">
          <img src={logo} alt="LinkedIn" />
          <nav className="site-nav">
            {user.id !== 0 ? (
              <>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link
                  className="button button-outlined button-outlined-error"
                  to="/auth"
                  onClick={() => {
                    setUser({
                      id: 0,
                    });
                    removeLocalUser();
                  }}
                >
                  Log out
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="button button-transparent"
                  to="/auth?authType=signup"
                >
                  Join now
                </Link>
                <Link
                  className="button button-outlined button-outlined-primary"
                  to="/auth"
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
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
