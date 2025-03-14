import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
 // ✅ Correct import // Ensure firebase is properly configured
import { AuthContext } from "./AuthProvider"; // Import AuthContext

function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { user, } = useContext(AuthContext); // Use AuthContext

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate("/login"); // Redirect if not logged in
        return;
      }

      // Fetch the user's custom claims
      const idTokenResult = await user.getIdTokenResult();
      console.log("User Role:", idTokenResult.claims.role); // Debugging

      if (idTokenResult.claims.role === "admin") {
        setIsAdmin(true);
      } else {
        navigate("/"); // Redirect to home if not admin
      }
    };

    checkAdmin();
  }, [navigate, user]);

  if (!isAdmin) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <button className="bg-blue-500 text-white p-2 m-2">Add Player</button>
      <button className="bg-red-500 text-white p-2 m-2">Remove Player</button>
      <button className="bg-green-500 text-white p-2 m-2">Add News</button>
      <button className="bg-yellow-500 text-white p-2 m-2">Add Match Results</button>
    </div>
  );
}

export default Admin;