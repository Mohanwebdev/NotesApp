import React, { useState,useContext } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { Context  } from "./App";



function Login(){

const [login,setLogin] = useState({
  username:'',
  password:''
});

const [err,setErr] = useState(false);

const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');

const[emailStyle,setEmailstyle] = useState(false);
const [passwordStyle,setPasswordstyle] = useState(false);


const [loginState,updateLogin,user,updateUser,updateNotes] = useContext(Context);

const handleChange=(e)=>{
setLogin((preval)=>{
  return {...preval,
  [e.target.name]:e.target.value}
})
}


const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!login.username) {
    setEmailError('Email is required');
    setEmailstyle(false);
  } else if (!emailRegex.test(login.username)) {
    setEmailError('Invalid email address');
    setEmailstyle(false);
  } else {
    setEmailstyle(true);
    setEmailError('');
  }
};

const validatePassword = () => {
  setErr(false);
  if (!login.password) {
    setPasswordError('Password is required');
    setPasswordstyle(false);
  } else if (login.password.length < 8) {
    setPasswordError('Password must be at least 8 characters long');
    setPasswordstyle(false);
  } else {
    setPasswordError('');
    setPasswordstyle(true);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  validateEmail();
  validatePassword();
  if (!emailError && !passwordError) {
    try {
      updateUser(login.username);
      await  axios.post("http://localhost:5000/login", login,
            {
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              }
            }
          )
          .then((res)=>{updateLogin(res.data.status);
            
            updateNotes(res.data.notes);
            setLogin({
              username:'',
              password:''
            });
            setPasswordstyle(false);
            setEmailstyle(false);
          })
    } catch (error) {
      console.error(error);
      setErr(true);
    }
  }
};



  return (<div>

  {!loginState && <div> <h1>Login</h1> <form className="row g-3 loginpage" onSubmit={handleSubmit}>
  {err&&<Alert severity="warning">Email or Password is incorrect !!</Alert>}
  {!emailError ? <div className="col-12">
  
 <input name="username"  type="text" value={login.username} placeholder="Email" onChange={handleChange} onBlur={validateEmail} className= {emailStyle?"form-control is-valid":"form-control"} id="validationServer01"  required/>
 
 {emailStyle &&<div className="valid-feedback">
   Looks good!
 </div>}
 
 
 </div> :   <div className="col-12">
    
    <input name="username"  type="text" value={login.username} placeholder="Email" onChange={handleChange} onBlur={validateEmail}  className="form-control is-invalid" id="validationServer04" aria-describedby="validationServer05Feedback" required/>
    <div id="validationServer04Feedback" className="invalid-feedback">
      {emailError}
    </div>
  </div> }
 


  {!passwordError ? <div className="col-12">
 
 <input name="password" type="password"  value={login.password} placeholder="Password" onChange={handleChange} onBlur={validatePassword} className={passwordStyle ?"form-control is-valid":"form-control"} id="validationServer02"  required/>
 {passwordStyle &&<div className="valid-feedback">
   Looks good!
 </div>}
 </div> :   <div className="col-12">
    
    <input name="password" type="password"  value={login.password} placeholder="Password" onChange={handleChange} onBlur={validatePassword}  className="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required/>
    <div id="validationServer05Feedback" className="invalid-feedback">
      {passwordError}
    </div>
  </div> }

    <button className="btn" style={{backgroundColor:"#0F6292",color:"#ECF2FF"}} type="submit">Login</button>

  
  </form>
</div>
  }

</div>

)
}



export default Login;