import React from "react";
import logo from "./logo.svg"; // Replace with your actual team logo

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={logo} alt="S.S.C Dynamo Club Logo" className="w-48 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome to the Official S.S.C Dynamo Club Page
      </h1>
      <p className="text-lg text-gray-600 mt-3">
        Stay updated with the latest club news, matches, and player updates.
      </p>
    </div>
  );
}

export default Home;
