import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from './Components/SignUp';
import Signin from './Components/Signin';
import Dashboard from './Components/adminDashbord';
import UserDashboard from './Components/UserDashbord';
import ResetPasswordForm from './Components/resetPassword';
import UpdateUser from './Components/UpdateUser'
import './App.css'
function App() {
  const [data, setData] = useState('');
  const [role, setRole] = useState('');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [loading,setloading]=useState(true)
  const [Erroor,setError]=useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRole(response.data[0].role)
      	setData(response.data)
      	setloading(false)
      } catch (error) {
        setloading(false)
        console.log('Failed to fetch user role:', error.response.data.error);
        error.response.data.error && setError(error.response.data.error)
      }
    };

    if (token) {
      fetchUserRole();

      if(Erroor!==''){
      console.log(Erroor)      
      }
    }

  }, [token,role,Erroor]);

  return (
    <>
    {role ==='admin' && loading && <div>...Loading</div>}
    <Routes>
      {data && role === 'admin' && <Route path="/Dashboard" element={<Dashboard data={data} loading={loading}/>}/>}
      {
      role !== 'admin' && <>
	<Route path="/user-dashboard" element={ <UserDashboard/>} />
	<Route path="/UpdateUser/:id" element={<UpdateUser/>}/>
	</>
	}
      {!token &&<>
        <Route path="/" element={<Signin/>} />
      	<Route path="/register" element={<SignUp />} />
      	<Route path="/login" element={<Signin />} />
      	<Route path="*" element={<Notfound/>}/>
        <Route path="/VE_RPassord" element={<ResetPasswordForm/>}/>
      	</>
      }
        {!loading && <Route path="*" element={<Notfound/>}/>}
    </Routes></>
  );
}
function Notfound(){
return (
<div style={{background: "linear-gradient(180deg,red -14%,turquoise 38%)"}}>
 	<h2 style={{
 			textAlign: "center",
    			letterSpacing: "3px",
 		        margin: "0",
    			lineHeight: "100vh"}}>NOT FOUND </h2>
</div>
)
}
export default App;

