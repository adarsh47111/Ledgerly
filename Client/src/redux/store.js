import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import customersReducer from "./customerSlice";
import invoicesReducer from "./invoiceSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        customers: customersReducer,
        invoices: invoicesReducer,
    },
});

export default store;
