import './confirmborrow.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Confirmborrow() {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const[buyer, setBuyer] = useState("");
  const image=JSON.parse(localStorage.getItem('confirmBorrow')).image;
  function Call_Home() {
    navigate("/loginhomepagemodified");
  }

  const handleconfirmborrow = async (e) =>  {
    try {
      const copyId= JSON.parse(localStorage.getItem('confirmBorrow')).book_id;
      const response = await fetch(`http://localhost:5000/deleteCopy/${copyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Ei j response');
      console.log(response);
      if (response.ok) {
        // alert('Copy deleted successfully');
        toast.success('Copy deleted successfully');
        
      } else {
        // alert(`Error: ${data.error}`);
        toast.error(`Error: ${data.error}`);
      }
      navigate('/loginhomepagemodified');
    } catch (error) {
      console.error('Error:', error);
      // alert('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    }
  
  };
  const fetchData = async () => {
    try {
      const title = JSON.parse(localStorage.getItem('confirmBorrow')).bookName;
      const selectedGenre = "Category";
      const selectedOwner = "Owner";
      const selectedAuthor = "Author";
  
      const res = await axios.get(`http://localhost:5000/searchByTitle?title=${title}&genre=${selectedGenre}&owner=${selectedOwner}&author=${selectedAuthor}`);
      const book = res.data;
  
      const email = JSON.parse(localStorage.getItem('confirmBorrow')).buyer;
      // 
  
      console.log(book);
      setAuthor(book[0].author);
      console.log(book[0]);
      console.log('Ekhane author: ', author);
      console.log('Buyer:', buyer);
  
      // Assuming you have a 'setBuyer' function in your component to set the buyer state
      setBuyer(buyer);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [author,buyer]);
  
  return (
    <div className="confirm-borrow-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="rectangle" />
          <img className="nav-bg" alt="Nav bg" src="./img/NavBg.png" />
          <div className="div" />
          <div className="book-cycle" onClick={Call_Home}>
              Bookcycle
            </div>
          <form onSubmit={handleconfirmborrow}>
          <div className="frame">
            <div className="rectangle-2" />
          </div>
          <div className="text-wrapper">Confirm Borrow</div>
          <div className="frame-2"   style={{ backgroundImage: `url(${image})` }}/>
          <div className="form-control">Book:</div>
          <div className="form-control-2">Lend To:</div>
          <div className="form-control-3">Author:</div>
          <div className="form-control-4">Rental Price:</div>
          <div className="form-control-wrapper">
            <div className="form-control-5">{JSON.parse(localStorage.getItem('confirmBorrow')).bookName}</div>
          </div>
          <div className="div-wrapper">
            <div className="form-control-5">{author}</div>
          </div>
          <div className="frame-3">
            <div className="form-control-5">{JSON.parse(localStorage.getItem('confirmBorrow')).price}</div>
          </div>
          <div className="frame-4">
            <div className="form-control-5">{JSON.parse(localStorage.getItem('confirmBorrow')).buyer}</div>
          </div>
          <div className="frame-5">
            <div className="frame-6">
              <div className="form-control-5">5 Star</div>
            </div>
            <div className="overlap-group">
              <div className="frame-7" />
              <div className="frame-8" />
              <div className="frame-9" />
              <div className="frame-10" />
              <div className="frame-11" />
            </div>
          </div>
          <button className="frame-12" type='submit' onClick={handleconfirmborrow}>
            <div className="text-wrapper-2">Confirm Request</div>
          </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Confirmborrow;