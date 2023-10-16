import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router";
import {toast} from "react-toastify";
import "./register.css";

const Register = () => {

    const [firstName, setfirstName] = useState()
    const [lastName, setlastName] = useState()
    const [mobile, setmobile] = useState()
    const [email, setemail] = useState()
    const [pass, setpass] = useState()
    const [confirmPass, setconfirmPass] = useState()
    const [city, setcity] = useState()
    const [area, setarea] = useState()
    const [interest, setinterest] = useState()
    const [dob, setdob] = useState()
    const navigate=useNavigate();

    function Call_Home() {
        navigate('/');
    }
    const handleSignUp = async (e) => {
        e.preventDefault();

        if(pass!=confirmPass)
        {
            toast.error("passwords do not match!!")
            return
        }

        const requestBody = {
            name: firstName+" "+lastName,
            mobile: mobile,
            email: email,
            password: pass,
            city: city,
            area: area,
            interest: interest,
            dob: dob
        }

        const res=await axios.post("http://localhost:5000/insertuser", requestBody);
        const data = res.data;

        if(!data.acknowledged)
        {
            toast.error("Could not insert user");
            return;
        }

        toast.success("Successfully created user");
        navigate('/thankucreating');
    }

  return (
    <div>
      <div class="signup-page">
        <div class="overlap-wrapper">
          <div class="overlap">
            <div class="rectangle"></div>
            <img class="nav-bg" src="img/NavBg.png" />
            <div class="div"></div>
            <form class="frame" onSubmit={handleSignUp}>
              <div class="h">register</div>
              <div class="firstname-input">
                <div class="text-wrapper">
                  <input
                    required
                    class="input"
                    type="text"
                    placeholder="Enter First Name"
                    onChange={(e)=>{setfirstName(e.target.value);}}
                  ></input>
                </div>
              </div>
              <div class="last-name-input">
                <div class="text-wrapper">
                  <input
                    required
                    class="input"
                    type="text"
                    placeholder="Enter Last Name"
                    onChange={(e)=>{setlastName(e.target.value);}}
                  ></input>
                </div>
              </div>
              <p class="form-control">
                <span class="span">First Name </span>{" "}
                <span class="text-wrapper-2">*</span>
              </p>
              <p class="p">
                <span class="span">Last Name </span>{" "}
                <span class="text-wrapper-2">*</span>
              </p>
              <div class="country-input">
                <div class="text-wrapper">
                  <select class="input" name="City" required onChange={(e)=>{setcity(e.target.value);}}>
                    <option value="None">Select City</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>
              </div>
              <div class="select">
                <div class="text-wrapper">
                  <select class="input" name="Area" required onChange={(e)=>{setarea(e.target.value);}}>
                    <option value="None">Select Area</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>
              </div>
              <p class="email">
                Make sure the provided information matches your Government ID.
              </p>
              <p class="form-control-2">
                <span class="span">City </span>{" "}
                <span class="text-wrapper-2">*</span>
              </p>
              <p class="form-control-3">
                <span class="span">Mobile No. </span>{" "}
                <span class="text-wrapper-2">*</span>
              </p>
              <p class="form-control-4">
                <span class="span">Area </span>{" "}
                <span class="text-wrapper-2">*</span>
              </p>
              <div class="input-form-control">
                <div class="text-wrapper">
                  <input
                    class="inputDoB"
                    type="date"
                    placeholder="Enter Birthdate"
                    onChange={(e)=>{setdob(e.target.value);}}
                  ></input>
                </div>
              </div>
              <div class="email-wrapper">
                <div class="text-wrapper">
                  <input
                    required
                    onChange={(e)=>{setpass(e.target.value);}}
                    class="inputPass"
                    type="password"
                    placeholder="Enter Password (At least 8 characters long)"
                  ></input>
                </div>
              </div>
              <div class="country-input-2">
                <div class="text-wrapper">
                  <select class="input" name="Interest" required onChange={(e)=>{setinterest(e.target.value);}}>
                    <option value="None">Catagory</option>
                    <option value="Novel">Novel</option>
                    <option value="Science_Fiction">Science Fiction</option>
                    <option value="Islamic_Books">Islamic Books</option>
                    <option value="Biography">Biography</option>
                    <option value="Kids">Kids</option>
                    <option value="Computer">Computer</option>
                    <option value="History">History</option>
                    <option value="Comics">Comics</option>
                  </select>
                </div>
              </div>
              <div class="div-wrapper">
                <div class="text-wrapper">
                  <input
                    required
                    class="input"
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e)=>{setemail(e.target.value);}}
                  ></input>
                </div>
              </div>
              <div class="input-form-control-2">
                <div class="text-wrapper">
                  <input
                    required
                    class="inputPass"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e)=>{setconfirmPass(e.target.value);}}
                  ></input>
                </div>
              </div>
              <p class="form-control-5">
                <span class="span">Birthdate </span>{" "}
                <span class="text-wrapper-2">*</span>
              </p>
              <p class="form-control-6">
                <span class="span">Choose a Strong Password </span>{" "}
                <span class="text-wrapper-2">*</span>
              </p>
              <p class="form-control-7">
                <span class="span">Confirm Password </span>{" "}
                <span class="text-wrapper-2">*</span>
              </p>
              <p class="form-control-8">
                <span class="span">Email </span>{" "}
                <span class="text-wrapper-2">*</span>
              </p>
              <p class="interest-of-books">
                <span class="span">Interest of Books </span>{" "}
                <span class="text-wrapper-2">*</span>
              </p>
              <button class="become-member-btn" type="submit">
                <div class="overlap-group">
                  <div class="text-wrapper-3">Become a Member</div>
                </div>
              </button>
              <div class="phone-number-input">
                <div class="text-wrapper">
                  <input
                    required
                    class="input"
                    type="text"
                    placeholder="Enter Number"
                    onChange={(e)=>{setmobile(e.target.value);}}
                  ></input>
                </div>
              </div>
            </form>
            <div class="book-cycle" onClick={Call_Home}>
              Bookcycle
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;