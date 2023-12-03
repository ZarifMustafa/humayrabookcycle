import './profile.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Profilemodified() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    city: "",
    email: "",
    address: ""
  });
  const [refetch, setrefetch] = useState(false)

  const refetchComponent = ()=> setrefetch(prev=>!prev)

  const enableInput = () => {
    setIsInputEnabled(!isInputEnabled);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value
    });
  };

  const handleUpdateProfile = async () => {
    if(!isInputEnabled){
      setIsInputEnabled(true);
    }
    else{
    try {
      const _id = JSON.parse(localStorage.getItem("currentUser"))._id
      // Make an API request to update the user profile on the backend
      const response = await axios.put("https://bookcycle.onrender.com/api/update-profile", {...updatedUser,_id});

      // Handle success
      toast.success(response.data.message);
      refetchComponent()
      // Disable input fields after updating
      setIsInputEnabled(false);
    } catch (error) {
      // Handle error
      toast.error("Error updating profile. Please try again.");
    }
  }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const userId = currentUser._id;

        // Make an API request to get the user profile based on ID
        const response = await axios.get(`https://bookcycle.onrender.com/api/get-user/${userId}`);

        // Update the state with the fetched user data
        setName(response.data.name);
        setEmail(response.data.email);
        setArea(response.data.area);
        setCity(response.data.city);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Redirect to an error page or handle the error as needed
        // navigate('/error'); // Example: Navigate to an error page
      }
    };

    fetchUserData(); // Call the fetchUserData function

  }, [refetch]);
  

  
  
  
  return (
    <div className="profile-page">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="bg-pic">
            <div className="div" />
          </div>
          <img className="nav-bg" alt="Nav bg" src="img/NavBg.png" />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="text-wrapper">Book Cycle</div>
          <div className="rectangle-4" />
          <div className="rectangle-5" />
          <div className="frame">
            <div className="text-wrapper-2">Hello {name}</div>
          </div>
          <div className="share-borrow-repeat">Share ,borrow &amp; Repeat</div>
          <Link className="sign-up-btn" to="/">
            <div className="overlap-group-sup">
              <div className="text-wrapper-sup2">Log Out</div>
            </div>
          </Link>
          <Link className="log-in-btn" to="/profilemodified">
            <button className="overlap-group-sup" onClick={handleUpdateProfile}>
              <div className="text-wrapper-sup">{isInputEnabled ? 'Update' : 'Edit Profile'}</div>
            </button>
          </Link>
          
          <Link to="/loginhomepagemodified">
            <div className="book-cycle">BookCycle</div>
          </Link>
          <div className="ellipse" />
          <img className="mask-group" alt="Mask group" src="mask-group.png" />
          <div className="flexcontainer">
            <p className="text">
              <span className="span">
                Borrowed
                <br />
              </span>
            </p>
            <p className="text">
              <span className="span">Books</span>
            </p>
          </div>
          <div className="form-control-wrapper">
            <div className="form-control">{name}</div>
          </div>
          <div className="form-control-2">My Account</div>
          <div className="div-wrapper">
            <div className="form-control-3">{area}, {city}</div>
          </div>
          <div className="frame-2">
            <div className="form-control-4">3</div>
          </div>
          <div className="flexcontainer-2">
            <p className="text">
              <span className="span">
                Owned
                <br />
              </span>
            </p>
            <p className="text">
              <span className="span">Books</span>
            </p>
          </div>
          <div className="frame-3">
            <div className="form-control-4">9</div>
          </div>
          <div className="flexcontainer-3">
            <p className="text">
              <span className="span">
                Bought
                <br />
              </span>
            </p>
            <p className="text">
              <span className="span">Books</span>
            </p>
          </div>
          <div className="frame-4">
            <div className="form-control-4">15</div>
          </div>
          <Link to="/tradelist">
          <div className="frame-5">
            <div className="text-wrapper-3">Your Trades</div>
          </div></Link>
          <div className="username">
            <div className="username-wrapper">
              <input type="text" disabled={!isInputEnabled} className="username-2" placeholder={name} name="name" value={updatedUser.name} onChange={handleInputChange} />
            </div>
            <div className="form-control-5">Username</div>
          </div>
          <div className="lastname">
            <div className="username-3">
              <input type="text" disabled={!isInputEnabled} className="username-2" placeholder='MSI' />
            </div>
            <div className="form-control-6">Last name</div>
          </div>
          <div className="firstname">
            <div className="username-4">
              <input type="text" disabled={!isInputEnabled} className="username-2" placeholder='Dollar' />
            </div>
            <div className="form-control-7">First name</div>
          </div>
          <div className="city">
            <div className="username-wrapper">
              <input type="text" disabled={!isInputEnabled} className="username-2" placeholder={city} name="city" value={updatedUser.city} onChange={handleInputChange} />
            </div>
            <div className="form-control-8">City</div>
          </div>
          <div className="email">
            <div className="username-5">
              <input type="text" disabled={!isInputEnabled} className="username-2" placeholder={email} name="email" value={updatedUser.email} onChange={handleInputChange} />
            </div>
            <div className="form-control-9">Email Address</div>
          </div>
          <div className="group">
            <div className="frame-6">
              <input type="text" disabled={!isInputEnabled} className="text-wrapper-4" placeholder={area} name="area" value={updatedUser.area} onChange={handleInputChange} />
            </div>
            <div className="form-control-10">Address</div>
          </div>
          <img className="line" alt="Line" src="img/line-42.svg" />
          <div className="user-information">USER INFORMATION</div>
          <div className="contact-information">CONTACT INFORMATION</div>
        </div>
      </div>
    </div>
  )
}

export default Profilemodified;