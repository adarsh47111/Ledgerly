import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerList: [],
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customerList = action.payload;
    },
    addCustomer: (state, action) => {
      state.customerList.push(action.payload);
    },
    removeCustomer: (state, action) => {
      state.customerList = state.customerList.filter((c) => c._id !== action.payload.id);
    },
  },
});

export const { setCustomers, addCustomer, removeCustomer } =
  customersSlice.actions;
export default customersSlice.reducer;
