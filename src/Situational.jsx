import { useState } from 'react';

function Situational({ petEmoji }) {
  const [cupLevel, setCupLevel] = useState(100);

  const scenarios = {
    toxic: {
      change: -25,
      explanation: "Toxic people drain your energy. Your cup empties. This is why boundaries matter."
    },
    helping: {
      change: -20,
      explanation: "Helping others is good, but not at the cost of your own wellbeing. You can't pour from an empty cup."
    },
    "saying-no": {
      change: -15,
      explanation: "Not setting boundaries allows others to take from your cup. Your needs matter too."
    },
    "self-care": {
      change: 20,
      explanation: "Self care refills your cup. This isn't selfish—it's necessary. You need to fill your own cup first."
    },
    boundary: {
      change: 25,
      explanation: "Setting boundaries protects your energy. This is the most powerful thing you can do for your wellbeing."
    },
    rest: {
      change: 15,
      explanation: "Rest refills your cup. You need downtime to recover. Rest is productive."
    }
  };

  function handleScenario(scenario) {
    let change = scenarios[scenario].change;
    let newLevel = cupLevel + change;
    if (newLevel > 100) newLevel = 100;
    if (newLevel < 0) newLevel = 0;
    setCupLevel(newLevel);
  }

  function getCupLabel() {
    if (cupLevel >= 80) return "Full - You're good!";
    if (cupLevel >= 60) return "Good - Maintain this";
    if (cupLevel >= 40) return "Half - Time for self care";
    if (cupLevel >= 20) return "Low - You need rest";
    return "Empty - Burnout risk";
  }

  return (
    <div style={{textAlign: "center", padding: "40px"}}>
      {petEmoji && <p style={{fontSize: "4em", marginBottom: "20px"}}>{petEmoji}</p>}
      
      <h2>Your Emotional Cup</h2>
      <p>Different situations fill it or drain it. See what happens:</p>

      <div style={{textAlign: "center", margin: "30px 0"}}>
        <div style={{
          width: "100px",
          height: "150px",
          border: "3px solid #2D3E50",
          margin: "20px auto",
          position: "relative",
          borderRadius: "0 0 20px 20px",
          overflow: "hidden"
        }}>
          <div style={{
            width: "100%",
            height: cupLevel + "%",
            background: "#FFE66D",
            position: "absolute",
            bottom: "0",
            transition: "height 0.3s"
          }}></div>
        </div>
        <p style={{fontWeight: "bold"}}>{getCupLabel()}</p>
      </div>

      <p style={{fontWeight: "bold", marginBottom: "15px"}}>Click scenarios to see their impact:</p>

      <div style={{marginBottom: "30px"}}>
        <button onClick={() => handleScenario("toxic")} style={{background: "#FFB4A2"}}>🚫 Toxic Person (-25%)</button>
        <button onClick={() => handleScenario("helping")} style={{background: "#FFB4A2"}}>💪 Helping Without Boundaries (-20%)</button>
        <button onClick={() => handleScenario("saying-no")} style={{background: "#FFB4A2"}}>😔 Not Setting Boundary (-15%)</button>
        <br />
        <button onClick={() => handleScenario("self-care")} style={{background: "#C8E6C9"}}>🛀 Self Care (+20%)</button>
        <button onClick={() => handleScenario("boundary")} style={{background: "#C8E6C9"}}>✅ Setting Boundary (+25%)</button>
        <button onClick={() => handleScenario("rest")} style={{background: "#C8E6C9"}}>😴 Taking Rest (+15%)</button>
      </div>

      <button onClick={() => setCupLevel(100)} style={{marginTop: "20px"}}>Reset Cup</button>
    </div>
  );
}

export default Situational;