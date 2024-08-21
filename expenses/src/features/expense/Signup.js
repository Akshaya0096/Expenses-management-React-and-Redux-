import { useDispatch } from 'react-redux';
import { signup } from '../slice/authSlice';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

  const validateForm = () => {
    let valid = true;
    const errors = { email: '', password: '', confirmPassword: '' };

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

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const signupData = { email, password };
        await dispatch(signup(signupData)).unwrap();
        navigate('/expense-list');
      } catch (error) {
        console.error('Signup failed:', error);
      }
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <h2>Signup</h2>
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
        <div>
          <input
            className="u-full-width"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <button
          className="button-primary"
          type="button"
          onClick={handleSignup}
        >
          Signup
        </button>
        <div style={{ marginTop: '10px' }}>
          <span style={{color:'white'}}>Do you have an account? </span>
          <Link to="/" style={{color:'red'}}>SignIn here</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
