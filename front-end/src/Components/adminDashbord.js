// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import './adminDashbord.css';
import img from './4333097.jpg';
import UpdateUser from './UpdateUser.js'
import {Link} from 'react-router-dom';
import axios from 'axios'
function Dashboard(props) {
  const [loading,setloading]=useState('')

const [data,setdata]=useState(null);
const [isloading,setisLoading]=useState(false);
const [errMsg,seterrMsg]=useState(null);
const token = localStorage.getItem('token');
const api = `https://auth-sys-users.onrender.com/users`


useEffect(()=>{

setisLoading(true)

fetch(api,
	{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
).then((res) => {

if(!res.ok){
	throw Error(res.statusText?res.statusText:"error");
}


return res.json();

})
.then((data) => {
        setdata(data)
	setisLoading(false)
})
.catch((err) => {
	setisLoading(false);
	seterrMsg(err.message);
});



},[]);


   function cleartoken(){
      localStorage.clear()
      window.location="/"
   }
  return (
    <div className="container">
    <nav>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard!</p>
      <button onClick={()=>cleartoken()}>logout</button>
    </nav>
    <section>
    {isloading && <div>loading...</div>}
    {props.loading && !props.data && <div><h3>...loading</h3></div>}
    	{!props.loading && data && data.map((user,i)=>{
    		return (
<div  key={i} class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-end px-4 pt-4">
       
	<Dropdown id={user.userId}/>
    </div>
    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={img} alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.fullName}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
    </div>
</div>
)
    	})}
    	{!props.data && <h1>failed to fetch </h1>}
    	{!data && !isloading && <div>No data</div>} 
    </section>
    </div>                  
  );
}

export default Dashboard;

export function Dropdown(props){
const [showDropdown, setShowDropdown] = useState(false);
const [Edite, setEdite] = useState(false);
const [UserId, setUserId] = useState(null);
const token = localStorage.getItem('token');
const Delete = async (id) => {
    try {
      const response = await axios.delete(`https://auth-sys-users.onrender.com/users/remove/${parseInt(id)}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      console.log(response)
      alert('User Deleted successful');
      window.location="/dashboard";
    } catch (error) {
     console.log(error)
      alert('delete failed');
    }
  }
return(
<>
 <button id="dropdownButton" dataDropdownToggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button"onClick={() => setShowDropdown(!showDropdown)}>
            <span className="sr-only">Open dropdown</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        {showDropdown && <>
        <div className="dp-down">
		<ul>
			<a href="#" onClick={()=>{setEdite(true);setUserId(props.id);setShowDropdown(false)}}><li>Edit</li></a>
			<a href="#" onClick={()=>Delete(props.id)}><li>Delete</li></a>
		</ul>  
		
	</div>
	</>
	
        }
	{Edite && <UpdateUser userID={props.id} Edite={Edite} setEdite={setEdite}/>}
</>

)
}

