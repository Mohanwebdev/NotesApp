import React,{useContext} from "react";
import { Context } from "./App";
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from "@mui/icons-material/Edit";

function Note(props) {

  const [loginState,updateLogin,user,updateUser,updateNotes,updateEdit] = useContext(Context);
  function handleClick() {
    props.onDelete(props.id);
  }

  const onEdit=()=>{
   
    updateEdit({status:true,
    noteId:props.id,
  title:props.title,
content:props.content});


  }

  return (
    <div className="note col" style={{color:"#ECF2FF"}}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button style={{backgroundColor:"#0F6292",color:"#ECF2FF"}} onClick={onEdit}>
      <Edit />
      </button>
     
      <button style={{backgroundColor:"#0F6292",color:"#ECF2FF"}}onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
