import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { expenseDeleted } from "../slice/ExpenseSlice";
import { logout } from "../slice/authSlice";  
import { useState } from "react";  
import { selectTotalAmount } from "../slice/ExpenseSlice"; // Import the selector

export function ExpenseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entities } = useSelector((state) => state.expenses);
  const loading = useSelector((state) => state.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);  
  const totalAmount = useSelector(selectTotalAmount); // Get the total amount

  const [filter, setFilter] = useState('');  

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this expense?");
    if (confirmed) {
      dispatch(expenseDeleted({ id }));
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const backgroundStyle = {
    backgroundImage: `url('https://www.prometispartners.com/wp-content/uploads/2024/05/transferable-value.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px',
  };

  const filteredExpenses = entities.filter((expense) =>
    expense.category.toLowerCase().includes(filter.toLowerCase()) ||
    expense.description.toLowerCase().includes(filter.toLowerCase())
  );

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div style={backgroundStyle}>
      <div className="container">
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h1>Expense Management System</h1>
          <button className="button-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="row">
          <div className="two columns">
            <input
              type="text"
              placeholder="Filter by category or description"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="u-full-width"
            />
          </div>
          <div className="two columns">
            <Link to="/add-expense">
              <button className="button-primary">Add Expense</button>
            </Link>
          </div>
        </div>
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="u-full-width" style={{ backgroundColor: '#001f3f', color: '#ffffff' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map(({ id, amount, date, category, description }, i) => (
                    <tr key={i}>
                      <td>{id}</td>
                      <td>{amount}</td>
                      <td>{date}</td>
                      <td>{category}</td>
                      <td>{description}</td>
                      <td>
                        <button onClick={() => handleDelete(id)}>Delete</button>
                        <Link to={`/edit-expense/${id}`}>
                          <button>Edit</button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>No expenses found</td>
                  </tr>
                )}
                <tr>
                  <td colSpan="5" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Amount:</td>
                  <td style={{ fontWeight: 'bold' }}>${totalAmount}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
