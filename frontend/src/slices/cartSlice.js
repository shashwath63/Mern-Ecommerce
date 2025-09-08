import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const storedCart = localStorage.getItem('cart');

const initialState = storedCart
  ? {
      ...JSON.parse(storedCart),
      cartItems: JSON.parse(storedCart).cartItems.filter(item => item !== null)
    }
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'Razorpay' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      if (!item) {
        return;
      }

      const existItem = state.cartItems.find(x => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map(x =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(x => x._id !== id);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems
} = cartSlice.actions;

export default cartSlice.reducer;
