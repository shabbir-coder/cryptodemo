"use client";

import {useState} from 'react';
import { addCoin } from '../redux/slice'; 
import { useDispatch } from 'react-redux';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CoinChangeModal({ isOpen, onClose }: ModalProps) {
  
  const [coin, setCoin] = useState('')
  const dispatch  = useDispatch()
  
  if (!isOpen) return null;
  
  const cryptoOptions = ['bitcoin', 'ethereum', 'tether', 'solana', 'usd-coin', 'binancecoin', 'ripple', 'dogecoin', 'shiba-inu']

  const coinDispatch = () =>{
    // console.log(coin);
    onClose()
    dispatch(addCoin(coin))
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50"></div>
    <div className="bg-white p-6 rounded shadow-lg z-10 w-96"> {/* Adjust width here */}
      <h2 className="text-xl font-semibold mb-4">Change Details</h2>
      <div className="mb-4">
        <label htmlFor="cryptoSelect" className="block text-sm font-medium text-gray-700">
          Select Cryptocurrency
        </label>
        <select id="cryptoSelect" name="cryptoSelect" onChange={(e)=>setCoin(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          {cryptoOptions.map(option => (
            <option className='capitalize' key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
      <button 
        // onClick={onClose}
        onClick={coinDispatch} 
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        Ok 
      </button>
      <button 
        // onClick={onClose}
        onClick={ onClose} 
        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
      >
        Close
      </button>
      </div>
    </div>
  </div>
  );
}

export default CoinChangeModal;
