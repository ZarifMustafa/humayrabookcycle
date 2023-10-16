import { useState } from "react";
import "./addbook.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Addbook() {
  const [name, setname] = useState();
  const [catagory, setCatagory] = useState();
  const [author, setAuthor] = useState();
  const [sellingprice, setsellingprice] = useState();
  const [lendingPrice, setlendingPrice] = useState();
  const [duration, setduration] = useState();
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: name,
      category: catagory,
      author: author,
      sellPrice: sellingprice *1,
      lendPrice: lendingPrice *1,
      duration: duration *1,
    };

    const respose = await axios.post("http://localhost:5000/addbook", requestBody);
    const data = respose.data;

    if(!data.acknowledged)
    {
        toast.error("Could not add book");
        return;
    }

    toast.success("Successfully added the book");

    setTimeout(()=>{
        navigate("/");
    }, 1000);

  };

  return (
    <div>
      <div className="buyborrowbook-page">
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="rectangle"></div>
            <img className="nav-bg" src="img/NavBg.png" />
            <div className="div"></div>
            <form className="frame" onSubmit={handleAdd}>
              <div className="overlap-group">
                <p className="h">Add a Book for Borrow/Buy</p>
                <div className="firstname-input">
                  <div className="text-wrapper">
                    <input
                      className="inputName"
                      type="text"
                      placeholder="Enter Book Name"
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <p className="form-control">
                  <span className="span">Book Name </span>{" "}
                  <span className="text-wrapper-2">*</span>
                </p>
                <div className="overlap-2">
                  <div className="country-input">
                    <div className="text-wrapper">
                      <select
                        className="input"
                        name="Catagory"
                        onChange={(e) => {
                          setCatagory(e.target.value);
                        }}
                      >
                        <option value="None">Select Catagory</option>
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
                  <p className="p">
                    <span className="span">Book Catagory </span>{" "}
                    <span className="text-wrapper-2">*</span>
                  </p>
                </div>
                <div className="overlap-3">
                  <div className="country-input-2">
                    <div className="text-wrapper">
                      <select
                        className="input"
                        name="Author"
                        onChange={(e) => {
                          setAuthor(e.target.value);
                        }}
                      >
                        <option value="None">Select Author</option>
                        <option value="Rabindranath">
                          Rabindranath Tagore
                        </option>
                        <option value="Nazrul">Kazi Nazrul Islam</option>
                        <option value="Ayman">Ayman Sadiq</option>
                        <option value="Arif">Arif Azad</option>
                        <option value="HumayunAhmed">Humayun Ahmed</option>
                        <option value="ZaforIqbal">Mohammad Zafor Iqbal</option>
                        <option value="Shakespear">William Shakespear</option>
                        <option value="Bhagat">Chetan Bhagat</option>
                        <option value="toriyama">Akira Toriyama</option>
                      </select>
                    </div>
                  </div>
                  <p className="p">
                    <span className="span">Book Author </span>{" "}
                    <span className="text-wrapper-2">*</span>
                  </p>
                </div>
                <div className="email">What is the offering?</div>
                <p className="form-control-2">
                  <span className="span">Book Type </span>{" "}
                  <span className="text-wrapper-2">*</span>
                </p>
                <p className="form-control-3">
                  <span className="span">
                    Upload the Cover Page of the Book{" "}
                  </span>{" "}
                  <span className="text-wrapper-2">*</span>
                </p>
                <div className="overlap-4">
                  <div className="input-form-control">
                    <div className="text-wrapper">
                      <input
                        className="inputPrice"
                        type="number"
                        placeholder="Enter Price"
                        onChange={(e) => {
                          setsellingprice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <p className="form-control-4">
                    <span className="text-wrapper-3">Price </span>{" "}
                    <span className="text-wrapper-4">*</span>
                  </p>
                </div>
                <div className="overlap-5">
                  <div className="input-form-control">
                    <div className="text-wrapper">
                      <input
                        className="inputPrice"
                        type="number"
                        placeholder="Enter Price"
                        onChange={(e) => {
                          setlendingPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-control-5">Price</div>
                </div>
                <div className="overlap-6">
                  <div className="input-form-control">
                    <div className="text-wrapper">
                      <input
                        className="inputPrice"
                        type="number"
                        placeholder="Enter Duration"
                        onChange={(e) => {
                          setduration(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <p className="form-control-4">
                    <span className="text-wrapper-3">Duration </span>{" "}
                    <span className="text-wrapper-4">*</span>
                  </p>
                </div>
                <div className="form-control-6">I wanna sell</div>
                <div className="form-control-7">I wanna lend</div>

                <button type="submit" className="text-wrapper-5">
                  Add your Book
                </button>
                <div className="group-wrapper">
                  <div className="group">
                    <p className="drag-your-images">
                      <span className="text-wrapper-6">
                        Drag your images here, or{" "}
                      </span>
                      <span className="text-wrapper-7" onclick="browseImages()">
                        browse
                      </span>
                    </p>
                    <div className="supported-JPG-JPEG">
                      Supported:&nbsp;&nbsp;JPG, JPEG, PNG
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  accept="image/jpeg, image/jpg, image/png"
                  multiple
                />
              </div>
            </form>
            <Link to="/hosting">
              <div className="book-cycle">Bookcycle</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addbook;