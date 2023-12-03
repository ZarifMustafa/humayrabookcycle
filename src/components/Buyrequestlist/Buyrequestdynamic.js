import "./buyrequestdynamic.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Buyrequestdynamic() {
  const [buy_requests, setbuy_requests] = useState([]);
  const navigate = useNavigate();

  function Call_Login_Home() {
    navigate("/loginhomepagemodified");
  }

  function Call_Profile() {
    navigate("/profile");
  }

  const handleBuyRequestList = async (e, item) => {
    const confirmOrder = {
      buyer: item.email,
      seller: JSON.parse(localStorage.getItem('currentUser')).email,
      bookName: item.title,
      price: item.selling_price,
      book_id: item.book_id,
      image: item.image,
    }
    localStorage.setItem('confirmOrder',JSON.stringify(confirmOrder));
    console.log('Eta confirmOrder: ');
    console.log(confirmOrder);

    navigate("/confirmorder");
  };
  
  const [requests, setRequests] = useState([]);

  const getUser = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/getUser/${email}`);
      const data = res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getCopies");
      const copies = res.data;
      console.log('Egula copies: ');
      console.log(copies);
      const owner = JSON.parse(localStorage.getItem('currentUser')).email;
      const updatedRequests = [];

      for (let i = 0; i < copies.length; i++) {
        if (copies[i].owner === owner) {
          const resp = await axios.get(`http://localhost:5000/getRequests/${copies[i]._id}`);
          const reqForCopy = resp.data.requests;
          // const response2 = await getUser(owner);
          // console.log(response2);
          for (let j = 0; j < reqForCopy.length; j++) {
            //const userData='Hello ';
            //  const userData = await getUser(copies[i].email);
            // console.log(userData);
            const enhancedRequest = { ...reqForCopy[j], book_id: copies[i]._id, selling_price: copies[i].selling_price, title: copies[i].title, image: copies[i].image};
            updatedRequests.push(enhancedRequest);
          }
        }
      }

      setRequests(updatedRequests);
      console.log(updatedRequests);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="buy-request-dynamic">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="rectangle" />
          <img className="nav-bg" alt="Nav bg" src="/img/NavBg.png" />
          <div className="div" />
          <button className="sign-up-btn" onClick={Call_Profile}>
            {/* <div className="overlap-group-profile">
              <div className="text-wrapper-2-profile">{JSON.parse(localStorage.getItem('currentUser')).name}</div>
            </div> */}
          </button>
          <div className="text-wrapper">Buy Requests</div>
          {requests.map((item, index) => (
            <div className="frame" onClick={(event) => handleBuyRequestList(event, item)}>
                {/* {buy_requests.map((book, index) => (
                <BookCard title={book.title} name={book.name} price={book.price} image={book.image} key={index} />
                ))} */}
                <div className="form-control">Title:</div>
                <div className="form-control-wrapper">
                <div className="form-control-2">{item.title}</div>
                </div>
                <button type="submit" className="div-wrapper">
                <div className="text-wrapper-2">Confirm Request</div>
                </button>
                <div className="form-control-3">Name:</div>
                <div className="form-control-4">Selling for:</div>
                <div className="frame-2">
                <div className="form-control-2">{item.email}</div>
                </div>
                <div className="frame-3">
                <div className="form-control-2">{item.selling_price}</div>
                </div>
                <div className="frame-6" style={{ backgroundImage: `url(${item.image})` }}>
                {/* <img src="/img/SajidCover.png" /> */}
                {/* <img src={item.image} alt="Book Cover" /> */}
                <div style={{ backgroundImage: `url(${item.image})` }}></div>
                </div>
            </div>
          ))}

          <div className="book-cycle" onClick={Call_Login_Home}>
            Bookcycle
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buyrequestdynamic;