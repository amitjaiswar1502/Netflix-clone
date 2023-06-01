import React, { useEffect, useState } from 'react';
import netflixLogo from "../images/Netflix_logo.svg";
import netflixAvatar from "../images/Netflix-avatar.png";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
const [show, handleShow] = useState(false);
const navigate = useNavigate();

const transitionNavbar = () =>{
    if(window.scrollY > 100){
        handleShow(true);
    }else{
        handleShow(false);
    }
}

useEffect(()=>{
    window.addEventListener("scroll", transitionNavbar); 
    return()=> window.removeEventListener("scroll", transitionNavbar);
},[])



    return (
        <div className={`nav ${show && "nav-black"}`}>
        <div className='nav-content'>
            <img className='netflix-logo' onClick={()=> navigate("/")} src={netflixLogo} alt='netflix-logo' />
            <img className='netflix-avatar' onClick={()=> navigate("/profile")} src={netflixAvatar} alt='netflix-avatar' />

        </div>
        </div>
    )
}

export default Nav
