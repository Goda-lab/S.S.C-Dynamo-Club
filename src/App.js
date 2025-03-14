import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Players from "./Players";
import Coach from "./Coach";
import News from "./News";
import Matches from "./Matches";
import About from "./About";
import Admin from "./Admin";
import Footer from "./Footer";
import { AuthProvider } from "./AuthProvider"; // Import AuthProvider
import PrivacyPolicy from "./PrivacyPolicy";

function App() {
  return (
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <Router>
        <div className="App flex flex-col min-h-screen">
          <Navbar /> {/* ✅ Navbar at the top */}
          
          <div className="flex-grow"> {/* ✅ Ensures content fills screen */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/players" element={<Players />} />
              <Route path="/coach" element={<Coach />} />
              <Route path="/news" element={<News />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={auth.currentUser ? <Admin /> : <Navigate to="/login" />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </div>

          <Footer /> {/* ✅ Footer at the bottom */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
