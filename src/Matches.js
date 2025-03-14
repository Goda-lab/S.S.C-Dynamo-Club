import React, { useEffect, useState, useContext } from "react";
import { firestore } from "./firebaseConfig"; // Import Firebase Firestore
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "./AuthProvider"; // Import AuthContext

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [newOpponent, setNewOpponent] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newVenue, setNewVenue] = useState("");
  const [newResult, setNewResult] = useState(""); // New state for match result
  const { role } = useContext(AuthContext); // Use AuthContext

  useEffect(() => {
    const fetchMatches = async () => {
      const querySnapshot = await getDocs(collection(firestore, "matches"));
      setMatches(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchMatches();
  }, []);

  const handleAddMatch = async () => {
    if (newOpponent.trim() === "" || newDate.trim() === "" || newVenue.trim() === "") return;
    const newMatch = {
      opponent: newOpponent,
      date: newDate,
      venue: newVenue,
      result: newResult, // Include result field
    };
    await addDoc(collection(firestore, "matches"), newMatch);
    setNewOpponent("");
    setNewDate("");
    setNewVenue("");
    setNewResult(""); // Reset result input
    await addNewsUpdate(`Upcoming Match: ${newOpponent} on ${newDate} at ${newVenue}`);
  };

  const handleUpdateResult = async (id, result) => {
    const matchRef = doc(firestore, "matches", id);
    await updateDoc(matchRef, { result });
    setMatches(matches.map((match) => (match.id === id ? { ...match, result } : match)));
    const updatedMatch = matches.find((match) => match.id === id);
    await addNewsUpdate(`Match Result: S.S.C Dynamo Club ${result} ${updatedMatch.opponent}`);
  };

  const addNewsUpdate = async (content) => {
    await addDoc(collection(firestore, "news"), {
      title: "Match Update",
      content,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Upcoming Matches</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.id} className="p-2 border-b">
            {match.opponent} - {match.date} at {match.venue}
            {match.result && <p>Result: {match.result}</p>}
            {role === "admin" && (
              <div>
                <input
                  type="text"
                  placeholder="Enter result"
                  value={match.result || ""}
                  onChange={(e) => handleUpdateResult(match.id, e.target.value)}
                  className="p-2 border rounded mt-2"
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      {role === "admin" && (
        <div className="mt-4">
          <input type="text" placeholder="Opponent" value={newOpponent} onChange={(e) => setNewOpponent(e.target.value)} className="p-2 border rounded" />
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="p-2 border rounded" />
          <input type="text" placeholder="Venue" value={newVenue} onChange={(e) => setNewVenue(e.target.value)} className="p-2 border rounded" />
          <input type="text" placeholder="Result (optional)" value={newResult} onChange={(e) => setNewResult(e.target.value)} className="p-2 border rounded" />
          <button onClick={handleAddMatch} className="bg-blue-500 text-white p-2 mt-2">Add Match</button>
        </div>
      )}
    </div>
  );
}