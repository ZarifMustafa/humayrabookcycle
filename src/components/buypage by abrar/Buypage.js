import "./buypage.css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { findBookToFind } from "../LocalStorage/LocalStorage.js";

function Buypage() {
  const navigate = useNavigate();
  const bookToFind = useRef();
  function Call_Home() {
    navigate("/");
  }

  useEffect(() => {
    const storedData = JSON.parse(window.localStorage.getItem("bookToFind"));
    console.log(storedData);
    bookToFind.current = storedData;
  }, []);
  

  const handleBuythisBook = async (e) => {
    e.preventDefault();
    console.log(bookToFind);
  };

  const BuyFromRow = ({ name, rating, price }) => {
    <>
      <div className="form-control-5">Name:</div>
      <div className="frame-4">
        <div className="form-control-4">{name}</div>
      </div>
      <button className="buy-this-book-wrapper" type="submit">
        <div className="buy-this-book">Buy This Book</div>
      </button>
      <div className="frame-5" />
      <div className="frame-6">
        <div className="frame-7">
          <div className="form-control-4">{rating}</div>
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
        <div className="form-control-4">{price}</div>
      </div>
    </>;
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
              <div className="form-control">Book: {bookToFind.current[0].title} </div>
              <div className="form-control-2">Author:</div>
              <div className="form-control-3">Rating:</div>
            </div>
          </div>
          <form className="frame-3" onSubmit={handleBuythisBook}>
            {bookToFind &&
              bookToFind.length > 0 &&
              bookToFind[0].copies.length > 0 &&
              bookToFind[0].copies.map((copy, index) => (
                <BuyFromRow
                  name={copy.owner}
                  rating={bookToFind[0].rating}
                  price={copy.selling_price}
                  key={index}
                />
              ))}
          </form>
          <Link to="/homepage">
            <div className="frame-28">
              <div className="text-wrapper-3">Buy Cancellation</div>
            </div>
          </Link>
          <div className="book-cycle" onClick={Call_Home}>
            Bookcycle
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buypage;
