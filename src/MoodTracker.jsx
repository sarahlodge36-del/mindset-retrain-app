import { useState, useEffect } from 'react';

function MoodTracker({ petEmoji }) {
  const [mood, setMood] = useState("happy");
  const [moods, setMoods] = useState([]);

  // Fetch moods when component loads
  useEffect(() => {
    fetch("https://mindset-retrain-backend.onrender.com/api/moods")
      .then(r => r.json())
      .then(data => setMoods(data));
  }, []);

  // Add mood to backend
  function addMood() {
    fetch("https://mindset-retrain-backend.onrender.com/api/moods", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({mood: mood})
    })
    .then(r => r.json())
    .then(data => {
      // Fetch updated list from backend
      fetch("https://mindset-retrain-backend.onrender.com/api/moods")
        .then(r => r.json())
        .then(data => setMoods(data));
    });
  }

  return (
    <div style={{textAlign: "center", padding: "40px"}}>
      {petEmoji && <p style={{fontSize: "4em", marginBottom: "20px"}}>{petEmoji}</p>}
      
      <h2>How are you feeling?</h2>
      <p>Your mood: {mood}</p>
      
      <div style={{marginBottom: "20px"}}>
        <button onClick={() => setMood("happy")}>😊 Happy</button>
        <button onClick={() => setMood("sad")}>😢 Sad</button>
        <button onClick={() => setMood("anxious")}>😰 Anxious</button>
        <button onClick={() => setMood("calm")}>😌 Calm</button>
        <button onClick={() => setMood("motivated")}>💪 Motivated</button>
      </div>
      
      <button onClick={addMood}>Log Mood</button>
      
      <h3>Mood History:</h3>
      <ul>
        {moods.map((entry, index) => (
          <li key={index}>{entry.mood} at {entry.timestamp}</li>
        ))}
      </ul>
    </div>
  );
}

export default MoodTracker;