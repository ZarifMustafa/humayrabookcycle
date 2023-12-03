import React, { useState, useEffect } from "react";
import axios from "axios";
import "./test.css";

function Test() {
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
            const enhancedRequest = { ...reqForCopy[j], book_id: copies[i]._id, selling_price: copies[i].selling_price};
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

  const fn = async (e) => {
    e.preventDefault();
    const res = await axios.get("http://localhost:5000/getCopies/:bookId");
    const data = res.data;
    console.log(data);
  };

  return (
    <div className="test">
    <div>
      {requests.map((item, index) => (
        <div  className="frame" key={index}>
          <div className="form-control">Title:</div>
          <div className="form-control-wrapper">
            <div className="form-control-2">1984</div>
          </div>
          <button  className="div-wrapper" onClick={fn}>
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
        </div>
      ))}
    </div>
    </div>
  );
}

export default Test;
