import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
//import { Route, Router, Routes } from 'react-router'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import UserProfile from './components/UserProfile/UserProfile'
import FitnessGoals from './components/FitnessGoals/FitnessGoals'

import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/Fitness-goals' element={<FitnessGoals />} />
        </Routes>
      </Router>
      </>
  )
}

export default App
