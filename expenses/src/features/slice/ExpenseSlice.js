import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialExpenses = [
  {
    id: 1,
    amount: 50,
    date: "2024-08-01",
    category: "Groceries",
    description: "Bought groceries at the supermarket",
  },
  {
    id: 2,
    amount: 100,
    date: "2024-08-02",
    category: "Utilities",
    description: "Paid electricity bill",
  },
  {
    id: 3,
    amount: 200,
    date: "2024-08-03",
    category: "Entertainment",
    description: "Bought concert tickets",
  },
];

const ExpenseSlice = createSlice({
  name: "expenses",
  initialState: {
    entities: initialExpenses, 
    loading: false,
  },
  reducers: {
    expenseAdded(state, action) {
      state.entities.push(action.payload);
    },
    expenseUpdated(state, action) {
      const { id, amount, date, category, description } = action.payload;
      const existingExpense = state.entities.find((expense) => expense.id === id);
      if (existingExpense) {
        existingExpense.amount = amount;
        existingExpense.date = date;
        existingExpense.category = category;
        existingExpense.description = description;
      }
    },
    expenseDeleted(state, action) {
      const { id } = action.payload;
      state.entities = state.entities.filter((expense) => expense.id !== id);
    },
  },

});


const selectAllExpenses = (state) => state.expenses.entities;


export const selectTotalAmount = createSelector(
  [selectAllExpenses],
  (expenses) => expenses.reduce((total, expense) => total + expense.amount, 0)
);

export const { expenseAdded, expenseUpdated, expenseDeleted } = ExpenseSlice.actions;

export default ExpenseSlice.reducer;
