import './login2.css';
import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router";
import {toast} from "react-toastify";
import { setLoggedIn} from '../LocalStorage/LocalStorage.js';

function Login2() {

    const [email, setemail] = useState()
    const [pass, setpass] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate=useNavigate();

    function Call_Home() {
        navigate('/profile');
    }
    function Call_SignUp() {

        navigate('/Register');
      }

    const handleLogin = async (e) => {
        e.preventDefault();


        const res=await axios.get(`http://localhost:5000/getusers/${email}`);
        const data = res.data;
        console.log(JSON.stringify(data))
        if(data.password!=pass)
        {
            toast.error("Email or Password did not match!!!")
            return
        }
        setIsLoggedIn(true);
        setLoggedIn();
        toast.success("Logged In Successfully!!!")
        navigate('/profile')
    }
  return (
    <div>
        <div className="login-page">
        <div className="overlap-wrapper">
            <div className="overlap">
                <div className="rectangle"></div>
                <img className="nav-bg" src="img/NavBg.png" />
                <div className="div"></div>
                <form className="frame" onSubmit={handleLogin}>
                    <div className="overlap-group">
                        <div className="h">Login</div>
                        <div className="form-control">Email</div>
                        <div className="text-wrapper">Password</div>
                        <div className="input-form-control"><div className="email">
                            <input className="input" type="email" placeholder="Enter Email" required onChange={(e)=>{setemail(e.target.value);}}/>
                        </div></div>
                        <div className="email-wrapper"><div className="email">
                            <input className="input" type="password" placeholder="Enter Password" required onChange={(e)=>{setpass(e.target.value);}}/>
                        </div></div>
                        <button className="enter-btn" type="submit">
                            <div className="div-wrapper"><div className="text-wrapper-2">Enter</div></div>
                        </button>
                        <div className="overlap-2">
                            <p className="p">Don't have an account yet?</p>
                            <div className="rectangle-2"></div>
                            <div className="text-wrapper-3" onClick={Call_SignUp}>Sign up</div>
                        </div>
                    </div>
                </form>
                <div className="book-cycle" onClick={Call_Home}>Bookcycle</div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login2;
