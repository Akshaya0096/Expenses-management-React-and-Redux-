import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; 
import { AddExpense } from "./features/expense/Addexpense";
import { EditExpense } from "./features/expense/EditExpense";
import React from "react";
import { ExpenseList } from "./features/expense/ExpenseList";
import Login from './features/expense/Login';  
import Signup from './features/expense/Signup'; 

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/edit-expense/:id" element={<EditExpense />} />
          <Route path="/expense-list" element={<ExpenseList />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}
