import React, { useState, useEffect, useContext } from "react";
import { database } from "./firebaseConfig"; // Import Firebase Database
import { ref, push, remove, onValue } from "firebase/database";
import clubLogo from "./club-logo.png";
import { AuthContext } from "./AuthProvider"; // Import AuthContext

function News() {
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { role } = useContext(AuthContext); // Use AuthContext

  useEffect(() => {
    const newsRef = ref(database, "news");
    onValue(newsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNewsList(Object.entries(data).map(([id, value]) => ({ id, ...value })));
      }
    });
  }, []);

  const addNews = () => {
    if (!title || !content) return;
    const newsRef = ref(database, "news");
    push(newsRef, {
      title,
      content,
      imageUrl: imageUrl || clubLogo, // Default club logo if no image
    });
    setTitle("");
    setContent("");
    setImageUrl("");
  };

  const deleteNews = (id) => {
    const newsRef = ref(database, `news/${id}`);
    remove(newsRef);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Club News</h2>
      {role === "admin" && (
        <div className="mb-5">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="border p-2 w-full mb-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            className="border p-2 w-full mb-2"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button onClick={addNews} className="bg-blue-500 text-white p-2 w-full">Add News</button>
        </div>
      )}
      <ul>
        {newsList.map((news) => (
          <li key={news.id} className="border p-3 mb-3">
            <h3 className="text-xl font-bold">{news.title}</h3>
            <img src={news.imageUrl || clubLogo} alt="News" className="w-full h-40 object-cover mt-2" />
            <p>{news.content}</p>
            {role === "admin" && (
              <button onClick={() => deleteNews(news.id)} className="bg-red-500 text-white p-2 mt-2">Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;