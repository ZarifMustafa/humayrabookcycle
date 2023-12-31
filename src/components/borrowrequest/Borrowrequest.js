import './borrowrequest.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { findBookToFind, setBookToFind, findSeller, setSeller } from '../LocalStorage/LocalStorage';

function Borrowrequest() {
  const navigate = useNavigate();
  const [address, setaddress] = useState();
  const [bookToFind, setBookToFind] = useState(findBookToFind());
  const [userName, setUserName] = useState('');
  const [clickedButton, setClickedButton] = useState(localStorage.getItem('clickedButton'));
  
  function Call_Home() {
    navigate("/homepage");
  }
  function CallProfile()
  {
      navigate("/profile")
  }
  useEffect(() => {
    async function fetchUserData() {
      try {
        // console.log(bookToFind);
        // console.log(parseInt(localStorage.getItem('clickedButton')));
        // console.log(bookToFind[0]);
        console.log(localStorage.getItem('bookID'));
        
        const response = await getUser(bookToFind[0].copies[parseInt(localStorage.getItem('clickedButton'))].owner);
        console.log(response);
        if (response && response.name) {
          setUserName(response.name);
        } else {
          console.error('User data or name not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
    return () => {
      setBookToFind(findBookToFind());
    }
  }, [])

  const handleborrowrequest = async (e) =>  {
    e.preventDefault();
    const address=e.target.AddressInput.value;
    console.log(address);
    const requestBody= {
      address : address,
      email : JSON.parse(localStorage.getItem('currentUser')).email,
      bookID: localStorage.getItem('bookID')
    }
    console.log(requestBody);
    const res=await axios.post(process.env.REACT_APP_CURRENT_PATH+"/appendrequestborrow", requestBody);
    const data = res.data;
    console.log('Ekhane res.data: ');
    console.log(res.data);
    if(!data.acknowledged)
    {
        toast.error("Could not send buy request");
        return;
    }
     toast.success("Borrow request sent");
     navigate("/loginhomepagemodified")
  };


  const getUser = async (email) =>{
    const res=await axios.get(process.env.REACT_APP_CURRENT_PATH+`/getusers/${email}`);
    const data = res.data;
    console.log(data);
    return data;
  }
  return (
    <div className="borrow-request-page">
    {bookToFind && bookToFind.length > 0 &&  (
          <>
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="rectangle" />
          <img className="nav-bg" alt="Nav bg" src="./img/NavBg.png" />
          <div className="div" />
          <form className="frame" onSubmit={handleborrowrequest}>
            <div className="overlap-group">
              <div className="text-wrapper">Borrow Request</div>
              <div className="text-wrapper-2">From:</div>
              <div className="text-wrapper-3">For:</div>
              <div className="text-wrapper-4">Address:</div>
              <div className="frame-2">
                <div className="form-control">Book:</div>
                <div className="form-control-2">Author:</div>
                <div className="form-control-3">Rating:</div>
                <div className="form-control-4">Rental Price:</div>
                <div className="form-control-wrapper">
                  <div className="form-control-5">{bookToFind[0].title}</div>
                </div>
                <div className="div-wrapper">
                  <div className="form-control-5">{bookToFind[0].author}</div>
                </div>
                <div className="frame-3">
                  <div className="form-control-5">{bookToFind[0].rating.toFixed(2)}</div>
                </div>
                <div className="frame-4">
                  <div className="form-control-5">{bookToFind[0].copies[parseInt(localStorage.getItem('clickedButton'))].rental_price}</div>
                </div>
                <div className="frame-5" style={{ backgroundImage: `url(${bookToFind[0].image})` }} />
              </div>
              <button className="group" type='submit'>
                <div className="borrow-this-book-wrapper">
                  <div className="borrow-this-book">Borrow This Book</div>
                </div>
              </button>
              <div className="frame-6">
                <div className="user-icon" />
                <div className="form-control-6">Name:</div>
                <div className="frame-7">
                  <div className="form-control-5">{userName}</div>
                </div>
                <div className="frame-8">
                  <div className="frame-9">
                    <div className="form-control-5">5 Star</div>
                  </div>
                  <div className="overlap-group-2">
                    <div className="frame-10" />
                    <div className="frame-11" />
                    <div className="frame-12" />
                    <div className="frame-13" />
                    <div className="frame-14" />
                  </div>
                </div>
                <div className="frame-15" onClick={CallProfile}>
                  <div className="text-wrapper-5">See Profile</div>
                </div>
              </div>
              <div className="address-input">
                <input className="days-text" name="AddressInput" type="text" placeholder='Enter Address' required/>
              </div>
            </div>
          </form>
          <div className="book-cycle" onClick={Call_Home}>Bookcycle</div>
        </div>
      </div>
      </>
          )}
    </div>
  )
}

export default Borrowrequest;