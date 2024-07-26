"use client";

import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import CoinDashboard from '../components/CoinDashboard';
import axios from 'axios';
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    const startTask = async () => {
      try {
        await axios.get('/api/backgroundTask');
      } catch (error) {
        console.error('Error starting background task:', error);
      }
    };

    startTask();

    // No need to stop the task on unmount as it should keep running in the background
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <CoinDashboard />
    </div>
  );
};

export default Home;
