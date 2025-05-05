import React, { useState, useEffect } from 'react';
import API from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

function Todos({ isAuthenticated, setIsAuthenticated }) {
  const [todos, setTodos] = useState([]);
  const [changed, setChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [inputPageNumber, setInputPageNumber] = useState(pageNumber);
  const [inputPageSize, setInputPageSize] = useState(pageSize);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const loadData = async () => {
      try {
        let url = `/todo/${pageNumber - 1}/${pageSize}`;
        if (filter === 'Completed') {
          url += `?isCompleted=true`;
        } else if (filter === 'Not Completed') {
          url += `?isCompleted=false`;
        }

        const response = await API.get(url);
        setErrorMessage('');
        setTodos(response.data);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Error: something happened');
      }
    };

    loadData();
  }, [changed, pageNumber, pageSize, filter]);

  const nextPage = () => {
    setPageNumber(prev => prev + 1);
    setInputPageNumber(prev => prev + 1);
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1);
      setInputPageNumber(prev => prev - 1);
    }
  };

  const enterPageNumber = (value) => {
    const number = parseInt(value);
    if (number >= 1) {
      setPageNumber(number);
    } else {
      setPageNumber(1);
      setInputPageNumber(1);
    }
  };

  const enterPageSize = (value) => {
    const size = parseInt(value);
    if (size >= 1) {
      setPageSize(size);
    } else {
      setPageSize(1);
      setInputPageSize(1);
    }
  };

  const markCompleted = async (id) => {
    try {
      await API.put(`/todo/${id}/markcomplete`);
      setErrorMessage('');
      setChanged(!changed);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error: something happened');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todo/${id}`);
      setErrorMessage('');
      setChanged(!changed);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error: something happened');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Todo List</h1>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <center>
        <div className="col-6 offset-8">
          <label>Show</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">NotCompleted</option>
          </select>
        </div>
      </center>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Target Date</th>
            <th>Is Completed?</th>
            <th>Mark Completed</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr className={todo.isCompleted ? 'completed' : ''} key={todo.id}>
              <td>{todo.title}</td>
              <td>{moment(todo.targetDate).format('ll')}</td>
              <td>{todo.isCompleted.toString()}</td>
              <td>
                <button className="btn btn-success" onClick={() => markCompleted(todo.id)}>Mark Completed</button>
              </td>
              <td>
                <Link to={`/update/${todo.id}`}>
                  <button className="btn btn-primary">Update</button>
                </Link>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <center>
        <div className="input-group col-xl-3 col-md-4 col-sm-5 col-6 mb-3">
          <div className="input-group-append">
            <span className="input-group-text">Todo per page:</span>
          </div>
          <input
            className="form-control text-center"
            type="number"
            value={inputPageSize}
            onChange={e => setInputPageSize(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') enterPageSize(e.target.value);
            }}
          />
        </div>

        <div className="input-group col-lg-4 col-md-6 col-sm-8 col-9">
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" onClick={previousPage}>Previous Page</button>
          </div>
          <input
            className="form-control text-center"
            type="number"
            value={inputPageNumber}
            onChange={e => setInputPageNumber(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') enterPageNumber(e.target.value);
            }}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" onClick={nextPage}>Next Page</button>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Todos;
