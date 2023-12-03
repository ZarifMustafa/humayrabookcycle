import './confirmorder.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Confirmorder() {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const[buyer, setBuyer] = useState("");
  const image=JSON.parse(localStorage.getItem('confirmOrder')).image;
  function Call_Home() {
    navigate("/loginhomepagemodified");
  }

  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
  const HandleConfirmRequest = async (e) =>  {
    try {
      
      const copyId= JSON.parse(localStorage.getItem('confirmOrder')).book_id;
      const response = await fetch(`http://localhost:5000/deleteCopy/${copyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const response2 = await axios.delete(`http://localhost:5000/buyRrequestsDelete/${copyId}`);
      const data2=response2.data;
      if (response.ok) {
        // alert('Copy deleted successfully');
        toast.success('Copy deleted successfully');
        
      } else {
        // alert(`Error: ${data.error}`);
        toast.error(`Error: ${data.error}`);
      }


      toast.success('Copy deleted successfully');
      navigate('/loginhomepagemodified');
    } catch (error) {
      console.error('Error:', error);
      // alert('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    }

    const copiesData = [
      { 
        activity: 'sold', 
        counterpart:  JSON.parse(localStorage.getItem('confirmOrder')).buyer,
        book: JSON.parse(localStorage.getItem('confirmOrder')).bookName,
        price: JSON.parse(localStorage.getItem('confirmOrder')).price,
        date: getCurrentDate(),
      },
        // ... more copies data
    ]
    const requestBody = {
      useremail: JSON.parse(localStorage.getItem('currentUser')).email,

      copies: copiesData.map(copy => ({
      activity: copy.activity,
      counterpart:copy.counterpart,
      book: copy.book,
      price: copy.price,
      date: copy.date,      
  })),
    }

    const copiesData2 = [
      { 
        activity: 'bought', 
        counterpart:  JSON.parse(localStorage.getItem('confirmOrder')).seller,
        book: JSON.parse(localStorage.getItem('confirmOrder')).bookName,
        price: JSON.parse(localStorage.getItem('confirmOrder')).price,
        date: getCurrentDate(),
 
      },
        // ... more copies data
      ];
    const requestBody2 = {
      useremail: JSON.parse(localStorage.getItem('confirmOrder')).buyer,

      copies: copiesData2.map(copy => ({
      activity: copy.activity,
      counterpart:copy.counterpart,
      book: copy.book,
      price: copy.price,
      date: copy.date,
  })),
    }
    try{
      const respp = await axios.get("http://localhost:5000/getTrades");
      const copies = respp.data;
      console.log('Egula copies: ');
      console.log(copies);
      //const owner = JSON.parse(localStorage.getItem('currentUser')).email;
     // const updatedRequests = [];
     var flag =0;
     var flag2=0;
      for (let i = 0; i < copies.length; i++) {
        if (copies[i].useremail === JSON.parse(localStorage.getItem('currentUser')).email
        ) {
          flag=1;
          try {
            const response = await axios.post("http://localhost:5000/addTradesToTradelist", requestBody);
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
        }
        if (copies[i].useremail === JSON.parse(localStorage.getItem('confirmOrder')).buyer) {
         flag2=1;
          try {
            const response = await axios.post("http://localhost:5000/addTradesToTradelist", requestBody2);
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
        }
      }
      if(flag===0)
      { try{
        const response = await axios.post("http://localhost:5000/inserttrade", requestBody);
    console.log(response.data);
    const data= response.data
      if(!data.acknowledged)
      {
          toast.error("Could not add book");
          return;
      }
   
      toast.success("Successfully added the book");
    // Process the data here
  } catch (error) {
    console.error('AxiosError:', error);
    if (error.response) {
      console.log('Error response:', error.response.data);
    }
  }
    }
    if(flag2===0)
    { try{
      const response2 = await axios.post("http://localhost:5000/inserttrade", requestBody2);
  console.log(response2.data);
  const data= response2.data
    if(!data.acknowledged)
    {
        toast.error("Could not add book");
        return;
    }
 
    toast.success("Successfully added the book");
  // Process the data here
} catch (error) {
  console.error('AxiosError:', error);
  if (error.response) {
    console.log('Error response:', error.response.data);
  }
}
  }
  }
   
    catch (error) {
      console.error('Error:', error);
      // alert('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    }
  };

  const fetchData = async () => {
    try {
      const title = JSON.parse(localStorage.getItem('confirmOrder')).bookName;
      const selectedGenre = "Category";
      const selectedOwner = "Owner";
      const selectedAuthor = "Author";
  
      const res = await axios.get(`http://localhost:5000/searchByTitle?title=${title}&genre=${selectedGenre}&owner=${selectedOwner}&author=${selectedAuthor}`);
      const book = res.data;
  
      const email = JSON.parse(localStorage.getItem('confirmOrder')).buyer;
      // Correct the interpolation in the URL here
      //  const userRes = await axios.get(`http://localhost:5000/getUser/${email}`);
      //  const buyer = userRes.data;
  
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
    console.log(image);
    fetchData();
  }, [author,buyer]);
  
  return (
    <div className="confirm-order-page">
    <div className="overlap-wrapper">
      <div className="overlap">
        <div className="rectangle" />
        <div className="nav-bg">
          <div className="overlap-group">
          <img className="nav-bg" alt="Nav bg" src="nav-bg.png" />
          <div className="book-cycle" onClick={Call_Home}>Bookcycle</div>
          </div>
        </div>
        <div className="div" />
        <div>
        <div className="frame">
          <div className="rectangle-2" />
        </div>
        <div className="text-wrapper">Confirm Order</div>
        <div className="form-control">Sell To:</div>
        <div className="frame-2">
          <div className="paradoxical-sajid-wrapper">
            <img className="paradoxical-sajid" alt="Paradoxical sajid" src={image} />
          </div>
          <div className="form-control-2">Book:</div>
          <div className="form-control-3">Author:</div>
          <div className="form-control-13"> Price:</div>
          <div className="form-control-wrapper">
            <div className="form-control-4">{JSON.parse(localStorage.getItem('confirmOrder')).bookName}</div>
          </div>
          <div className="div-wrapper">
            <div className="form-control-4">{author}</div>
          </div>
        </div>
        <div className="frame-14">
            <div className="form-control-4">{JSON.parse(localStorage.getItem('confirmOrder')).price}</div>
          </div>
        <div className="frame-3">
          <div className="frame-4">
            <div className="form-control-4">{JSON.parse(localStorage.getItem('confirmOrder')).buyer}</div>
          </div>
          <div className="frame-5">
            <div className="frame-6">
              <div className="form-control-4">5 Star</div>
            </div>
            <div className="overlap-group-2">
              <div className="frame-7" />
              <div className="frame-8" />
              <div className="frame-9" />
              <div className="frame-10" />
              <div className="frame-11" />
            </div>
          </div>
        </div>
        <button className="frame-12" type="submit"  onClick={HandleConfirmRequest}>
          <div className="text-wrapper-2">Confirm Request</div>
        </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Confirmorder;
