import './profile.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Profile() {
  const [name, setName] = useState("");

  useEffect(() => {
    const currentUserString = window.localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const name = currentUser.name;
      setName(name);
      console.log(name);
    } else {
      console.log("currentUser is not found in localStorage");
    }
  }, []);
  

  const logOutFunction = () => {
    // Update local storage with the clicked button's name
    localStorage.removeItem("currentUser");
  };
  
  
  return (
    <div className="profile-page">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="bg-pic">
            <div className="div" />
          </div>
          <img className="nav-bg" alt="Nav bg" src="img/NavBg.png" />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="text-wrapper">Book Cycle</div>
          <div className="rectangle-4" />
          <div className="rectangle-5" />
          <div className="frame">
            <div className="text-wrapper-2">Hello {name}</div>
          </div>
          <div className="share-borrow-repeat">Share ,borrow &amp; Repeat</div>
          <Link className="sign-up-btn" to="/" onClick={() => logOutFunction()}>
            <div className="overlap-group-sup">
              <div className="text-wrapper-sup2">Log Out</div>
            </div>
          </Link>
          <Link className="log-in-btn" to="/profile">
            <div className="overlap-group-sup">
              <div className="text-wrapper-sup">Edit Profile</div>
            </div>
          </Link>
          <p className="this-is-your-profile">
            
          </p>
          <Link to="/loginhomepage">
            <div className="book-cycle">BookCycle</div>
          </Link>
          <div className="ellipse" />
          <img className="mask-group" alt="Mask group" src="mask-group.png" />
          <div className="flexcontainer">
            <p className="text">
              <span className="span">
                Borrowed
                <br />
              </span>
            </p>
            <p className="text">
              <span className="span">Books</span>
            </p>
          </div>
          <div className="form-control-wrapper">
            <div className="form-control">{localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).name}</div>
          </div>
          <div className="form-control-2">My Account</div>
          <div className="div-wrapper">
            <div className="form-control-3">Mirpur DOHS, Dhaka</div>
          </div>
          <div className="frame-2">
            <div className="form-control-4">3</div>
          </div>
          <div className="flexcontainer-2">
            <p className="text">
              <span className="span">
                Owned
                <br />
              </span>
            </p>
            <p className="text">
              <span className="span">Books</span>
            </p>
          </div>
          <div className="frame-3">
            <div className="form-control-4">9</div>
          </div>
          <div className="flexcontainer-3">
            <p className="text">
              <span className="span">
                Bought
                <br />
              </span>
            </p>
            <p className="text">
              <span className="span">Books</span>
            </p>
          </div>
          <div className="frame-4">
            <div className="form-control-4">15</div>
          </div>
          <Link to="/tradelist">
          <div className="frame-5">
            <div className="text-wrapper-3">Your Trades</div>
          </div></Link>
          <div className="username">
            <div className="username-wrapper">
              <div className="username-2">{localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).name}</div>
            </div>
            <div className="form-control-5">Username</div>
          </div>
          <div className="lastname">
            <div className="username-3">
              <div className="username-2">{localStorage.getItem('currentUser') &&
    JSON.parse(localStorage.getItem('currentUser')).name &&
    JSON.parse(localStorage.getItem('currentUser')).name.split(' ').pop()
  }</div>
            </div>
            <div className="form-control-6">Last name</div>
          </div>
          <div className="firstname">
            <div className="username-4">
              <div className="username-2">{localStorage.getItem('currentUser') &&
    JSON.parse(localStorage.getItem('currentUser')).name &&
    JSON.parse(localStorage.getItem('currentUser')).name.split(' ')[0]
  }</div>
            </div>
            <div className="form-control-7">First name</div>
          </div>
          <div className="city">
            <div className="username-wrapper">
              <div className="username-2">Dhaka</div>
            </div>
            <div className="form-control-8">City</div>
          </div>
          <div className="email">
            <div className="username-5">
              <div className="username-2">{localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).email}</div>
            </div>
            <div className="form-control-9">Email Address</div>
          </div>
          <div className="group">
            <div className="frame-6">
              <div className="text-wrapper-4">
                house 6,avenue 4,mirpur dohs,mirpur
              </div>
            </div>
            <div className="form-control-10">Address</div>
          </div>
          <img className="line" alt="Line" src="img/line-42.svg" />
          <div className="user-information">USER INFORMATION</div>
          <div className="contact-information">CONTACT INFORMATION</div>
        </div>
      </div>
    </div>
  )
}

export default Profile;