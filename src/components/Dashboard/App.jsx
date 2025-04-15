import React, { useState } from "react";
import "./style.css";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState(0);
  const [calories, setCalories] = useState(0);
  const [progress, setProgress] = useState("0%");

  const calculateProgress = () => {
    const maxWorkouts = 100;
    const maxCalories = 20000;
    const workoutProgress = (workouts / maxWorkouts) * 100;
    const calorieProgress = (calories / maxCalories) * 100;
    const totalProgress = Math.min((workoutProgress + calorieProgress) / 2, 100);
    setProgress(totalProgress.toFixed(1) + "%");
  };

  return (
    <div className="container">
      <div className="header">Dashboard</div>
      <div className="stats">
        <div className="stat-box">
          <h3>Total Workouts</h3>
          <input
            type="number"
            value={workouts}
            placeholder="Enter workouts"
            onChange={(e) => {
              setWorkouts(parseFloat(e.target.value) || 0);
              calculateProgress();
            }}
          />
        </div>
        <div className="stat-box">
          <h3>Calories Burned</h3>
          <input
            type="number"
            value={calories}
            placeholder="Enter calories"
            onChange={(e) => {
              setCalories(parseFloat(e.target.value) || 0);
              calculateProgress();
            }}
          />
        </div>
        <div className="stat-box">
          <h3>Progress</h3>
          <input type="text" value={progress} placeholder="0%" readOnly />
        </div>
      </div>
      <div className="chart-placeholder">
        <p>Graph displayed here</p>
      </div>
    </div>
  );
};

export default Dashboard;