import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebaseConfig"; // ✅ Correct import
import { AuthContext } from "./AuthProvider"; // Import AuthContext

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser, setRole } = useContext(AuthContext); // Use AuthContext

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await refreshUserClaims(); // Refresh user claims after login
      setUser(user); // Set user in context
      const idTokenResult = await user.getIdTokenResult();
      setRole(idTokenResult.claims.role || "member"); // Set role in context
      navigate("/"); // Redirect to home after login
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await refreshUserClaims(); // Refresh user claims after login
      setUser(user); // Set user in context
      const idTokenResult = await user.getIdTokenResult();
      setRole(idTokenResult.claims.role || "member"); // Set role in context
      navigate("/"); // Redirect to home after login
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert(error.message);
    }
  };

  const refreshUserClaims = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.getIdToken(true); // Forces a fresh token with new claims
    }
  };

  return (
    <div className="p-5 max-w-sm mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-green-500 text-white p-2 w-full mb-3">
        Login
      </button>
      <button onClick={handleGoogleSignIn} className="bg-blue-500 text-white p-2 w-full">
        Sign in with Google
      </button>
    </div>
  );
}