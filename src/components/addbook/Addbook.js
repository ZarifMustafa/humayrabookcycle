import { useState } from "react";
import "./addbook.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Addbook() {
  const [name, setname] = useState("");
  const [catagory, setCatagory] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [sellingprice, setsellingprice] = useState("");
  const [lendingPrice, setlendingPrice] = useState("");
  const [duration, setduration] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [rating, setrating] = useState();
  const navigate = useNavigate();

  const imageStorageKey = "3ace044b7c7d9d5697f7eb8c463d2b4a";

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFileContent(file);

    const formData = new FormData();
    formData.append("image", file);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const imgData = await response.json();

      if (imgData.success) {
        const copiesData = [
          { sellPrice: sellingprice * 1, lendPrice: lendingPrice * 1 },
          // ... more copies data
        ];

        const requestBody = {
          title: name,
          author: author,
          genres: Array.isArray(catagory) ? catagory : [catagory],
          rating: parseFloat(rating),
          pages: parseInt(pages, 10),
          image: imgData.data.url,
          price: 0,
          reviews: [
            {
              name: "Shayla",
              comment: "Good",
            },
          ],
          copies: copiesData.map((copy) => ({
            owner: JSON.parse(localStorage.getItem("currentUser")).email,
            current_holder: JSON.parse(localStorage.getItem("currentUser"))
              .email,
            selling_price: copy.sellPrice * 1,
            rental_price: copy.lendPrice * 1,
          })),
        };

        const requestBody2 = {
  
          title: name,
          copies: copiesData.map(copy => ({
              owner: JSON.parse(localStorage.getItem('currentUser')).email,
              current_holder: JSON.parse(localStorage.getItem('currentUser')).email,
              selling_price: copy.sellPrice * 1,
              rental_price: copy.lendPrice * 1,
          })),
        };
        try {
          const respp = await axios.get("http://localhost:5000/getBooks");
          const copies = respp.data;
          console.log("Existing copies: ");
          console.log(copies);

          var flag = 0;
          for (let i = 0; i < copies.length; i++) {
            if (copies[i].title === name) {
              flag = 1;
              try {
                const response = await axios.post(
                  "http://localhost:5000/addCopiesToBook",
                  // { title: name, copies: copiesData }
                  requestBody2
                );
                console.log("Add Copies Result:", response.data);

                const data = response.data;
                if (!data.acknowledged) {
                  toast.error("Could not add copies to the book");
                  return;
                }
                toast.success("Successfully added the book");
              } catch (error) {
                console.error("AxiosError:", error);
                if (error.response) {
                  console.log("Error response:", error.response.data);
                }
              }
            }
          }

          if (flag === 0) {
            try {
              const response = await axios.post(
                "http://localhost:5000/insertbook",
                requestBody
              );
              console.log("Insert Book Result:", response.data);

              const data = response.data;
              if (!data.acknowledged) {
                toast.error("Could not add book");
                return;
              }

              toast.success("Successfully added the book");
            } catch (error) {
              console.error("AxiosError:", error);
              if (error.response) {
                console.log("Error response:", error.response.data);
              }
            }
          }
        } catch (error) {
          console.error("AxiosError:", error);
          if (error.response) {
            console.log("Error response:", error.response.data);
          }
        }

        setTimeout(() => {
          navigate("/loginhomepagemodified");
        }, 1000);
      }
    } catch (error) {
      console.error("FetchError:", error);
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
    <div>
      <div className="buyborrowbook-page">
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="rectangle"></div>
            <img className="nav-bg" src="img/NavBg.png" />
            <div className="div"></div>
            <form className="frame" onSubmit={(e) => e.preventDefault()}>
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
                  <input className="country-input-2" type="text" placeholder="Enter No. of Pages"
                    onChange={(e) => {
                      setPages(e.target.value);
                    }}
                  >
                    {/* <div className="text-wrapper">
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
                    </div> */}
                  </input>
                  <p className="p">
                    <span className="span">Book Pages </span>{" "}
                    <span className="text-wrapper-2">*</span>
                  </p>
                </div>
                <div className="email">What is the offering?</div>
                <p className="form-control-2">
                  <span className="span">Book Author </span>{" "}
                  <span className="text-wrapper-2">*</span>
                </p>
                <input type="text" className="firstname-input-2" placeholder="Enter Author"
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                />
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
                  <div className="input-form-control-rating">
                    {/* <div className="text-wrapper">
                      <input
                        className="inputPrice"
                        type="number"
                        placeholder="Enter Duration"
                        onChange={(e) => {
                          setduration(e.target.value);
                        }}
                      />
                    </div> */}
                    <StarRating></StarRating>

                  </div>
                  <p className="form-control-4">
                    <span className="text-wrapper-3">Rating </span>{""}
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
                    <input
                      type="file"
                      id="fileInput"
                      className="file-input-group"
                      onChange={handleFileChange}
                      accept="image/jpeg, image/jpg, image/png"
                      multiple
                    />
                    <div className="supported-JPG-JPEG">
                      Supported:&nbsp;&nbsp;JPG, JPEG, PNG
                    </div>
                  </div>
                </div>
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

export default Addbook;
