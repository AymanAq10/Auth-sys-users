// src/components/UserDashboard.js
import React from 'react';

function UserDashboard() {
  function cleartoken(){
      localStorage.clear()
      window.location="/"
   }
  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome to the user dashboard!</p>
      <button onClick={()=>cleartoken()}>logout</button>
    </div>
  );
}

export default UserDashboard;

