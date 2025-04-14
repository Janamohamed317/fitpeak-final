import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './WorkoutList.module.css';

const WorkoutList = ({ 
  workouts, 
  onDeleteWorkout, 
  searchTerm, 
  onSearchChange, 
  sortOption, 
  onSortChange 
}) => {
  // Animation variants for list items
  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 }
  };
  
  // Animation variants for the empty message
  const emptyVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 260,
        damping: 20 
      }
    }
  };
  
  // Animation variants for the section
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    <motion.section 
      className="section workout-list-section"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.h2 variants={listVariants}>
        <FontAwesomeIcon icon="list" /> Your Workouts
      </motion.h2>
      
      <motion.div className={styles.listControls} variants={listVariants}>
        <input 
          type="text" 
          id="search-workout" 
          placeholder="Search workouts..." 
          value={searchTerm}
          onChange={onSearchChange}
        />
        <select 
          id="sort-workouts"
          value={sortOption}
          onChange={onSortChange}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="calories-high">Highest Calories</option>
          <option value="calories-low">Lowest Calories</option>
        </select>
      </motion.div>
      
      <AnimatePresence>
        {workouts.length === 0 ? (
          <motion.div 
            className={styles.emptyMessage}
            variants={emptyVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <FontAwesomeIcon icon="dumbbell" className={styles.emptyIcon} />
            <p>No workouts found. Add your first workout!</p>
          </motion.div>
        ) : (
          <motion.ul 
            id="workouts" 
            className={styles.workoutList}
            variants={listVariants}
          >
            <TransitionGroup component={null}>
              {workouts.map(workout => (
                <CSSTransition
                  key={workout.id}
                  timeout={300}
                  classNames={{
                    enter: styles.listItemEnter,
                    enterActive: styles.listItemEnterActive,
                    exit: styles.listItemExit,
                    exitActive: styles.listItemExitActive
                  }}
                >
                  <motion.li 
                    className={styles.workoutItem}
                    layout
                    whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                  >
                    <div className={styles.workoutInfo}>
                      <span className={styles.workoutName}>{workout.name}</span>
                      <span className={styles.workoutCalories}>{workout.calories} Calories</span>
                      <span className={styles.workoutDate}>
                        {format(new Date(workout.date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <motion.button 
                      className={styles.deleteBtn}
                      onClick={() => onDeleteWorkout(workout.id)}
                      whileHover={{ scale: 1.1, color: '#e74c3c' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FontAwesomeIcon icon="trash" />
                    </motion.button>
                  </motion.li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default WorkoutList;
