import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    removeInvoice: (state, action) => {
      state.invoices = state.invoices.filter((i) => i.id !== action.payload);
    },
  },
});

export const { setInvoices, addInvoice, removeInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
