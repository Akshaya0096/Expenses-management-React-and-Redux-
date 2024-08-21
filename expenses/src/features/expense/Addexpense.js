import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { expenseAdded } from "../slice/ExpenseSlice";

export function AddExpense() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleAmount = (e) => setAmount(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const expensesAmount = useSelector((state) => state.expenses.entities.length);

  const handleClick = () => {
    if (amount && date && category && description) {
      dispatch(
        expenseAdded({
          id: expensesAmount + 1,
          amount:parseInt(amount),
          date,
          category,
          description,
        })
      );

      setError(null);
      navigate("/expense-list");
    } else {
      setError("Fill in all fields");
    }

    setAmount("");
    setDate("");
    setCategory("");
    setDescription("");
  };

  return (
    <div className="containers">
      <div className="card">
        <h3>Add Expense</h3>
        <div className="form-group">
          <label htmlFor="amountInput">Amount</label>
          <input
            className="u-full-width"
            type="number"
            placeholder="Enter amount"
            id="amountInput"
            onChange={handleAmount}
            value={amount}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateInput">Date</label>
          <input
            className="u-full-width"
            type="date"
            id="dateInput"
            onChange={handleDate}
            value={date}
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryInput">Category</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Enter category"
            id="categoryInput"
            onChange={handleCategory}
            value={category}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descriptionInput">Description</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Enter description"
            id="descriptionInput"
            onChange={handleDescription}
            value={description}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button onClick={handleClick} className="button-primary">
          Add Expense
        </button>
      </div>
    </div>
  );
}
