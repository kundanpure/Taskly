import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="text-center">
      <h1>Todo List Application</h1>
      <p>Welcome to the Todo List Application</p>
      <div>
        <Link to="/signin" className="btn btn-primary m-2">Sign In</Link>
        <Link to="/signup" className="btn btn-secondary m-2">Sign Up</Link>
      </div>
    </div>
  );
}

export default Landing;