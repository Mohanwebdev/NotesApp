import axios from "axios";
import React,{useState,useContext} from "react";
import { Context  } from "./App";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';




function Register(){
  const [register,setRegister] = useState({
    username:'',
    password:''
  });
const [existingUser,setExistinguser] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const[emailStyle,setEmailstyle] = useState(false);
  const [passwordStyle,setPasswordstyle] = useState(false);

  const [loginState,updateLogin,user,updateUser] = useContext(Context);

const handleChange=(e)=>{
  setRegister((preval)=>{
    return {...preval,
    [e.target.name]:e.target.value}
  })
}


  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!register.username) {
      setEmailError('Email is required');
      setEmailstyle(false);
    } else if (!emailRegex.test(register.username)) {
      setEmailError('Invalid email address');
      setEmailstyle(false);
    } else {
      setEmailError('');
      setEmailstyle(true);
    }
  };

  const validatePassword = () => {
    if (!register.password) {
      setPasswordError('Password is required');
      setPasswordstyle(false);
    } else if (register.password.length < 8) {
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
        updateUser(register.username);
        await  axios.post("http://localhost:5000/register", register,
              {
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                }
              }
            )
          .then((res)=>{
              setExistinguser(true);
            updateLogin(res.data.status);
            setRegister({
              username:'',
              password:''
            });
          })
        
      } catch (error) {
        console.error(error);
      }
    }
  };


 
    return (
      <div>
 
  {!loginState && <div> <h1>Sign Up</h1> <form className="row g-3 loginpage" onSubmit={handleSubmit}>
  {existingUser&&<Alert severity="warning">Email already exist !!</Alert>}
  {!emailError ? <div className="col-12">
 
 <input name="username"  type="text" value={register.username} placeholder="Email" onChange={handleChange} onBlur={validateEmail} className= {emailStyle?"form-control is-valid":"form-control"} id="validationServer01"  required/>
 
 {emailStyle &&<div className="valid-feedback">
   Looks good!
 </div>}
 
 
 </div> :   <div className="col-12">
    
    <input name="username"  type="text" value={register.username} placeholder="Email" onChange={handleChange} onBlur={validateEmail}  className="form-control is-invalid" id="validationServer04" aria-describedby="validationServer05Feedback" required/>
    <div id="validationServer04Feedback" className="invalid-feedback">
      {emailError}
    </div>
  </div> }
 


  {!passwordError ? <div className="col-12">
 
 <input name="password" type="password"  value={register.password} placeholder="Password" onChange={handleChange} onBlur={validatePassword} className={passwordStyle ?"form-control is-valid":"form-control"} id="validationServer02"  required/>
 {passwordStyle &&<div className="valid-feedback">
   Looks good!
 </div>}
 </div> :   <div className="col-12">
    
    <input name="password" type="password"  value={register.password} placeholder="Password" onChange={handleChange} onBlur={validatePassword}  className="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required/>
    <div id="validationServer05Feedback" className="invalid-feedback">
      {passwordError}
    </div>
  </div> }
 
    <button className="btn" style={{backgroundColor:"#0F6292",color:"#ECF2FF"}} type="submit">Sign up</button>
  
  
  </form>
</div>
  }

</div>
)
}

export default Register;
