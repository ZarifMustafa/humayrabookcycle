import './borrowrequest.css';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Borrowrequest() {
  const navigate = useNavigate();
  
  function Call_Home() {
    navigate("/homepage");
  }

  const handleborrowrequest = async (e) =>  {
   





    navigate("/confirmborrow");
  };
  
  return (
    <div className="borrow-request-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="rectangle" />
          <img className="nav-bg" alt="Nav bg" src="./img/NavBg.png" />
          <div className="div" />
          <form className="frame" onSubmit={handleborrowrequest}>
            <div className="overlap-group">
              <div className="text-wrapper">Borrow Request</div>
              <div className="text-wrapper-2">From:</div>
              <div className="text-wrapper-3">For:</div>
              <div className="text-wrapper-4">Address:</div>
              <div className="frame-2">
                <div className="form-control">Book:</div>
                <div className="form-control-2">Author:</div>
                <div className="form-control-3">Year:</div>
                <div className="form-control-4">Rental Price:</div>
                <div className="form-control-wrapper">
                  <div className="form-control-5">Paradoxical Sajid</div>
                </div>
                <div className="div-wrapper">
                  <div className="form-control-5">Arif Azad</div>
                </div>
                <div className="frame-3">
                  <div className="form-control-5">2018</div>
                </div>
                <div className="frame-4">
                  <div className="form-control-5">99.0</div>
                </div>
                <div className="frame-5" />
              </div>
              <button className="group" type='submit'>
                <div className="borrow-this-book-wrapper">
                  <div className="borrow-this-book">Borrow This Book</div>
                </div>
              </button>
              <div className="frame-6">
                <div className="user-icon" />
                <div className="form-control-6">Name:</div>
                <div className="frame-7">
                  <div className="form-control-5">Zarif Zeisan Mustafa</div>
                </div>
                <div className="frame-8">
                  <div className="frame-9">
                    <div className="form-control-5">5 Star</div>
                  </div>
                  <div className="overlap-group-2">
                    <div className="frame-10" />
                    <div className="frame-11" />
                    <div className="frame-12" />
                    <div className="frame-13" />
                    <div className="frame-14" />
                  </div>
                </div>
                <div className="frame-15" onClick={Call_Home}>
                  <div className="text-wrapper-5">See Profile</div>
                </div>
              </div>
              <div className="address-input">
                <input className="days-text" type="text" placeholder='Enter Address' required/>
              </div>
            </div>
          </form>
          <div className="book-cycle" onClick={Call_Home}>Bookcycle</div>
        </div>
      </div>
    </div>
  )
}

export default Borrowrequest;