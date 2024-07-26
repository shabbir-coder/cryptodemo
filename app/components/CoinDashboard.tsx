"use client";

import React, { useEffect, useState } from 'react';
import CoinTable from './CoinTable';
import CoinChangeModal from './CoinChangeModal';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Image from 'next/image';


const CoinDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coinData, setCoinData] = useState([]) as any;
    const [coinImage, setCoinImage] = useState('/images/bitcoin.webp')

    const coinName = useSelector((data: any)=> data.coinName)


    const fetchCoinData = async () => {
        try {
            const response = await axios.get(`/api/coin?coin=${coinName.split('-')[0]}`);
            setCoinData(response.data.prices);
        } catch (error) {
        }
    };

    useEffect(() => {
        if (!coinName) return;

        fetchCoinData();
        setCoinImage(`/images/${coinName.split('-')[0]}.webp`)
        const intervalId = setInterval(fetchCoinData, 10000);

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
      <Image 
      src={coinImage}
      width={60}
      height={60}
      alt="Picture of the author"></Image>
      <div>
        <h3 className="text-xl font-semibold capitalize">{coinName||'No selected'}</h3>
        <h5 className="text-lg font-medium text-red">${coinData[0]?.price||'NA'}</h5>
      </div>
      <button className="bg-blue-500 text-white font-semibold py-2 px-2 rounded" onClick={handleOpenModal}
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
