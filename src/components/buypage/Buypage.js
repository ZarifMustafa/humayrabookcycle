import './buypage.css';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {Link} from "react-router-dom";

function Buypage() {
  const navigate = useNavigate();

  function Call_Home() {
    navigate("/homepage");
  }

  const handleBuythisBook = async (e) =>  {
   




    navigate("/confirmorder");

  };
  
  return (
    <div className="buy-page">
    <div className="overlap-wrapper">
      <div className="overlap">
        <div className="rectangle" />
        <img className="nav-bg" alt="Nav bg" src="nav-bg.png" />
        <div className="div" />
        <div className="text-wrapper">Buy From</div>
        <div className="group">
          <div className="overlap-group">
            <div className="text-wrapper-2">Buy Options</div>
            <div className="form-control">Book:</div>
            <div className="form-control-2">Author:</div>
            <div className="form-control-3">Year:</div>
            <div className="frame">
              <div className="form-control-4">Paradoxical Sajid</div>
            </div>
            <div className="form-control-wrapper">
              <div className="form-control-4">Arif Azad</div>
            </div>
            <div className="div-wrapper">
              <div className="form-control-4">2018</div>
            </div>
            <div className="frame-2" />
          </div>
        </div>
        <form className="frame-3" onSubmit={handleBuythisBook} >
          <div className="form-control-5">Name:</div>
          <div className="frame-4">
            <div className="form-control-4">Zarif Zeisan Mustafa</div>
          </div>
          <button className="buy-this-book-wrapper" type="submit">
            <div className="buy-this-book">Buy This Book</div>
          </button>
          <div className="frame-5" />
          <div className="frame-6">
            <div className="frame-7">
              <div className="form-control-4">5 Star</div>
            </div>
            <div className="overlap-group-2">
              <div className="frame-8" />
              <div className="frame-9" />
              <div className="frame-10" />
              <div className="frame-11" />
              <div className="frame-12" />
            </div>
          </div>
          <div className="form-control-6">Price:</div>
          <div className="frame-13">
            <div className="form-control-4">269.00</div>
          </div>
        </form>
        <form className="frame-14" onSubmit={handleBuythisBook}>
          <div className="form-control-5">Name:</div>
          <div className="frame-4">
            <div className="form-control-4">Rubaba Hadiel Belal</div>
          </div>
          <button className="buy-this-book-wrapper" type="submit" >
            <div className="buy-this-book">Buy This Book</div>
          </button>
          <div className="frame-15" />
          <div className="frame-6">
            <div className="frame-7">
              <div className="form-control-4">5 Star</div>
            </div>
            <div className="overlap-group-2">
              <div className="frame-16" />
              <div className="frame-17" />
              <div className="frame-18" />
              <div className="frame-19" />
              <div className="frame-20" />
            </div>
          </div>
          <div className="form-control-6">Price:</div>
          <div className="frame-13">
            <div className="form-control-4">130.00</div>
          </div>
        </form>
        <form className="frame-21" onSubmit={handleBuythisBook}>
          <div className="form-control-5">Name:</div>
          <div className="frame-4">
            <div className="form-control-4">Sayeda Raisa Rahman</div>
          </div>
          <button className="buy-this-book-wrapper" type="submit">
            <div className="buy-this-book">Buy This Book</div>
          </button>
          <div className="frame-22" />
          <div className="frame-6">
            <div className="frame-7">
              <div className="form-control-4">5 Star</div>
            </div>
            <div className="overlap-group-2">
              <div className="frame-23" />
              <div className="frame-24" />
              <div className="frame-25" />
              <div className="frame-26" />
              <div className="frame-27" />
            </div>
          </div>
          <div className="form-control-6">Price:</div>
          <div className="frame-13">
            <div className="form-control-4">199.00</div>
          </div>
        </form>
        <Link to="/homepage"><div className="frame-28">
          <div className="text-wrapper-3">Buy Cancellation</div>
        </div></Link>
        <div className="book-cycle" onClick={Call_Home}>Bookcycle</div>
      </div>
    </div>
  </div>
  )
}

export default Buypage;