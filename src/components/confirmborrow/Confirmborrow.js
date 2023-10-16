import './confirmborrow.css';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Confirmborrow() {
  const navigate = useNavigate();
  
  function Call_Home() {
    navigate("/homepage");
  }

  const handleconfirmborrow = async (e) =>  {
   





    navigate("/");
  };
  
  return (
    <div className="confirm-borrow-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="rectangle" />
          <img className="nav-bg" alt="Nav bg" src="./img/NavBg.png" />
          <div className="div" />
          <div className="book-cycle" onClick={Call_Home}>
              Bookcycle
            </div>
          <form onSubmit={handleconfirmborrow}>
          <div className="frame">
            <div className="rectangle-2" />
          </div>
          <div className="text-wrapper">Confirm Borrow</div>
          <div className="frame-2" />
          <div className="form-control">Book:</div>
          <div className="form-control-2">Lend To:</div>
          <div className="form-control-3">Author:</div>
          <div className="form-control-4">Rental Price:</div>
          <div className="form-control-wrapper">
            <div className="form-control-5">Paradoxical Sajid</div>
          </div>
          <div className="div-wrapper">
            <div className="form-control-5">Arif Azad</div>
          </div>
          <div className="frame-3">
            <div className="form-control-5">99.00</div>
          </div>
          <div className="frame-4">
            <div className="form-control-5">Picchi Raisa Apu</div>
          </div>
          <div className="frame-5">
            <div className="frame-6">
              <div className="form-control-5">5 Star</div>
            </div>
            <div className="overlap-group">
              <div className="frame-7" />
              <div className="frame-8" />
              <div className="frame-9" />
              <div className="frame-10" />
              <div className="frame-11" />
            </div>
          </div>
          <button className="frame-12" type='submit'>
            <div className="text-wrapper-2">Confirm Request</div>
          </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Confirmborrow;