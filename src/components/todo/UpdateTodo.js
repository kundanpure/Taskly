import React, { useEffect, useState } from 'react';
import API from '../../api';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTodo({ isAuthenticated, setIsAuthenticated }) {
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const timeout = (delay) => new Promise((res) => setTimeout(res, delay));

  const showMessage = () => message && (
    <div className="alert alert-success" role="alert">{message}</div>
  );

  const showErrorMessage = () => errorMessage && (
    <div className="alert alert-danger" role="alert">{errorMessage}</div>
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/todo/${id}`, { title, targetDate });


      setMessage('Todo successfully updated');
      setErrorMessage('');
      await timeout(1000);
      navigate('/todo');
    } catch (error) {
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something went wrong');
      }
    }
  };

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const response = await API.get(`/todo/${id}`);


        setTitle(response.data.title);
        setTargetDate(moment(response.data.targetDate).format('YYYY-MM-DD'));
        setErrorMessage('');
      } catch (error) {
        setMessage('');
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error: something went wrong');
        }
      }
    };

    loadTodo();
  }, [id]);

  useEffect(() => {
    setMessage('');
  }, [title, targetDate]);

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Update Todo</h1>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Target Date</label>
          <input
            value={targetDate}
            type="date"
            onChange={(e) => setTargetDate(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Update Todo</button>
      </form>
      {showMessage()}
      {showErrorMessage()}
    </div>
  );
}

export default UpdateTodo;
