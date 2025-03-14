import React, { useEffect, useState, useContext } from "react";
import { firestore } from "./firebaseConfig"; // Import Firebase Firestore
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import defaultImage from "./default-player.png";
import { AuthContext } from "./AuthProvider"; // Import AuthContext

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dob, setDob] = useState(""); // New state for date of birth
  const [position, setPosition] = useState(""); // New state for position
  const [number, setNumber] = useState(""); // New state for number
  const { role } = useContext(AuthContext); // Use AuthContext

  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(firestore, "players"));
      setPlayers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchPlayers();
  }, []);

  const handleAddPlayer = async () => {
    if (newPlayer.trim() === "" || dob.trim() === "" || position.trim() === "" || number.trim() === "") return;
    await addDoc(collection(firestore, "players"), { 
      name: newPlayer,
      image: imageUrl || defaultImage,
      dob,
      position,
      number,
    });
    setNewPlayer("");
    setImageUrl("");
    setDob("");
    setPosition("");
    setNumber("");
  };

  const handleRemovePlayer = async (id) => {
    await deleteDoc(doc(firestore, "players", id));
    setPlayers(players.filter((player) => player.id !== id));
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id} className="flex justify-between p-2 border-b">
            <div>
              <img src={player.image} alt={player.name} className="w-16 h-16 object-cover rounded-full" />
              <p>{player.name}</p>
              <p>Age: {calculateAge(player.dob)}</p> {/* Display player's age */}
              <p>Position: {player.position}</p> {/* Display player's position */}
              <p>Number: {player.number}</p> {/* Display player's number */}
            </div>
            {role === "admin" && (
              <button onClick={() => handleRemovePlayer(player.id)} className="text-red-500">Remove</button>
            )}
          </li>
        ))}
      </ul>

      {role === "admin" && (
        <div className="mt-4">
          <input type="text" placeholder="Enter player name" value={newPlayer} onChange={(e) => setNewPlayer(e.target.value)} className="p-2 border rounded" />
          <input type="text" placeholder="Enter image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="p-2 border rounded" />
          <input type="date" placeholder="Enter date of birth" value={dob} onChange={(e) => setDob(e.target.value)} className="p-2 border rounded" />
          <select value={position} onChange={(e) => setPosition(e.target.value)} className="p-2 border rounded">
            <option value="">Select position</option>
            <option value="Forward">Forward</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Defender">Defender</option>
            <option value="Goalkeeper">Goalkeeper</option>
          </select>
          <input type="number" placeholder="Enter player number" value={number} onChange={(e) => setNumber(e.target.value)} className="p-2 border rounded" />
          <button onClick={handleAddPlayer} className="bg-blue-500 text-white p-2 ml-2">Add Player</button>
        </div>
      )}
    </div>
  );
}