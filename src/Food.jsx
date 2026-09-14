import { useState, useEffect } from 'react';

function Food({ petEmoji }) {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [foods, setFoods] = useState([]);

  // Fetch foods when component loads
  useEffect(() => {
    fetch("http://localhost:5000/api/foods")
      .then(r => r.json())
      .then(data => setFoods(data));
  }, []);

  function addFood() {
    if (foodName && calories) {
      fetch("http://localhost:5000/api/foods", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: foodName, calories: parseInt(calories)})
      })
      .then(r => r.json())
      .then(data => {
        setFoodName("");
        setCalories("");
        // Fetch updated list
        fetch("http://localhost:5000/api/foods")
          .then(r => r.json())
          .then(data => setFoods(data));
      });
    }
  }

  let total = foods.reduce((sum, food) => sum + food.calories, 0);

  return (
    <div style={{textAlign: "center", padding: "40px"}}>
      {petEmoji && <p style={{fontSize: "4em", marginBottom: "20px"}}>{petEmoji}</p>}
      
      <h2>Food Tracker</h2>
      
      <div style={{marginBottom: "30px"}}>
        <input 
          type="text" 
          placeholder="Food item" 
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          style={{padding: "10px", marginRight: "10px"}}
        />
        <input 
          type="number" 
          placeholder="Calories" 
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          style={{padding: "10px", marginRight: "10px"}}
        />
        <button onClick={addFood}>Add Food</button>
      </div>

      <h3>Today's Food:</h3>
      <ul>
        {foods.map((food, index) => (
          <li key={index}>{food.name} - {food.calories} cal</li>
        ))}
      </ul>
      <p><strong>Total: {total} calories</strong></p>
    </div>
  );
}

export default Food;