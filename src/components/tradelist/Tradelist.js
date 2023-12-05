
import "./tradelist.css";
import React, { useState, useEffect } from 'react';


import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export const Tradelist = () => {
  const [ratings, setRatings] = useState([]);
  const [copies, setCopies] = useState([]);
  const navigate = useNavigate();

  // let copies=[];
  function Call_Home() {
    navigate("/homepage");
  }

  const fetchData = async () => {
    try {
      const userEmail = JSON.parse(localStorage.getItem('currentUser')).email;
      const response = await axios.get(`http://localhost:5000/getTrade/${userEmail}`);
      
      // Assuming the server responds with a JSON object
      const data = response.data.copies;
      setCopies(data);
      console.log(data);
    } catch (error) {
      // Handle any errors that might occur during the fetch
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
    
  },[]);
  const functionForRating  = async (index) => {
   // // Use the specific rating for the trade at the given index
    const ratingForTrade = ratings[index];

    const requestBodyForRatings = {
      currentUserRating: ratingForTrade,
      bookTitle: copies[index].book,
    };

    try {
      const response = await axios.put("http://localhost:5000/updateBookRating", requestBodyForRatings);
      console.log(response.data);
      const data = response.data;
      if (!data.acknowledged) {
        toast.error("Could not add copies to the book");
        return;
      }
      toast.success("Successfully added the book");
    } catch (error) {
      console.error('AxiosError:', error);
      if (error.response) {
        console.log('Error response:', error.response.data);
      }
    }

  };

  const StarRating = ({ index }) => {
    // Initialize the rating state with the corresponding value from the ratings array
    const [rating, setRating] = useState(ratings[index] || 0);
    const [hover, setHover] = useState(0);
  
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, starIndex) => {
          starIndex += 1;
          return (
            <button
              type="button"
              key={starIndex}
              className={starIndex <= (hover || rating) ? "on" : "off"}
              onClick={() => {
                setRating(starIndex);
                // Update the rating array with the new rating for the specific trade
                const newRatings = [...ratings];
                newRatings[index] = starIndex;
                setRatings(newRatings);
              }}
              onMouseEnter={() => setHover(starIndex)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
              <span className="star-image"></span>
            </button>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="trade-list-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="nav-bg">
            <div className="overlap-group">
            <img className="nav-bg" alt="Nav bg" src="img/NavBg.png" />
            <div className="book-cycle" onClick={Call_Home}>Bookcycle</div>
            </div>
          </div>
          <div className="rectangle" />
          <div className="div" />
          {
            // copies && copies.length > 0 && (
              copies.map((copy,index) => (
                <div className="group" key={index}>
            <div className="overlap-2">

              <div className="form-control">To/From:</div>
              <div className="text-wrapper">Price:</div>
              <div className="form-control-2">Date:</div>
              <div className="frame">
                <div className="form-control-3"> {copy.counterpart}</div>
              </div>
              <div className="form-control-wrapper">
                <div className="form-control-3">{copy.price}</div>
              </div>
              <div className="div-wrapper">
                <div className="form-control-3">{copy.date}
                </div>
              </div>
              <button className="author-btn">
                <div className="overlap-group-2">
                  <div className="text-wrapper-2">Delete</div>
                </div>
              </button>
              <div className="form-control-4">Activity:</div>
              <div className="frame-2">
            <div className="form-control-3">{copy.activity}</div>
          </div>
              <div className="overlap-group-wrapper">
                <div className="rate-wrapper">
                  <div className="rate">Rate</div>
                </div>
              </div>
              <div className="form-control-5">Book Name:</div>
              <div className="form-control-6">{copy.book}</div>
              <div className="input-form-control">
                <form id="searchForm" className="searchForm" onSubmit={() => functionForRating(index)}>
                  <StarRating index={index} />
                  <button className="frame-111">
                    <div className="rate111">Rate</div>
                  </button>
                </form>
              </div>
            </div>
          </div>
              
            // )
            )
          )}
          
          
          <div className="text-wrapper-3">My Trade list</div>
        </div>
      </div>
    </div>
  );
};
export default Tradelist;