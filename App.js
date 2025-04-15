import React, { useState, useEffect, useCallback } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faHeartbeat, faPlusCircle, faList, faChartBar, 
  faChartLine, faDumbbell, faFire, faBolt, 
  faCalendarCheck, faSave, faTrash 
} from '@fortawesome/free-solid-svg-icons';
import './App.css';

// Components
import Header from './components/Header';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import ChartSection from './components/ChartSection';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';
import Notification from './components/Notification';
import BlogInput from './components/BlogInput';
import BlogPosts from './components/BlogPosts';

// Add FontAwesome icons to library
library.add(
  faHeartbeat, faPlusCircle, faList, faChartBar, 
  faChartLine, faDumbbell, faFire, faBolt, 
  faCalendarCheck, faSave, faTrash
);

function App() {
  // State
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [chartPeriod, setChartPeriod] = useState('all');
  const [posts, setPosts] = useState([]);

  // Filter workouts based on search term, sort option, and chart period
  const filterWorkouts = useCallback((search, sort, period) => {
    let filtered = [...workouts];
    
    // Filter by search term
    if (search) {
      filtered = filtered.filter(workout => 
        workout.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filter by time period
    if (period !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      filtered = filtered.filter(workout => {
        const workoutDate = new Date(workout.date);
        if (period === 'week') {
          return workoutDate >= startOfWeek;
        } else if (period === 'month') {
          return workoutDate >= startOfMonth;
        }
        return true;
      });
    }
    
    // Sort workouts
    switch (sort) {
      case 'newest':
        filtered.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case 'calories-high':
        filtered.sort((a, b) => b.calories - a.calories);
        break;
      case 'calories-low':
        filtered.sort((a, b) => a.calories - b.calories);
        break;
      default:
        break;
    }
    
    setFilteredWorkouts(filtered);
  }, [workouts]);

  // Load workouts from localStorage on component mount
  useEffect(() => {
    const storedWorkouts = localStorage.getItem('workouts');
    if (storedWorkouts) {
      const parsedWorkouts = JSON.parse(storedWorkouts);
      setWorkouts(parsedWorkouts);
      setFilteredWorkouts(parsedWorkouts);
    }
  }, []);

  // Save workouts to localStorage whenever workouts change
  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
    filterWorkouts(searchTerm, sortOption, chartPeriod);
  }, [workouts, searchTerm, sortOption, chartPeriod, filterWorkouts]);

  // Add a new workout
  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now(),
      timestamp: new Date(workout.date).getTime()
    };
    
    setWorkouts([...workouts, newWorkout]);
    showNotification('Workout added successfully!', 'success');
  };

  // Delete a workout
  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter(workout => workout.id !== id));
    showNotification('Workout deleted!', 'info');
  };



  // Handle search change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterWorkouts(value, sortOption, chartPeriod);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    filterWorkouts(searchTerm, value, chartPeriod);
  };

  // Handle chart period change
  const handleChartPeriodChange = (e) => {
    const value = e.target.value;
    setChartPeriod(value);
    filterWorkouts(searchTerm, sortOption, value);
  };

  // Show notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Calculate total calories
  const totalCalories = workouts.reduce((total, workout) => total + workout.calories, 0);

  // Calculate best workout
  const getBestWorkout = () => {
    if (workouts.length === 0) return '-';
    
    const bestWorkout = workouts.reduce((best, current) => 
      current.calories > best.calories ? current : best, workouts[0]);
    
    return `${bestWorkout.name} (${bestWorkout.calories} cal)`;
  };

  // Calculate workout streak
  const getWorkoutStreak = () => {
    if (workouts.length === 0) return '0 days';
    
    // Sort workouts by date
    const sortedDates = workouts
      .map(workout => new Date(workout.date).toISOString().split('T')[0])
      .sort()
      .reverse(); // Newest first
    
    // Remove duplicates (multiple workouts on same day)
    const uniqueDates = [...new Set(sortedDates)];
    
    // Calculate streak
    let streak = 1;
    const today = new Date().toISOString().split('T')[0];
    
    // Check if there's a workout today
    const hasWorkoutToday = uniqueDates[0] === today;
    
    // If no workout today, start checking from yesterday
    let currentDate = new Date();
    if (!hasWorkoutToday) {
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    for (let i = hasWorkoutToday ? 1 : 0; i < uniqueDates.length; i++) {
      // Get previous date to check
      currentDate.setDate(currentDate.getDate() - 1);
      const dateToCheck = currentDate.toISOString().split('T')[0];
      
      // If date exists in our workout dates, increase streak
      if (uniqueDates[i] === dateToCheck) {
        streak++;
      } else {
        break; // Streak broken
      }
    }
    
    return `${streak} day${streak !== 1 ? 's' : ''}`;
  };

  const addPost = (title, content) => {
    const newPost = { title, content };
    setPosts([newPost, ...posts]);
  };
  
  return (
    <div className="app">
      <div className="container">
        <Header />
        
        <WorkoutForm onAddWorkout={addWorkout} totalCalories={totalCalories} />
        
        <WorkoutList 
          workouts={filteredWorkouts} 
          onDeleteWorkout={deleteWorkout}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />
        
        <ChartSection 
          workouts={filteredWorkouts} 
          onChartPeriodChange={handleChartPeriodChange}
          chartPeriod={chartPeriod}
        />
        
        <StatsSection 
          totalWorkouts={workouts.length}
          totalCalories={totalCalories}
          bestWorkout={getBestWorkout()}
          workoutStreak={getWorkoutStreak()}
        />

          
      </div>
      
      <div className="container">
            <div className="header">User Blogs</div>
            <BlogInput onAddPost={addPost} />
            <BlogPosts posts={posts} />
        </div>

      <Footer />
      
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
        />
      )}
    </div>
  );
}

export default App;
