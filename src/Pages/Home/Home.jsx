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
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(true);

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

  //Getting Posters
  useEffect(() => {
    const unsubscribe = db
      .collection("posters")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        if (!snapshot) {
          return;
        }
        setPosters(
          snapshot.docs.map((doc) => ({
            id: doc.id, //the unique 'auto' ids
            data: doc.data(), //the data inside the doc(coll>doc>data)
          }))
        );
      });

    console.log(`postersss ${posters}`);
    setIsloading(false);

    //    console.log(posters[0].data.name);
    db.collection("users")
      .doc(`${user.uid}`)
      .onSnapshot((doc) => {
        // console.log("Current data: ", doc.data());
        dispatch(setAdditionalData(doc.data()));
        // console.log(`additional data home: ${additionalData.name}`);
      });

    return () => {
      //when comp cleansup/unmount(cleansup is better), (always) detach this real time listener after it's done using it(best def)
      unsubscribe(); //this is for optimization
    };
  }, []);  

 

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
      <div className="home">
        <div className="container">
          {isLoading ? (
            <h1>Fetching data..</h1>
          ) : (
            posters.map((poster) => {
              return (
                <Poster
                  key={poster.id}
                  imageUrl={poster.data.imageUrl ? poster.data.imageUrl : ""}
                  title={poster.data.title ? poster.data.title : ""}
                  description={
                    poster.data.description ? poster.data.description : ""
                  }
                  userEmail={poster.data.userEmail ? poster.data.userEmail : ""}
                  id={poster.id}
                  uid={poster.data.uid ? poster.data.uid : ""}
                  name={poster.data.name ? poster.data.name : "name"}
                  isLoading={isLoading}
                />
              );
            })
          )}
        </div>
      </div>
     
    </div>
  );
}
