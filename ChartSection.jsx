import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Bar, Line, Pie } from 'react-chartjs-2';
import styles from './ChartSection.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartSection = ({ workouts, onChartPeriodChange, chartPeriod }) => {
  const [chartType, setChartType] = useState('bar');
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants for framer-motion
  const chartContainerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }
  };

  // Generate colors for pie chart
  const generateColors = (count) => {
    const baseColors = [
      'rgba(52, 152, 219, 0.6)', // Blue
      'rgba(46, 204, 113, 0.6)', // Green
      'rgba(155, 89, 182, 0.6)', // Purple
      'rgba(231, 76, 60, 0.6)',  // Red
      'rgba(241, 196, 15, 0.6)'  // Yellow
    ];
    
    return Array(count).fill().map((_, i) => baseColors[i % baseColors.length]);
  };

  // Prepare chart data
  const chartData = {
    labels: workouts.map(workout => workout.name),
    datasets: [
      {
        label: 'Calories Burned',
        data: workouts.map(workout => workout.calories),
        backgroundColor: chartType === 'pie' 
          ? generateColors(workouts.length) 
          : 'rgba(52, 152, 219, 0.6)',
        borderColor: chartType === 'pie'
          ? generateColors(workouts.length).map(color => color.replace('0.6', '1'))
          : 'rgba(52, 152, 219, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y || context.parsed} calories`;
          }
        }
      }
    },
    scales: chartType !== 'pie' ? {
      x: {
        title: {
          display: true,
          text: 'Workout'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Calories Burned'
        }
      }
    } : undefined
  };

  // Render appropriate chart based on type
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  return (
    <motion.section 
      className={`section ${styles.chartSection}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FontAwesomeIcon 
          icon="chart-bar" 
          className={styles.sectionIcon}
          style={{ color: chartType === 'bar' ? '#3498db' : 
                  chartType === 'line' ? '#2ecc71' : 
                  chartType === 'pie' ? '#e74c3c' : '#3498db' }}
        /> 
        Calories Burned Chart
      </motion.h2>
      
      <motion.div 
        className={styles.chartControls}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className={styles.chartControlItem}>
          <label htmlFor="chart-type">Chart Type:</label>
          <select
            id="chart-type"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className={styles.chartSelect}
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
        
        <div className={styles.chartControlItem}>
          <label htmlFor="chart-period">Time Period:</label>
          <select
            id="chart-period"
            value={chartPeriod}
            onChange={onChartPeriodChange}
            className={styles.chartSelect}
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </motion.div>
      
      <motion.div 
        className={styles.chartContainer}
        variants={chartContainerVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {workouts.length === 0 ? (
          <motion.div 
            className={styles.emptyMessage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            <FontAwesomeIcon icon="chart-line" className={styles.emptyChartIcon} />
            <p>No workout data to display. Add workouts to see your chart.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.chartWrapper}
          >
            {renderChart()}
            <div className={`${styles.chartOverlay} ${isHovered ? styles.visible : ''}`}>
              <div className={styles.chartInfo}>
                <span className={styles.chartInfoTitle}>{chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart</span>
                <span className={styles.chartInfoDesc}>Showing calories burned for {chartPeriod === 'all' ? 'all time' : chartPeriod === 'week' ? 'this week' : 'this month'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default ChartSection;
