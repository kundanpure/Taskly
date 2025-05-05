import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

function Signup({ isAuthenticated, setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/auth/signup', { username, password });

      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('name', response.data.username);
      setIsAuthenticated(true);

      setUsername('');
      setPassword('');
      setErrorMessage('');
      setMessage('Sign up successful');

      setTimeout(() => {
        navigate('/todo');
      }, 1000);
    } catch (error) {
      setMessage('');
      setIsAuthenticated(false);
      setErrorMessage(
        error.response?.data?.message || 'Error: something happened'
      );
    }
  };

  useEffect(() => {
    setMessage('');
  }, [username, password]);

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Sign Up
        </button>
      </form>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
    </div>
  );
}

export default Signup;
