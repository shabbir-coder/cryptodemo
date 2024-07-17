"use client";

import React, { useEffect, useState } from 'react';
import CoinTable from './CoinTable';
import CoinChangeModal from './CoinChangeModal';
import { useSelector } from 'react-redux';
import axios from 'axios';


const CoinDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coinData, setCoinData] = useState([]) as any;

    const coinName = useSelector((data: any)=> data.coinName)


    const fetchCoinData = async () => {
        try {
            const response = await axios.get(`/api/coin?coin=${coinName}`);
            console.log('response', response.data.prices);
            setCoinData(response.data.prices);
        } catch (error) {
            console.error('Error fetching coin data:', error);
        }
    };

    useEffect(() => {
        if (!coinName) return;

        fetchCoinData();

        const intervalId = setInterval(fetchCoinData, 5000);

        return () => clearInterval(intervalId);
    }, [coinName]);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
  return (
    <div className='container p-3'>
        <h2 className='text-center'>🪙 Crypto Coin Tracker 🪙</h2>
    <div className="mx-auto p-3 bg-white shadow rounded flex justify-between items-center">
      <div>
        <h3 className="text-xxl font-semibold capitalize">{coinName||'No selected'}</h3>
        <h5 className="text-lg font-medium text-red">${coinData[0]?.price||'NA'}</h5>
      </div>
      <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded" onClick={handleOpenModal}
>
        Change
      </button>
    </div>
    <CoinTable data={coinData} />
    <CoinChangeModal isOpen={isModalOpen} onClose={handleCloseModal} />

    </div>
  );
};

export default CoinDashboard;
