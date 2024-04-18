import './UpdateUser.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
export default function UpdateUser (props){

  const [fullName,setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = localStorage.getItem('token');
    const Update = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`https://auth-sys-users.onrender.com/users/update/${parseInt(props.userID)}`, { fullName,email, password },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      console.log(response)
      alert('Updeted successful');
      window.location="/dashboard";
    } catch (error) {
     console.log(error)
      alert('update failed');
    }
  }


console.log(token)
return (
	<>
	   <form className="P-class" onSubmit={(e)=>Update(e)}>
	<button onClick={()=>{console.log(props.Edite);props.setEdite(false)}}>X</button>
	   	<input 
	   	type="text" 
	   	placeholder="UserName"
	   	id="fullName"
                name="fullName"
	        value={fullName}
	        onChange={(e) => setfullName(e.target.value)}
	   	 />
	   	<input 
	   	  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
	   	  placeholder="email" 
	   	 />
	   	<input 
	   	 id="password"
                 name="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 type="password"
	   	 placeholder="password" 
	   	 />	   	
		<input
                type="submit"
                 value="Update"
                 />
	   </form>
	</>
)
}
