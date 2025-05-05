import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import ViewTodos from './components/todo/ViewTodos';
import AddTodo from './components/todo/AddTodo';
import UpdateTodo from './components/todo/UpdateTodo';
import Header from './components/header/Header';
import Landing from './components/page/Landing';
import About from './components/page/About';
import NotFound from './components/page/NotFound';
import './App.css';
import './bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem('token')
  );

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <div className="container mt-3">
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />
          <Route
            path="/signin"
            element={<Signin isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/signup"
            element={<Signup isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/signout"
            element={<Signout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <ViewTodos isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddTodo isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <ProtectedRoute>
                <UpdateTodo isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;