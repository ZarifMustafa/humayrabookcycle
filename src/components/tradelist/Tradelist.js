
import "./tradelist.css";
import React, { useState, useEffect } from 'react';


import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export const Tradelist = () => {
  const [rating, setrating] = useState([]);
  const [copies, setCopies] = useState([]);
  const navigate = useNavigate();

  // let copies=[];
  function Call_Home() {
    navigate("/homepage");
  }

  const fetchData = async () => {
    try {
      const userEmail = JSON.parse(localStorage.getItem('currentUser')).email;
      const response = await axios.get(process.env.REACT_APP_CURRENT_PATH+`/getTrade/${userEmail}`);
      
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
  // const functionForDelete = async (e, index) => {
  //   e.preventDefault();
  
  //   const requestBody = {
  //     useremail: JSON.parse(localStorage.getItem('currentUser')).email,
  //     index1: index,
  //   };
  //   console.log(requestBody);
  //   try {
  //     const response = await axios.delete("http://localhost:5000/deleteTradeByIndexAndUser", {
  //       data: requestBody,
  //       headers: { 'Content-Type': 'application/json' },
  //     });
      
  
  //     const data = response.data;
  
  //     if (data.success) {
  //       toast.success("Successfully deleted trade list item");
  //       // Update the state to reflect the deletion
  //       setCopies((prevCopies) => prevCopies.filter((copy, i) => i !== index));
  //     } else {
  //       toast.error("Could not delete trade list item");
  //     }
  //   } catch (error) {
  //     console.error('AxiosError:', error);
  //     if (error.response) {
  //       console.log('Error response:', error.response.data);
  //     }
  //   }
  // };
  
  
  const functionForBookdetails = async (e, index) => {
    e.preventDefault();
    console.log('Hello bookdetails tipsi');
    // const requestBodyForRatings = {
    //   currentUserRating: parseInt(rating, 10),
    //  // bookTitle: JSON.parse(localStorage.getItem('bookToFind'))[0].title,
    //   book: copies[index].book, // Set counterpart from the specific copy
    // };
    const title=copies[index].book;
    try {
      
      const response = await axios.get(process.env.REACT_APP_CURRENT_PATH+`/bookByTitle/${title}`);
      const books=[];
      console.log(response.data);
      books.push(response.data);
      console.log(books);
      localStorage.setItem('bookToFind',JSON.stringify(books));  
      try {
      
        const response = await axios.get(process.env.REACT_APP_CURRENT_PATH+`/bookByTitle/${title}`);
        const books=[];
        console.log(response.data);
        books.push(response.data);
        console.log(books);
        localStorage.setItem('bookToFind',JSON.stringify(books));  
        navigate('/bookdetails');
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }


  }
    
  const functionForRating = async (e, index) => {
    e.preventDefault();
    console.log('Hello button tipsi');
    const requestBodyForRatings = {
      currentUserRating: parseInt(rating, 10),
     // bookTitle: JSON.parse(localStorage.getItem('bookToFind'))[0].title,
      counterpart: copies[index].counterpart, // Set counterpart from the specific copy
    };
    console.log(requestBodyForRatings);


    try {
      const response = await axios.put(process.env.REACT_APP_CURRENT_PATH+"/updateUserRating", requestBodyForRatings);
      console.log(response.data);
      const data = response.data;
      if (!data.acknowledged) {
        toast.error("Could not add ratings to user");
        return;
      }
      toast.success("Successfully updated ratings");
    } catch (error) {
      console.error('AxiosError:', error);
      if (error.response) {
        console.log('Error response:', error.response.data);
      }
    }

  };

  const StarRating = () => {
    // const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => 
                setrating(index)
              }
              onMouseEnter={() => setHover(index)}
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
              <button className="author-btn2" onClick={(e) => functionForBookdetails(e, index)}>
      <div className="overlap-group-22">
        <div className="text-wrapper-22">Bookdetails</div>
      </div>
    </button>
            
              {/* <button className="author-btn" onClick={(e) => functionForDelete(e, index)}>
  <div className="overlap-group-2">
    <div className="text-wrapper-2">Delete</div>
  </div>
</button>  */}
<button className="author-btn">
  <div className="overlap-group-2">
    <div className="text-wrapper-2">Delete</div>
  </div>
</button> 

              <div className="form-control-4">Activity:</div>
              <div className="frame-2">
            <div className="form-control-3">{copy.activity}</div>
          </div>
          {/* <form id="searchForm" className="searchForm" onSubmit={(e) => functionForRating(e, index)}>

                  <StarRating index={index} />
              <button className="overlap-group-wrapper">
                <div className="rate-wrapper">
                  <div className="rate" type="submit">Rate</div>
                </div>
              </button>
              </form> */}
              <div className="form-control-5">Book Name:</div>
              <div className="form-control-6">{copy.book}</div>
              <div className="input-form-control">
              <form id="searchForm" className="searchForm" onSubmit={(e) => functionForRating(e, index)}>

<StarRating index={index} />
<button className="overlap-group-wrapper">
<div className="rate-wrapper">
<div className="rate" type="submit">Rate</div>
</div>
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