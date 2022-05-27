import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      return { name: "park", age: 20 };
    },
  },
});

export let { changeName } = user.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: "cart",
  initialState: [
    // { id: 0, name: "White and Black", price: 100000, count: 2 },
    // { id: 2, name: "Grey Yordan", price: 200000, count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      state[action.payload].count++;
    },
    subCount(state, action) {
      if (state[action.payload].count > 1) {
        state[action.payload].count--;
      }
    },
    addItem(state, action) {
      state.push(action.payload);
    },
    subItem(state, action) {
      state.pop(action.payload);
    },
  },
});
export let { addCount, addItem, subCount, subItem } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
