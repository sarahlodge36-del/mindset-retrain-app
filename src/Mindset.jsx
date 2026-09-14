import { useState, useEffect } from 'react';

function Mindset({ petEmoji }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [affirmation, setAffirmation] = useState(null);
  const [affirmations, setAffirmations] = useState({});

  // Fetch affirmations from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/mindset")
      .then(r => r.json())
      .then(data => setAffirmations(data));
  }, []);

  function getRandomAffirmation(category) {
    let random = Math.floor(Math.random() * affirmations[category].length);
    setAffirmation(affirmations[category][random]);
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    getRandomAffirmation(category);
  }

  return (
    <div style={{textAlign: "center", padding: "40px"}}>
      {petEmoji && <p style={{fontSize: "4em", marginBottom: "20px"}}>{petEmoji}</p>}
      
      <h2>Mindset Shifts</h2>
      <p>Choose what you need to reframe:</p>
      
      <div style={{marginBottom: "30px"}}>
        <button onClick={() => handleCategoryClick("selfcare")}>Self Care</button>
        <button onClick={() => handleCategoryClick("worthy")}>Self Worth</button>
        <button onClick={() => handleCategoryClick("progress")}>Progress</button>
        <button onClick={() => handleCategoryClick("mistakes")}>Mistakes</button>
        <button onClick={() => handleCategoryClick("boundaries")}>Boundaries</button>
      </div>

      {affirmation && (
        <div>
          <div style={{background: "#f0f0f0", padding: "20px", borderRadius: "8px", marginBottom: "20px"}}>
            <p style={{fontSize: "1.2em", fontStyle: "italic"}}>{affirmation}</p>
          </div>
          <button onClick={() => handleCategoryClick(selectedCategory)}>Get Another</button>
        </div>
      )}
    </div>
  );
}

export default Mindset;