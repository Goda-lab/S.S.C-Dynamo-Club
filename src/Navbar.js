import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { auth } from "./firebaseConfig"; // ✅ Correct import

function Navbar() {
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/players" className="mr-4">Players</Link>
        <Link to="/coach" className="mr-4">Coach</Link>
        <Link to="/news" className="mr-4">News</Link>
        <Link to="/matches" className="mr-4">Matches</Link>
        <Link to="/about" className="mr-4">About</Link>
        {role === "admin" && <Link to="/admin" className="text-red-500 mr-4">Admin</Link>}
      </div>
      
      <div className="ml-auto">
        {user ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;