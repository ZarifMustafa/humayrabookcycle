import "./buyrequestlist.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Buyrequestlist() {
  const [buy_requests, setbuy_requests] = useState([]);
  const navigate = useNavigate();

  function Call_Login_Home() {
    navigate("/loginhomepage");
  }

  function Call_Profile() {
    navigate("/profile");
  }

  const handleBuyRequestList = async (e) => {
    navigate("/confirmorder");
  };
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/buy_requests'); // API endpoint
        setbuy_requests(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, []);

  const BookCard = ({ title, name, price, image }) => {
    return (
      <>
        <div className="form-control">Title:</div>
        <div className="form-control-wrapper">
          <div className="form-control-2">{title}</div>
        </div>
        <button type="submit" className="div-wrapper">
          <div className="text-wrapper-2">Confirm Request</div>
        </button>
        <div className="form-control-3">Name:</div>
        <div className="form-control-4">Selling for:</div>
        <div className="frame-2">
          <div className="form-control-2">{name}</div>
        </div>
        <div className="frame-3">
          <div className="form-control-2">{price}</div>
        </div>
        <div className="frame-4">
          <img src={image} />
        </div>
      </>
    );
  };

  return (
    <div className="buy-request-list">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="rectangle" />
          <img className="nav-bg" alt="Nav bg" src="/img/NavBg.png" />
          <div className="div" />
          <button className="sign-up-btn" onClick={Call_Profile}>
            <div className="overlap-group-profile">
              <div className="text-wrapper-2-profile">{JSON.parse(localStorage.getItem('currentUser')).name}</div>
            </div>
          </button>
          <div className="text-wrapper">Buy Requests</div>
          <form className="frame" onSubmit={handleBuyRequestList}>
            {/* {buy_requests.map((book, index) => (
              <BookCard title={book.title} name={book.name} price={book.price} image={book.image} key={index} />
            ))} */}
            <div className="form-control">Title:</div>
            <div className="form-control-wrapper">
              <div className="form-control-2">Paradoxical Sajid</div>
            </div>
            <button type="submit" className="div-wrapper">
              <div className="text-wrapper-2">Confirm Request</div>
            </button>
            <div className="form-control-3">Name:</div>
            <div className="form-control-4">Selling for:</div>
            <div className="frame-2">
              <div className="form-control-2">Zarif Zeisan Mustafa</div>
            </div>
            <div className="frame-3">
              <div className="form-control-2">259.00</div>
            </div>
            <div className="frame-6">
              <img src="/img/SajidCover.png" />
            </div>
          </form>
          <form className="frame-5" onSubmit={handleBuyRequestList}>
            <div className="form-control">Title:</div>
            <div className="form-control-wrapper">
              <div className="form-control-2">Paradoxical Sajid</div>
            </div>
            <button type="submit" className="div-wrapper">
              <div className="text-wrapper-2">Confirm Request</div>
            </button>
            <div className="form-control-3">Name:</div>
            <div className="form-control-4">Selling for:</div>
            <div className="frame-2">
              <div className="form-control-2">Zarif Zeisan Mustafa</div>
            </div>
            <div className="frame-3">
              <div className="form-control-2">259.00</div>
            </div>
            <div className="frame-6">
              <img src="/img/SajidCover.png" />
            </div>
          </form>
          <form className="frame-7" onSubmit={handleBuyRequestList}>
            <div className="form-control">Title:</div>
            <div className="form-control-wrapper">
              <div className="form-control-2">1984</div>
            </div>
            <button type="submit" className="div-wrapper">
              <div className="text-wrapper-2">Confirm Request</div>
            </button>
            <div className="form-control-3">Name:</div>
            <div className="form-control-4">Selling for:</div>
            <div className="frame-2">
              <div className="form-control-2">y z</div>
            </div>
            <div className="frame-3">
              <div className="form-control-2">300</div>
            </div>
            <div className="frame-8">
              <img src="/img/SajidCover.png" />
            </div>
          </form>
          <div className="book-cycle" onClick={Call_Login_Home}>
            Bookcycle
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buyrequestlist;