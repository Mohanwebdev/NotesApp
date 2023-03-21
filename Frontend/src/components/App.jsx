import React, { useEffect, useState } from "react";
import { BrowserRouter,Routes, Route, Link } from "react-router-dom";
import { createContext } from 'react';
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Login from "./Login";
import Register from "./Signup";
import NoPage from "./NoPage";
import Home from "./Home";
import EditArea from "./EditArea";
import { green } from "@mui/material/colors";

export const Context = createContext('');
// export const userContext = createContext('');

function App() {

  const [loginState,setLoginState] = useState(false);
  
  const [notes, setNotes] = useState([]);

  const [user,setUser] = useState('');

  const [editState,setEditstate] = useState(false);

  const [tempNote,setTempnote] = useState({
    noteId:"",
    title: "",
    content: ""
  })


function updateLogin(loginInfo){
  setLoginState(loginInfo);
}

const updateUser=(userInfo)=>{
  setUser(userInfo);
}

const updateNotes=(noteInfo)=>{
  setNotes(noteInfo);
}

const updateEdit = (editInfo)=>{
  setEditstate(editInfo.status);
  setTempnote({noteId:editInfo.noteId,
  title:editInfo.title,
content:editInfo.content})

}

const addNote= async(newNote)=> {
    try {
      await  axios.post("http://localhost:5000/addNote", {
        username:user,
        ...newNote
      },
            {
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              }
            }
          )
          .then((res)=>{setNotes(res.data.notes)})
    } catch (error) {
      console.error(error);
    }

  }


  const editNote =async (value)=>{
    setEditstate(false);
    try {
      await  axios.post("http://localhost:5000/editNote", {
        username:user,
        ...value
      },
            {
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              }
            }
          )
          .then((res)=>{
            setNotes(res.data.notes);
          })
    } catch (error) {
      console.error(error);
    }


  }


  const deleteNote= async(id)=> {
    try {
      await  axios.post("http://localhost:5000/deleteNote", {
        username:user,
        id:id
      },
            {
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              }
            }
          )
          .then((res)=>{
            setNotes(res.data.notes);
          })
    } catch (error) {
      console.error(error);
    }
  }

  const logOut=async()=>{
    try {
      await  axios.get("http://localhost:5000/logout")
          .then((res)=>{
            setLoginState(res.data.status);
          })
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <div>
    <Context.Provider value={[loginState,updateLogin,user,updateUser,updateNotes,updateEdit,logOut]}>
      <BrowserRouter>
      <Header />
      <Routes>
      <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Login />} onEnter={logOut} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>


   


    {loginState ? (<div className="content" >
      {editState &&  <EditArea className="editArea" onedit={editNote} value={tempNote} />}
      {!editState && <CreateArea onAdd={addNote} />}
      <div className="container">
      <div className="row">
      {notes.map((noteItem,index) => {
        return (
          <Note
            key={index}
            id={noteItem.noteId}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={updateEdit}
          />
        );
      })}
      
      </div></div></div>) : null}
    
      <Footer />
      </Context.Provider>
      
    </div>
  );
}

export default App;
