import './thankucreating.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
function Thankucreating() {
  const navigate = useNavigate();
  function Call_Home() {
    navigate("/");
  }
  return (
    <div className="thanku-creating">
      <div className="div">
        <div className="nav-bg">
          <div className="overlap-group">
          <img className="nav-bg" alt="Nav bg" src="nav-bg.png" />
          <div className="book-cycle" onClick={Call_Home}>Bookcycle</div>
          </div>
        </div>
        <div className="overlap">
          <div className="overlap-2">
            <div className="rectangle" />
            <div className="welcometext">
              <div className="explore-our-vast-wrapper">
                <p className="explore-our-vast">
                  Explore our vast collection of books, from bestsellers to hidden gems, and discover new stories that
                  will ignite your imagination. Don&#39;t forget to take advantage of our user-friendly features to
                  enhance your browsing and shopping experience.
                </p>
              </div>
              <p className="thank-you-for">Thank You For Creating&nbsp;&nbsp;An Account!</p>
            </div>
          </div>
          <div className="overlap-3">
            <div className="frame">
              <div className="text-wrapper">Rubaba Hadiel</div>
            </div>
            <div className="user-icon" />
          </div>
          <div className="set-up-a-profile-wrapper">
           <Link to="/profile"> <div className="set-up-a-profile">Set Up A Profile</div></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thankucreating;