import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

function AddTodo({ isAuthenticated, setIsAuthenticated }) {
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/todo', { title, targetDate });


      setTitle('');
      setTargetDate('');
      setErrorMessage('');
      setMessage('Todo successfully created');
    } catch (error) {
      setMessage('');
      setErrorMessage(
        error.response?.data?.message || 'Error: something happened'
      );
    }
  };

  useEffect(() => {
    setMessage('');
  }, [title, targetDate]);

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Add New Todo</h1>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Target Date</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Todo
        </button>
      </form>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
    </div>
  );
}

export default AddTodo;
