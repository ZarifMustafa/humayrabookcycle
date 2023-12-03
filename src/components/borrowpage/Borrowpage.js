import "./borrowpage.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  findBookToFind,
  setBookToFind,
  findSeller,
  setSeller,
} from "../LocalStorage/LocalStorage";

function Borrowpage() {
  const navigate = useNavigate();

  function Call_Home() {
    navigate("/loginhomepagemodified");
  }
  const [bookToFind, setBookToFind] = useState({});

  const handleButtonClick = (buttonName) => {
    // Update local storage with the clicked button's name
    localStorage.setItem("clickedButton", buttonName);
  };

  useEffect(() => {
    return () => {
      setBookToFind(findBookToFind());
    };
  }, []);

  const handleBorrowthisBook = async (e) => {
    e.preventDefault();
    // console.log(bookToFind, ' buypage e paisi ',localStorage.getItem('clickedButton'), ' ',bookToFind[0].copies[parseInt(localStorage.getItem('clickedButton'))]?.['selling-price'],' ',bookToFind[0].copies[0].selling_price);
    localStorage.setItem(
      "bookID",
      bookToFind[0].copies[parseInt(localStorage.getItem("clickedButton"))]._id
    );
    // toast.success("Borrow request sent")
    navigate("/borrowrequest");
  };

  return (
    <div className="borrow-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="rectangle" />
          <img className="nav-bg" alt="Nav bg" src="nav-bg.png" />
          <div className="div" />
          <div className="text-wrapper">Borrow From</div>
          <div className="group">
            <div className="overlap-group">
              <div className="text-wrapper-2">Borrow Options</div>
              <div className="form-control">Book:</div>
              <div className="form-control-2">Author:</div>
              <div className="form-control-3">Year:</div>
              {bookToFind && bookToFind.length > 0 && (
                <>
                  <div className="frame">
                    <div className="form-control-4">{bookToFind[0].title}</div>
                  </div>
                  <div className="form-control-wrapper">
                    <div className="form-control-4">{bookToFind[0].author}</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="form-control-4">{bookToFind[0].rating}</div>
                  </div>
                  <div
                    className="frame-2"
                    style={{ backgroundImage: `url(${bookToFind[0].image})` }}
                  ></div>
                </>
              )}
            </div>
          </div>

            {bookToFind && bookToFind.length > 0 && (
               bookToFind[0].copies.map((copy, index) => (
                <form className="frame-3" key={index} onSubmit={handleBorrowthisBook}>
              <>
                <div className="form-control-5">Email:</div>
                <div className="frame-4">
                  <div className="form-control-4">
                  {copy.owner}
                  </div>
                </div>
                <button
                  className="borrow-this-book-wrapper"
                  type="submit" onClick={() => handleButtonClick(index)}
                >
                  <div className="borrow-this-book">Borrow This Book</div>
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
                <div className="form-control-6">Rental Price:</div>
                <div className="frame-13">
                  <div className="form-control-4">
                  {copy.rental_price}
                  </div>
                </div>
              </>
               </form>
            ))
            )}
         
         
          <Link to="/homepage">
            <div className="frame-30">
              <div className="text-wrapper-3">Borrow Cancellation</div>
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

export default Borrowpage;
