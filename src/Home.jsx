import { useState } from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";

function Home(){
     const navigate = useNavigate();
    function onClickQuizzStart(){
      navigate("/test");
    }
    function onClickAdmin(){
         navigate("/login");
    }
    return(
        <div className="parent_component">
            <h1 className="header_main">Welcome To Placement Quizz !</h1>
            <div className="btn_container">
            <button className="btn_home" onClick={onClickQuizzStart}>Start Quizz</button>
            <button className="btn_home" onClick={onClickAdmin}>Admin Login</button>
            </div>
            
        </div>
    );
}
export default Home;
