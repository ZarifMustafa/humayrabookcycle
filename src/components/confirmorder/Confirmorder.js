import './confirmorder.css';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Confirmorder() {
  const navigate = useNavigate();

  function Call_Home() {
    navigate("/homepage");
  }

  const HandleConfirmRequest = async (e) =>  {
   






  };
  
  return (
    <div className="confirm-order-page">
    <div className="overlap-wrapper">
      <div className="overlap">
        <div className="rectangle" />
        <div className="nav-bg">
          <div className="overlap-group">
          <img className="nav-bg" alt="Nav bg" src="nav-bg.png" />
          <div className="book-cycle" onClick={Call_Home}>Bookcycle</div>
          </div>
        </div>
        <div className="div" />
        <form onSubmit={HandleConfirmRequest}>
        <div className="frame">
          <div className="rectangle-2" />
        </div>
        <div className="text-wrapper">Confirm Order</div>
        <div className="form-control">Sell To:</div>
        <div className="frame-2">
          <div className="paradoxical-sajid-wrapper">
            <img className="paradoxical-sajid" alt="Paradoxical sajid" src="./img/SajidCover.png" />
          </div>
          <div className="form-control-2">Book:</div>
          <div className="form-control-3">Author:</div>
          <div className="form-control-13"> Price:</div>
          <div className="form-control-wrapper">
            <div className="form-control-4">Paradoxical Sajid</div>
          </div>
          <div className="div-wrapper">
            <div className="form-control-4">Arif Azad</div>
          </div>
        </div>
        <div className="frame-14">
            <div className="form-control-4">99.00</div>
          </div>
        <div className="frame-3">
          <div className="frame-4">
            <div className="form-control-4">Picchi Raisa Apu</div>
          </div>
          <div className="frame-5">
            <div className="frame-6">
              <div className="form-control-4">5 Star</div>
            </div>
            <div className="overlap-group-2">
              <div className="frame-7" />
              <div className="frame-8" />
              <div className="frame-9" />
              <div className="frame-10" />
              <div className="frame-11" />
            </div>
          </div>
        </div>
        <button className="frame-12" type="submit">
          <div className="text-wrapper-2">Confirm Request</div>
        </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Confirmorder;
