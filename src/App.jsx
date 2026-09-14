import { useState, useEffect } from 'react';
import './styles.css';
import Home from './Home';
import MoodTracker from './MoodTracker';
import Food from './Food';
import Exercise from './Exercise';
import Inspiration from './Inspiration';
import Mindset from './Mindset';
import Situational from './Situational';

function App() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [currentPage, setCurrentPage] = useState("mood");
  const [showHome, setShowHome] = useState(true);

  const petEmojis = {
    cat: "🐱",
    dog: "🐶",
    bird: "🦅",
    rabbit: "🐰",
    tiger: "🐯"
  };

  useEffect(() => {
    let pet = localStorage.getItem("selectedPet");
    if (pet) setSelectedPet(pet);
  }, []);

  function handlePetSelect(pet) {
    localStorage.setItem("selectedPet", pet);
    setSelectedPet(pet);
  }

  if (!selectedPet && !showHome) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px"
    }}>
      <h1 style={{
        color: "#d4af37",
        fontSize: "3em",
        marginBottom: "40px",
        textAlign: "center",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
      }}>
        Pick Your Mood Buddy
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "20px",
        maxWidth: "700px",
        width: "100%"
      }}>
        {[
          {pet: "cat", emoji: "🐱", name: "Cat"},
          {pet: "dog", emoji: "🐶", name: "Dog"},
          {pet: "bird", emoji: "🦅", name: "Bird"},
          {pet: "rabbit", emoji: "🐰", name: "Rabbit"},
          {pet: "tiger", emoji: "🐯", name: "Tiger"}
        ].map(({pet, emoji, name}) => (
          <button
            key={pet}
            onClick={() => handlePetSelect(pet)}
            style={{
              background: "#2a2a2a",
              border: "3px solid #d4af37",
              color: "#d4af37",
              padding: "30px 20px",
              fontSize: "3em",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#d4af37";
              e.target.style.color = "#1a1a1a";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#2a2a2a";
              e.target.style.color = "#d4af37";
              e.target.style.transform = "scale(1)";
            }}
          >
            <span>{emoji}</span>
            <span style={{fontSize: "0.4em"}}>{name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowHome(true)}
        style={{
          marginTop: "40px",
          background: "transparent",
          border: "2px solid #d4af37",
          color: "#d4af37",
          padding: "12px 30px",
          fontSize: "1em"
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
}

  if (showHome) {
    return <Home onStart={() => setShowHome(false)} />;
  }

  return (
    <div>
      <nav style={{textAlign: "center", marginBottom: "20px"}}>
        <button onClick={() => setCurrentPage("mood")}>Mood</button>
        <button onClick={() => setCurrentPage("food")}>Food</button>
        <button onClick={() => setCurrentPage("exercise")}>Exercise</button>
        <button onClick={() => setCurrentPage("inspiration")}>Inspiration</button>
        <button onClick={() => setCurrentPage("mindset")}>Mindset</button>
        <button onClick={() => setCurrentPage("situational")}>Situational</button>
        <button onClick={() => setShowHome(true)}>Home</button>
      </nav>

      {currentPage === "mood" && <MoodTracker petEmoji={petEmojis[selectedPet]} />}
      {currentPage === "food" && <Food petEmoji={petEmojis[selectedPet]} />}
      {currentPage === "exercise" && <Exercise petEmoji={petEmojis[selectedPet]} />}
      {currentPage === "inspiration" && <Inspiration petEmoji={petEmojis[selectedPet]} />}
      {currentPage === "mindset" && <Mindset petEmoji={petEmojis[selectedPet]} />}
      {currentPage === "situational" && <Situational petEmoji={petEmojis[selectedPet]} />}
    </div>
  );
}

export default App;