import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "./firebaseConfig"; // Import Firebase Auth & Firestore
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "./AuthProvider"; // Import AuthContext

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, setRole } = useContext(AuthContext); // Use AuthContext

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!agreeToPolicy) {
      setError("You must agree to the Privacy Policy to continue.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add the user to Firestore under "members"
      await setDoc(doc(firestore, "members", user.uid), {
        email: user.email,
        role: "member",
      });

      // Update context with the new user and role
      setUser(user);
      setRole("member");

      alert("Signup successful!");
      navigate("/"); // Redirect to home after signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Add the user to Firestore under "members"
      await setDoc(doc(firestore, "members", user.uid), {
        email: user.email,
        role: "member",
      });

      // Update context with the new user and role
      setUser(user);
      setRole("member");

      alert("Signup successful!");
      navigate("/"); // Redirect to home after signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-5 max-w-sm mx-auto">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label className="block mb-3">
        <input
          type="checkbox"
          checked={agreeToPolicy}
          onChange={() => setAgreeToPolicy(!agreeToPolicy)}
          className="mr-2"
        />
        I agree to the <a href="/privacy-policy" className="text-blue-500">Privacy Policy</a>
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" className="bg-blue-500 text-white p-2 w-full mb-3">Sign Up</button>
      <button type="button" onClick={handleGoogleSignUp} className="bg-red-500 text-white p-2 w-full">
        Sign up with Google
      </button>
    </form>
  );
};

export default Signup;