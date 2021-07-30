import { Avatar, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Poster from "../../Components/Poster/Poster";
import { db, firebaseApp } from "../../firebase";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdditionalData } from "../../actions";

export default function Home(props) {
  const user = useSelector((state) => state.user.user);
  const [posters, setPosters] = useState([]);
  const history = useHistory();
  const additionalData = useSelector((state) => state.user.additionalData);


  const handleLoginRoute = (url) => {
    history.push(url);
  };
  const handleLogout = () => {
    firebaseApp.auth().signOut();
  };

  const handleCreatePostRoute = () => {
    history.push("/createpost");
  };

  const openProfile = () => {
    history.push("/userprofile");
  };



 

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        <h1
          style={{
            display: "inline-block",
            color: "white",
            boxShadow: '2px 2px 8px 8px  	#080808',
            marginLeft: '15px',
            fontSize:'50px',
            padding: '10px'
          }}
        >
          Blog App
        </h1>
        {user && (
            <div
              style={{ color: "white", marginTop: "5vh", paddingTop: "20px",  fontSize:'20px', }}
            >
              Logged in as: {user.email} <br />
            </div>
          )}
        <div
          style={{ marginTop: "5vh", display: "flex", alignItems: "center", justifyContent:'space-betweeen', marginRight: '15px'}}
        >
            {
                    user && <Button onClick={handleCreatePostRoute}>
                    <div>
                    <h4 style={{color:"white", backgroundColor:"black", padding:"5px"}}>Create Post</h4>
                    </div>
                </Button>
                }
          {!user && (
            <Button
              onClick={() => {
                handleLoginRoute("/login");
              }}
            >
              <h4
                style={{
                  color: "yellow",
                  backgroundColor: "black",
                  padding: "5px",
                  borderRadius: "50px",
                }}
              >
                Login / Create Account
              </h4>
            </Button>
          )}
           
          {user && (
            <Button onClick={handleLogout}>
              <h4
                style={{
                  color: "white",
                  backgroundColor: "red",
                  padding: "5px",
                  borderRadius: "50px",
                }}
              >
                Log Out
              </h4>
            </Button>
          )}
          {user && <Avatar className="pointer" onClick={openProfile} />}
          
         
        </div>
      </div>

     
    </div>
  );
}
