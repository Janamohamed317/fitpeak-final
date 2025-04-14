import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import styles from './StatsSection.module.css';

const StatsSection = ({ totalWorkouts, totalCalories, bestWorkout, workoutStreak }) => {
  // Animation variants for the section
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  };
  
  // Animation variants for stat cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 10 }
    },
    hover: { 
      y: -10, 
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      transition: { type: 'spring', stiffness: 300, damping: 10 }
    }
  };
  
  // Animation variants for the icons
  const iconVariants = {
    hidden: { scale: 0, rotate: -30 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 } 
    },
    hover: { 
      scale: 1.2,
      rotate: 5,
      transition: { type: 'spring', stiffness: 300, damping: 10 }
    }
  };
  
  // Animation variants for the text
  const textVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    hover: { x: 5 }
  };
  
  return (
    <motion.section 
      className={`section ${styles.statsSection}`}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={textVariants}>
        <FontAwesomeIcon icon="chart-line" className={styles.sectionIcon} /> 
        Your Statistics
      </motion.h2>
      
      <div className={styles.statsGrid}>
        <motion.div 
          className={`${styles.statCard} ${styles.totalWorkouts}`}
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.div 
            className={styles.statIcon}
            variants={iconVariants}
          >
            <FontAwesomeIcon icon="dumbbell" />
          </motion.div>
          <motion.div 
            className={styles.statInfo}
            variants={textVariants}
          >
            <h3>Total Workouts</h3>
            <motion.p 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              {totalWorkouts}
            </motion.p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={`${styles.statCard} ${styles.totalCalories}`}
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.div 
            className={styles.statIcon}
            variants={iconVariants}
          >
            <FontAwesomeIcon icon="fire" />
          </motion.div>
          <motion.div 
            className={styles.statInfo}
            variants={textVariants}
          >
            <h3>Total Calories</h3>
            <motion.p 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
            >
              {totalCalories}
            </motion.p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={`${styles.statCard} ${styles.bestWorkout}`}
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.div 
            className={styles.statIcon}
            variants={iconVariants}
          >
            <FontAwesomeIcon icon="bolt" />
          </motion.div>
          <motion.div 
            className={styles.statInfo}
            variants={textVariants}
          >
            <h3>Best Workout</h3>
            <motion.p 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, type: 'spring' }}
            >
              {bestWorkout}
            </motion.p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={`${styles.statCard} ${styles.workoutStreak}`}
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.div 
            className={styles.statIcon}
            variants={iconVariants}
          >
            <FontAwesomeIcon icon="calendar-check" />
          </motion.div>
          <motion.div 
            className={styles.statInfo}
            variants={textVariants}
          >
            <h3>Streak</h3>
            <motion.p 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, type: 'spring' }}
            >
              {workoutStreak}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default StatsSection;
