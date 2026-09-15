import { useState, useEffect } from 'react';

function Inspiration({ petEmoji }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [inspirations, setInspirations] = useState({});

  // Fetch inspirations from backend
  useEffect(() => {
    fetch("https://mindset-retrain-backend.onrender.com/api/inspirations")
      .then(r => r.json())
      .then(data => setInspirations(data));
  }, []);

  return (
    <div style={{textAlign: "center", padding: "40px"}}>
      {petEmoji && <p style={{fontSize: "4em", marginBottom: "20px"}}>{petEmoji}</p>}
      
      <h2>Daily Inspiration</h2>
      <p>Select your mood for inspiration:</p>
      
      <div style={{marginBottom: "30px"}}>
        <button onClick={() => setSelectedMood("sad")}>😢 Sad</button>
        <button onClick={() => setSelectedMood("anxious")}>😰 Anxious</button>
        <button onClick={() => setSelectedMood("unmotivated")}>😒 Unmotivated</button>
        <button onClick={() => setSelectedMood("struggling")}>😔 Struggling</button>
        <button onClick={() => setSelectedMood("lost")}>🌫️ Lost</button>
      </div>
      {selectedMood && inspirations[selectedMood] && (
        <div style={{background: "#f0f0f0", padding: "20px", borderRadius: "8px"}}>
          <p style={{fontSize: "1.2em", fontStyle: "italic"}}>{inspirations[selectedMood]}</p>
        </div>
      )}
    </div>
  );
}

export default Inspiration;