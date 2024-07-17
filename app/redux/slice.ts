import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CoinState {
    coinName: string | null;
  }

  const initialState: CoinState = {
    coinName: 'bitcoin', // Default value, to be set on client side
  };

  const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
      addCoin: (state, action: PayloadAction<string>) => {
        console.log('action', action);
        state.coinName = action.payload;
        // Save the coin name to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('coin', action.payload);
        }
      },
      setInitialCoin: (state) => {
        // Load the coin name from localStorage if available
        if (typeof window !== 'undefined') {
          state.coinName = localStorage.getItem('coin');
        }
      },
    },
  });

export const { addCoin, setInitialCoin } = coinSlice.actions;
export default coinSlice.reducer;