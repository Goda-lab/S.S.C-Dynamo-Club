import React, { useEffect, useState, useContext } from "react";
import { firestore } from "./firebaseConfig"; // Import Firebase Firestore
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import defaultImage from "./default-coach.png"; // Default image
import { AuthContext } from "./AuthProvider"; // Import AuthContext

export default function Coach() {
  const [coaches, setCoaches] = useState([]);
  const [newCoach, setNewCoach] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [aboutCoach, setAboutCoach] = useState(""); // New state for "About Coach"
  const { role } = useContext(AuthContext); // Use AuthContext

  useEffect(() => {
    const fetchCoaches = async () => {
      const querySnapshot = await getDocs(collection(firestore, "coaches"));
      setCoaches(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchCoaches();
  }, []);

  const handleAddCoach = async () => {
    if (newCoach.trim() === "") return;

    await addDoc(collection(firestore, "coaches"), {
      name: newCoach,
      image: imageUrl || defaultImage, // Use default if no image URL provided
      about: aboutCoach, // Include "About Coach" information
    });

    setNewCoach("");
    setImageUrl("");
    setAboutCoach(""); // Reset "About Coach" input
  };

  const handleRemoveCoach = async (id) => {
    await deleteDoc(doc(firestore, "coaches", id));
    setCoaches(coaches.filter((coach) => coach.id !== id));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Coaches</h2>
      <ul>
        {coaches.map((coach) => (
          <li key={coach.id} className="flex justify-between p-2 border-b">
            <div>
              <img src={coach.image} alt={coach.name} className="w-16 h-16 object-cover rounded-full" />
              <p>{coach.name}</p>
              <p>{coach.about}</p> {/* Display "About Coach" information */}
            </div>
            {role === "admin" && (
              <button onClick={() => handleRemoveCoach(coach.id)} className="text-red-500">Remove</button>
            )}
          </li>
        ))}
      </ul>

      {role === "admin" && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter coach name"
            value={newCoach}
            onChange={(e) => setNewCoach(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Enter image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="p-2 border rounded"
          />
          <textarea
            placeholder="About Coach"
            value={aboutCoach}
            onChange={(e) => setAboutCoach(e.target.value)}
            className="p-2 border rounded mt-2"
          />
          <button onClick={handleAddCoach} className="bg-blue-500 text-white p-2 ml-2 mt-2">Add Coach</button>
        </div>
      )}
    </div>
  );
}