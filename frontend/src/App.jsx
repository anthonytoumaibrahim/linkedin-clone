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
import logo from "./assets/images/logo.png";
import logo_in from "./assets/images/logo_in.png";

// React Router
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Pages
import Authentication from "./pages/Authentication";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import ProfileEditor from "./pages/ProfileEditor";
import PostJob from "./pages/PostJob";
import FindJob from "./pages/FindJob";

// Utilities
import { getLocalUser, removeLocalUser } from "./utils/user";

// Icons
import { IoHomeSharp } from "react-icons/io5";
import { FaUser, FaSuitcase } from "react-icons/fa";

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
        <header
          className={`site-header container ${
            user.id !== 0 ? "logged-in" : ""
          }`}
        >
          <Link to="/">
            {user.id === 0 ? (
              <img src={logo} alt="LinkedIn" />
            ) : (
              <img src={logo_in} alt="LinkedIn" />
            )}
          </Link>
          <nav className="site-nav">
            {user.id !== 0 ? (
              <>
                <Link to="/" className="nav-link">
                  <IoHomeSharp size={24} />
                  Home
                </Link>
                <Link to="/profile" className="nav-link">
                  <FaUser size={24} />
                  Profile
                </Link>
                <Link to="/jobs" className="nav-link">
                  <FaSuitcase size={24} />
                  {user.is_company ? "Post Jobs" : "Find Jobs"}
                </Link>
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
        <main className="container margin-b">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/profile/:shownId?" element={<Profile />} />
            <Route path="/edit-profile" element={<ProfileEditor />} />
            <Route
              path="/jobs"
              element={user.is_company ? <PostJob /> : <FindJob />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
