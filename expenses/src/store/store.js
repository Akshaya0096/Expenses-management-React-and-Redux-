import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../features/slice/ExpenseSlice"; 
import authReducer from '../features/slice/authSlice'; 
export default configureStore({
  reducer: {
    expenses: expensesReducer, 
    auth: authReducer,
  },
});
