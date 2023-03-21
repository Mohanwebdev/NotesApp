import React, { useState,useContext} from "react";
import { Context } from "./App";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';



function EditArea(props) {

  const [tempNote, setTempNote] = useState({
    noteId: props.value.noteId,
    title: props.value.title,
    content: props.value.content
  });

  const [loginState,updateLogin,user,updateUser,updateNotes,updateEdit] = useContext(Context);
  
  function handleChange(event) {
    const { name, value } = event.target;

    setTempNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

 
  function submitNote(event) {

    props.onedit(tempNote);
    event.preventDefault();
  }
const cancelNote=()=>{
   
    updateEdit({status:false,
        noteId:'',
      title:'',
    content:''});
}

  return (
    <div >
      <form className="create-note " style={{boxShadow : "0 1px 5px #0F6292"}}>
       
          <input
            name="title"
            onChange={handleChange}
            value={tempNote.title}
          />
        

        <textarea
          name="content"
          onChange={handleChange}
          value={tempNote.content}
          rows='3'
        />
        <button className="close-btn" onClick={cancelNote}><CloseIcon /></button>
        <button className="done-btn" onClick={submitNote}> <DoneIcon /></button>
        
       
        
      </form>
    </div>
  );
}

export default EditArea;
