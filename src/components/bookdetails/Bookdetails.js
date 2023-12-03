import './bookdetails.css';
import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import {toast} from "react-toastify";

function Bookdetails() {
  const [rating, setrating] = useState();
  const[feedback,setfeedback]= useState();
  const image=JSON.parse(localStorage.getItem('bookToFind'))[0].image;
  const reviews=JSON.parse(localStorage.getItem('bookToFind'))[0].reviews;
  console.log('This is image');
  console.log(image);

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

  const functionForFeedback = async (e) => {
    e.preventDefault();
    const reviewsData = [
      { name: JSON.parse(localStorage.getItem('currentUser')).name, comment: feedback },
  
      // ... more review data
    ];
    
    const requestBodyForReviews = {
      title: JSON.parse(localStorage.getItem('bookToFind'))[0].title,
      reviews: reviewsData.map(review => ({
        name: review.name,
        comment: review.comment,
      })),
    };
    
    try {
      const response = await axios.post("http://localhost:5000/addReviewsToBook", requestBodyForReviews);
      console.log(response.data);
      const data = response.data;
      if (!data.acknowledged) {
        toast.error("Could not add review");
        return;
      }
      toast.success("Successfully added the review");
    } catch (error) {
      console.error('AxiosError:', error);
      if (error.response) {
        console.log('Error response:', error.response.data);
      }
    }
  }
    
  const functionForRating = async (e) => {
    e.preventDefault();
    console.log('Hello button tipsi');
    const requestBodyForRatings = {
      
        currentUserRating: parseInt(rating, 10),
        bookTitle: JSON.parse(localStorage.getItem('bookToFind'))[0].title
      }
      console.log(requestBodyForRatings);
        try {
                  const response = await axios.put("http://localhost:5000/updateBookRating", requestBodyForRatings);
                  console.log(response.data);
                  const data = response.data;
                  if (!data.acknowledged) {
                    toast.error("Could not update rating");
                    return;
                  }
                  toast.success("Successfully updated rating");
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
            <div className="div">
              <div className="overlap-group-2">
                <div className="form-control-wrapper">
                  <div className="form-control">Ratings:</div>
                </div>
                <div className="div-wrapper">
                  <div className="text-wrapper">{JSON.parse(localStorage.getItem('bookToFind'))[0].rating}</div>
                </div>
              </div>

              {/* forme dhukbe */}
              
              {/* forme dhukbe */}
              <form onSubmit={functionForFeedback}>
              <div className="form-control-2">&nbsp;&nbsp;&nbsp;&nbsp;Give feedback:</div>
              <div className="frame-2">
                <div className="text-wrapper-2">
                  <div id="searchForm">
                    <input
                      className="inputName"
                      type="text"
                      placeholder="Enter Feedback"
                      onChange={(e) => {
                        setfeedback(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* <button type="submit" className="submitButton">Submit</button> */}

              <button className="submit-btn-overlap-group">
                <div className="submitButton">
                  {/* <div className="submit-btn-text-wrapper"> */}
                    Submit
                    {/* </div> */}
                </div>
              </button>
            </form>


              {/* forme dhukbe */}
              <form onSubmit={functionForRating}>
              <p className="p">
                Give ratings
                <br /> <br />
                out of five:
              </p>
              <div className="frame-3">
                <div className="text-wrapper-3">
                <div id="searchForm">
                {/* <input
                      className="inputName"
                      type="text"
                      placeholder="Enter Rating"
                      onChange={(e) => {
                        setrating(e.target.value);
                      }}
                    /> */}

                    <StarRating></StarRating>
                     </div>             
                  </div>
              </div>
              {/* <button className="submitButton" type="submit">hello</button> */}

              <button className="rate-btn">
                <div className="submitButton" type="submit">Rate</div>
              </button>
              </form>
              {/* forme dhukbe */}
              <div className="frame-4">
              {
                reviews.map((review,index) => (
                
                <div className="frame-5">
                  <div className="frame-10">
                    <div className="form-control-9">{review.name}</div>
                  </div>
                  <div className="form-control-3">Ratings</div>
                  <div className="frame-6">
                    <div className="text-wrapper-4">3.76</div>
                  </div>
                  <div className="email-wrapper">
                    <p className="email">
                      {review.comment}
                    </p>
                  </div>
                </div>
                
              
                )
                )}
              </div>
              {/* <div className="frame-4">
                <div className="frame-5">
                  <div className="form-control-3">Ratings</div>
                  <div className="frame-6">
                    <div className="text-wrapper-4">3.76</div>
                  </div>
                  <div className="email-wrapper">
                    <p className="email">
                      {JSON.parse(localStorage.getItem('bookToFind'))[0].reviews.slice(-2)[0].comment}
                    </p>
                  </div>
                </div>
                
              </div> */}
            </div>
          </div>
          <div className="text-wrapper-6">Book Details</div>
          <div className="form-control-5">Book:</div>
          <div className="form-control-6">Reviews:</div>
          <div className="form-control-7">Author:</div>
          <div className="form-control-8">Pages:</div>
          <div className="frame-9">
            <div className="form-control-9">{JSON.parse(localStorage.getItem('bookToFind'))[0].author}</div>
          </div>
          {/* <div className="frame-10">
            <div className="form-control-9">{JSON.parse(localStorage.getItem('bookToFind'))[0].reviews[0].name}</div>
          </div>
          <div className="frame-11">
            <div className="form-control-9">{JSON.parse(localStorage.getItem('bookToFind'))[0].reviews[1].name}</div>
          </div> */}

          


          <div className="frame-12">
            <div className="form-control-9">{JSON.parse(localStorage.getItem('bookToFind'))[0].pages}</div>
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
          {/* <div className="email-wrapper">
            <p className="email">
            {JSON.parse(localStorage.getItem('bookToFind'))[0].reviews[0].comment}
            </p>
          </div>
          <div className="frame-13">
            <p className="email">{JSON.parse(localStorage.getItem('bookToFind'))[0].reviews[1].comment}</p>
          </div> */}

          <div className="frame-14" style={{ backgroundImage: `url(${image})` }} />
          <div className="frame-15">
            <div className="form-control-10">{JSON.parse(localStorage.getItem('bookToFind'))[0].title}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Bookdetails;
