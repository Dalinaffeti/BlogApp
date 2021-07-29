
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { db, firebaseApp } from './firebase';
import { useDispatch, useSelector } from "react-redux";
import { setAdditionalData, setUser } from "./actions";


function App() {
  return (
    <div className="App background">
      <BrowserRouter>
          <Route exact path ={`/createpost`} render={()=>(<CreatePost />)} />
      </BrowserRouter>
    </div>
  );
}

export default App;
