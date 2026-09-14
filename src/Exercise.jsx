import { useState, useEffect } from 'react';

function Exercise({ petEmoji }) {
  const [exerciseName, setExerciseName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [workouts, setWorkouts] = useState([]);
  
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  // Fetch workouts when component loads
  useEffect(() => {
    fetch("http://localhost:5000/api/exercises")
      .then(r => r.json())
      .then(data => setWorkouts(data));
  }, []);

  function addWorkout() {
    if (exerciseName && minutes && caloriesBurned) {
      fetch("http://localhost:5000/api/exercises", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: exerciseName, minutes: parseInt(minutes), calories: parseInt(caloriesBurned)})
      })
      .then(r => r.json())
      .then(data => {
        setExerciseName("");
        setMinutes("");
        setCaloriesBurned("");
        // Fetch updated list
        fetch("http://localhost:5000/api/exercises")
          .then(r => r.json())
          .then(data => setWorkouts(data));
      });
    }
  }

  function calculateBMI() {
    if (height && weight) {
      let heightInMeters = height / 100;
      let bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(1));
    }
  }

  let totalMinutes = workouts.reduce((sum, w) => sum + w.minutes, 0);
  let totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);

  return (
    <div style={{textAlign: "center", padding: "40px"}}>
      {petEmoji && <p style={{fontSize: "4em", marginBottom: "20px"}}>{petEmoji}</p>}
      
      <h2>Exercise Tracker</h2>
      
      <h3>Log Workout</h3>
      <div style={{marginBottom: "30px"}}>
        <input 
          type="text" 
          placeholder="Exercise type" 
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          style={{padding: "10px", marginRight: "10px"}}
        />
        <input 
          type="number" 
          placeholder="Minutes" 
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          style={{padding: "10px", marginRight: "10px"}}
        />
        <input 
          type="number" 
          placeholder="Calories burned" 
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          style={{padding: "10px", marginRight: "10px"}}
        />
        <button onClick={addWorkout}>Add Workout</button>
      </div>

      <h3>Today's Workouts:</h3>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>{workout.name} - {workout.minutes} min, {workout.calories} cal</li>
        ))}
      </ul>
      <p><strong>Total: {totalMinutes} minutes, {totalCalories} calories burned</strong></p>

      <hr />

      <h3>BMI Calculator</h3>
      <div style={{marginBottom: "20px"}}>
        <input 
          type="number" 
          placeholder="Height (cm)" 
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{padding: "10px", marginRight: "10px"}}
        />
        <input 
          type="number" 
          placeholder="Weight (kg)" 
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{padding: "10px", marginRight: "10px"}}
        />
        <button onClick={calculateBMI}>Calculate BMI</button>
      </div>
      {bmi && <p><strong>Your BMI: {bmi}</strong></p>}
    </div>
  );
}

export default Exercise;