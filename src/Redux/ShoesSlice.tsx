import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Shoes {
  color: string;
  image: string;
  description: string;
  price: number;
  name: string;
  id: number;
  quantity: number;
}
const initialState: Shoes[] = [];

export const ShoesSlice = createSlice({
  name: 'ShoesSlice',
  initialState,
  reducers: {
    addShoes: (state, action: PayloadAction<Shoes>) => {
      state.push(action.payload);
      return state;
    },
    deleteShoes: (state, action: PayloadAction<number>) => {
      return state.filter(s => s.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      state[action.payload].quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      if (state[action.payload].quantity >= 1) {
        state[action.payload].quantity -= 1;
        if (state[action.payload].quantity === 0) {
          state.splice(action.payload, 1);
        }
        return state;
      }
    },
  },
});

export const {addShoes, deleteShoes, increaseQuantity, decreaseQuantity} =
  ShoesSlice.actions;
export default ShoesSlice.reducer;
