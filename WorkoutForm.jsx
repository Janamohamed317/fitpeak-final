import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import styles from './WorkoutForm.module.css';

const WorkoutForm = ({ onAddWorkout, totalCalories }) => {
  // State for form inputs
  const [workoutName, setWorkoutName] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };
  
  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)' },
    tap: { scale: 0.95 }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (workoutName.trim() === '' || isNaN(caloriesBurned) || caloriesBurned <= 0 || !workoutDate) {
      // You could add more sophisticated validation or error messages here
      return;
    }
    
    // Set submitting state to show animation
    setIsSubmitting(true);

    // Create workout object
    const newWorkout = {
      name: workoutName,
      calories: parseInt(caloriesBurned),
      date: workoutDate
    };

    // Simulate a slight delay for the animation
    setTimeout(() => {
      // Call parent function to add workout
      onAddWorkout(newWorkout);

      // Reset form
      setWorkoutName('');
      setCaloriesBurned('');
      setWorkoutDate(new Date().toISOString().split('T')[0]);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <motion.section 
      className={`${styles.section} workout-form-section`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <FontAwesomeIcon icon="plus-circle" className={styles.sectionIcon} /> 
        Add Workout
      </motion.h2>
      
      <motion.form 
        id="workout-form" 
        onSubmit={handleSubmit}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className={`${styles.workoutForm} ${isSubmitting ? styles.submitting : ''}`}
      >
        <motion.div className={styles.formGroup} variants={inputVariants}>
          <label htmlFor="workout-name">
            <FontAwesomeIcon icon="dumbbell" className={styles.inputIcon} />
            Workout Name
          </label>
          <input
            type="text"
            id="workout-name"
            placeholder="e.g. Running, Swimming"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            required
            className={styles.formInput}
          />
        </motion.div>
        
        <motion.div className={styles.formGroup} variants={inputVariants}>
          <label htmlFor="calories-burned">
            <FontAwesomeIcon icon="fire" className="input-icon" />
            Calories Burned
          </label>
          <input
            type="number"
            id="calories-burned"
            placeholder="e.g. 300"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            min="1"
            required
            className={styles.formInput}
          />
        </motion.div>
        
        <motion.div className={styles.formGroup} variants={inputVariants}>
          <label htmlFor="workout-date">
            <FontAwesomeIcon icon="calendar-alt" className="input-icon" />
            Date
          </label>
          <input
            type="date"
            id="workout-date"
            value={workoutDate}
            onChange={(e) => setWorkoutDate(e.target.value)}
            required
            className={styles.formInput}
          />
        </motion.div>
        
        <motion.button 
          type="submit"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon="spinner" spin /> Saving...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon="save" /> Save Workout
            </>
          )}
        </motion.button>
      </motion.form>
      
      <motion.div 
        className={styles.totalCalories}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3>
          <FontAwesomeIcon icon="fire" className={styles.totalIcon} /> 
          Total Calories Burned:{' '}
          <motion.span 
            id="total-calories"
            className={styles.totalAmount}
            key={totalCalories}
            initial={{ scale: 1.2, color: '#2ecc71' }}
            animate={{ scale: 1, color: '#2ecc71' }}
            transition={{ duration: 0.5 }}
          >
            {totalCalories}
          </motion.span>
        </h3>
      </motion.div>
    </motion.section>
  );
};

export default WorkoutForm;
