import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slice/authSlice';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const validateForm = () => {
    let valid = true;
    const errors = { email: '', password: '' };

    if (!email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email format is invalid';
      valid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const loginData = { email, password };
        await dispatch(login(loginData)).unwrap();
        navigate('/expense-list');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <div className="container" >
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>
        <div>
          <input
          
            className="u-full-width"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input
            className="u-full-width"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button
          className="button-primary"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>
        <div style={{ marginTop: '10px' }}>
          <span style={{color:'white'}}>Don't have an account? </span>
          <Link to="/signup" style={{color:'red'}}>Sign up here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
