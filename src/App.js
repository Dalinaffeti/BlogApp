
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { db, firebaseApp } from './firebase';
import { useDispatch, useSelector } from "react-redux";
import { setAdditionalData, setUser } from "./actions";
import Login from './Pages/Login/Login';



function App() {
  const user= useSelector(state=> state.user.user)
  const additionalData= useSelector(state=> state.user.additionalData)
 
  const dispatch= useDispatch()
  const [isAdmin, setIsAdmin]=useState("")
 
  const authListener = ()=>{
    firebaseApp.auth().onAuthStateChanged((user)=>{
        if(user){
            
            dispatch(setUser(user));
        }
        else{
           dispatch( setUser(""));
        }
    })
}
 
useEffect(()=>{
   
  authListener();
  console.log("admin sec")
  var docRef = db.collection("Admins").doc("ZyOWHOThMsdR9fTyiBTc");
 
  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Admins' Document data:", doc.data());
         const adminsArray= doc.data().adminsArray;
         adminsArray.map((admin)=>{
            if(user.email==admin){
                setIsAdmin(true)
            }
         })
      } else {
          // doc.data() will be undefined in this case
          console.log("Admins: No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
   db.collection("users").doc(`${user.uid}`)
        .onSnapshot((doc) => {
        // console.log("Current data: ", doc.data());
        dispatch(setAdditionalData(doc.data()))
        console.log(additionalData)
             });
},[isAdmin, user])
 


  return (
    <div className="App background">
      <BrowserRouter>
          <Route exact path ="/login" component ={Login} />
          {/* <Route exact path ={`/createpost`} render={()=>(<CreatePost />)} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
