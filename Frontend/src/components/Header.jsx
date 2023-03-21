import React,{useContext} from "react";
import { Context } from "./App";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HighlightIcon from '@mui/icons-material/Highlight';

function Header() {

  
  const [loginState,updateLogin,user,updateUser,updateNotes,updateEdit,logOut] = useContext(Context);
  return (
<nav class="navbar navbar-light ">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1"><HighlightIcon /> Keeper</span>
    {!loginState?<ul class="navbar-nav">
   
    <li class="nav-item">
     <Link class="nav-link" to="/login">Login</Link>
   </li>
   <li class="nav-item">
     <Link class="nav-link" to="/register">Sign up</Link>
   </li>
 </ul>:<ul class="navbar-nav">
   
 <li class="nav-item">
     <Link class="nav-link" to="/logout" onClick={logOut}>Logout</Link>
   </li></ul>}
  </div>
</nav>






//     {/* <header>
//     <nav>
//     <h1>
//         {/* <HighlightIcon /> */}
//         Keeper
//       </h1>
//       {!loginState?<ul>
   
//    <li>
//      <Link to="/login">Login</Link>
//    </li>
//    <li>
//      <Link to="/register">Register</Link>
//    </li>
//  </ul>:<ul>
   
//    <li>
//      <Link to="/logout" onClick={logOut}>Logout</Link>
//    </li></ul>}
    
//   </nav>
//   </header> */}

  );
}

export default Header;
