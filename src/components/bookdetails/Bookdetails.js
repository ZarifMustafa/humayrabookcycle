import './bookdetails.css';
import React from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router";

function Bookdetails() {
  const navigate = useNavigate();
  function Call_Home() {
    navigate("/homepage");
  }
  function Call_Buypage() {
    navigate("/buypage");
  }
  function Call_Borrowpage() {
    navigate("/borrowpage");
  }
  return (
    <div className="book-details-page">
    <div className="overlap-wrapper">
      <div className="overlap">
        <div className="rectangle" />
        <div className="nav-bg">
          <div className="overlap-group">
          <img className="nav-bg" alt="Nav bg" src="img/NavBg.png" />
          <div className="book-cycle" onClick={Call_Home}>Bookcycle</div>
          </div>
        </div>
        <div className="frame">
          <div className="div" />
        </div>
        <div className="text-wrapper">Book Details</div>
        <div className="form-control">Book:</div>
        <div className="form-control-2">Summary/Plot:</div>
        <div className="form-control-3">Reviews:</div>
        <div className="form-control-4">Author:</div>
        <div className="form-control-5">Year:</div>
        <div className="form-control-wrapper">
          <div className="form-control-6">Arif Azad</div>
        </div>
        <div className="div-wrapper">
          <div className="form-control-6">Zarif Zeisan Mustafa</div>
        </div>
        <div className="frame-2">
          <div className="form-control-6">Rubaba Hadiel Belal</div>
        </div>
        <div className="frame-3">
          <div className="form-control-6">2018</div>
        </div>
        <div className="frame-4">
          <p className="p">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Paradoxical Sajid is a story book about author Arif
            Azad&#39;s fictional friend Sajid. In the book Sajid argues many logic against atheism. Most of the
            chapters are about philosophical paradoxes. There are a few chapters where Sajid talks about science and
            that&#39;s where it interests me.
          </p>
        </div>
        <div className="frame-5">
          <div className="frame-6">
            <div className="form-control-6">5 Star</div>
          </div>
          <div className="overlap-2">
            <div className="frame-7" />
            <div className="frame-8" />
            <div className="frame-9" />
            <div className="frame-10" />
            <div className="frame-11" />
          </div>
        </div>
        <div className="frame-12">
          <div className="frame-13">
            <div className="form-control-7">5 Star</div>
          </div>
          <div className="overlap-3">
            <div className="frame-14" />
            <div className="frame-15" />
            <div className="frame-16" />
            <div className="frame-17" />
            <div className="frame-18" />
          </div>
        </div>
        <div className="frame-19">
          <div className="frame-13">
            <div className="form-control-7">5 Star</div>
          </div>
          <div className="overlap-3">
            <div className="frame-20" />
            <div className="frame-21" />
            <div className="frame-22" />
            <div className="frame-23" />
            <div className="frame-24" />
          </div>
        </div>
       <div className="buy-this-book-wrapper" onClick={Call_Buypage}>
          <div className="buy-this-book">Buy This Book</div>
        </div>
        <p className="let-others-see">
          Let Others See &amp; Explore
          <br />
          your Collection
        </p>
        <div className="borrow-this-book-wrapper" onClick={Call_Borrowpage}>
          <div className="borrow-this-book">Borrow This Book</div>
        </div>
        <p className="show-my-books-bought">
          Show My Books <br />
          bought/borrowed From
          <br />
          others
        </p>
        <div className="email-wrapper">
          <p className="email">
            I think this is the best for young generation.This is the first book in my life which i read completely
            within a few days.The content of this book will help you to strengthen your iman.
          </p>
        </div>
        <div className="frame-25">
          <p className="email">It is the best book .. it explain the science of Quran..</p>
        </div>
        <div className="frame-26" />
        <div className="frame-27">
          <div className="form-control-8">Paradoxical Sajid</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Bookdetails;