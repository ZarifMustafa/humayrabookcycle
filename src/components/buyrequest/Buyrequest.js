import './buyrequest.css';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Buyrequest() {
  const navigate = useNavigate();
  const [address, setaddress] = useState();

  function Call_Home() {
    navigate("/homepage");
  }
  function CallProfile()
  {
      navigate("/profile")
  }

  const HandleBuyRequest = async (e) =>  {
   




    navigate("/confirmorder")

  };

return(



    <div className="buy-request-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="rectangle" />
          <img className="nav-bg" alt="Nav bg" src="nav-bg.png" />
          <div className="div" />
          <form onSubmit={HandleBuyRequest}>
          <div className="frame">
            <div className="text-wrapper">Buy Request</div>
            <div className="text-wrapper-2">From:</div>
            <div className="text-wrapper-3">For:</div>
            <div className="text-wrapper-4">Address:</div>
            <div className="frame-2">
              <div className="form-control">Book:</div>
              <div className="form-control-2">Author:</div>
              <div className="overlap-group">
                <div className="form-control-3">Year:</div>
                <div className="form-control-3">Year:</div>
              </div>
              <div className="form-control-4">Price:</div>
              <div className="form-control-wrapper">
                <div className="form-control-5">Paradoxical Sajid</div>
              </div>
              <div className="div-wrapper">
                <div className="form-control-5">Arif Azad</div>
              </div>
              <div className="frame-3">
                <div className="form-control-5">2018</div>
              </div>
              <div className="frame-4">
                <div className="form-control-6">200.00</div>
              </div>
              <div className="frame-5" />
            </div>
            <div className="group">
              <button className="buy-this-book-wrapper" type="submit">
                <div className="buy-this-book">Buy This Book</div>
              </button>
            </div>
            <div className="frame-6">
              <div className="user-icon" />
              <div className="form-control-7">Name:</div>
              <div className="frame-7">
                <div className="form-control-5">Zarif Zeisan Mustafa</div>
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
            <input
                      className="days-text"
                      type="text"
                      placeholder="Enter Address"
                      required
                     
                    />
             
            </div>
          </div>
          <div className="book-cycle" onClick={Call_Home}>Bookcycle</div>
          </form>
        </div>
      </div>
    </div>
)

}
export default Buyrequest;








