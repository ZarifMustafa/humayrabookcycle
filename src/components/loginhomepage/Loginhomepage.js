import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./loginhomepage.css";
import axios from "axios"; // Import Axios
import { findBookToFind, setBookToFind } from '../LocalStorage/LocalStorage.js';


function Loginhomepage() {
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");
  const [books, setbooks] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("Author");
  const [selectedGenre, setSelectedGenre] = useState("Category");
  const [selectedOwner, setSelectedOwner] = useState("Owner");
  const [bookToFind, setBookToFind] = useState(findBookToFind());
  const performSearch = (value2) => {
    // Your search logic here
    console.log("Performing search with value: ", value2);
    setValue(value2);
  };
  useEffect(() => {
    searchByTitle();
    console.log(books);
  }, [value,selectedAuthor,selectedGenre]);
  const navigate = useNavigate();

  function Call_LogIn() {
    navigate("/login2");
  }

  function Call_SignUp() {
    navigate("/Register");
  }

  function Call_BookDetails() {
    navigate("/bookdetails");
  }

  const call_addbook = () => {
    navigate("/addBook");
  };
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    performSearch(searchValue);
  };

  const searchByTitle = () => {
    const titleToSearch = value;
    console.log(titleToSearch, "hlkeflk");

    // Define the URL of your API endpoint
    const apiUrl = `http://localhost:5000/searchByTitle?title=${titleToSearch}&genre=${selectedGenre}&owner=${selectedOwner}&author=${selectedAuthor}`;

    // Make the GET request to the API
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the API response here
        setbooks(response.data);
        setBookToFind(response.data);
        console.log(response.data); // This will log the response data to the console
        localStorage.setItem('bookToFind',JSON.stringify(response.data));
      })
      .catch((error) => {
        // Handle any errors here
        console.error("An error occurred:", error);
      });
  };

  async function Call_Buy(title) {
    try {
      
      const response = await axios.get(`http://localhost:5000/bookByTitle/${title}`);
      const books=[];
      console.log(response.data);
      books.push(response.data);
      console.log(books);
      localStorage.setItem('bookToFind',JSON.stringify(books));  
      navigate('/buypage');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  async function Call_Borrow(title) {
    // console.log(findBookToFind());
    const response = await axios.get(`http://localhost:5000/bookByTitle/${title}`);
      const books=[];
      console.log(response.data);
      books.push(response.data);
      console.log(books);
      localStorage.setItem('bookToFind',JSON.stringify(books));
    navigate('/borrowpage');
  }
  async function Call_Read(title) {
    // console.log(findBookToFind());
    const response = await axios.get(`http://localhost:5000/bookByTitle/${title}`);
      const books=[];
      console.log(response.data);
      books.push(response.data);
      console.log(books);
      localStorage.setItem('bookToFind',JSON.stringify(books));
    navigate('/readpage');
  }
  async function Call_BookDetails(title) {
    console.log(findBookToFind());
    const response = await axios.get(import.meta.env.VITE_CURRENT_PATH +`/bookByTitle/${title}`);
      const books=[];
      console.log(response.data);
      books.push(response.data);
      console.log(books);
      localStorage.setItem('bookToFind',JSON.stringify(books));
    navigate('/bookdetails');
  }
  const BookCard = ({title, image}) => {
    return (
      <div className="quran">
        <div className="demo-button-groups">
          <div className="author-btn-2">
            <div className="overlap-group-4">
              <div className="text-wrapper-7" onClick={() => Call_Read(title)}>Read</div>
            </div>
          </div>
          <div className="author-btn-3">
            <div className="overlap-6">
              <div className="text-wrapper-8" onClick={() => Call_Buy(title)}>Buy</div>
            </div>
          </div>
          <div className="author-btn-4">
            <div className="overlap-7">
              <div className="text-wrapper-9" onClick={() => Call_Borrow(title)}>Borrow</div>
            </div>
          </div>
        </div>
        <img className="img-2" src={image} onClick={() => Call_BookDetails(title)}/>
        <div className="al-quran">{title}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="home-page">
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="rectangle"></div>
            <div className="bg-pic">
              <div className="div"></div>
            </div>
            <img className="nav-bg" src="img/NavBg.png" />
            <div className="text-wrapper">Book Cycle</div>
            <div className="share-borrow-repeat">
              Share ,borrow &amp; Repeat
            </div>
            {/* <button className="sign-up-btn" onClick={Call_SignUp}>
              <div className="overlap-group">
                <div className="text-wrapper-2">Sign Up</div>
              </div>
            </button> */}
            <div className="log-in-btn" onClick={Call_LogIn}>
              <div className="overlap-group">
                <div className="text-wrapper-3">{JSON.parse(localStorage.getItem('currentUser')).name}</div>
              </div>
            </div>
            <div className="add-book-btn" onClick={call_addbook}>
              <div className="overlap-group">
                <div className="text-wrapper-3">

                </div>
              </div>
            </div>
            <div className="author-btn">
              <div className="overlap-2">
                <div className="text-wrapper-4">
                  <select id="author" className="input" name="author" onChange={(e) => setSelectedAuthor(e.target.value)}>
                    <option value="Author">Author</option>
                    {
                      books.map((book,index) =>(
                        <option value={book.author} key={index}>{book.author}</option>
                      ))
                    }
                    
                  </select>
                </div>
              </div>
            </div>

            <div className="category-btn">
              <div className="overlap-3">
                <div className="text-wrapper-3">
                  <select id="category" className="input" name="category" onChange={(e) => setSelectedGenre(e.target.value)}>
                    <option value="Category">Category</option>
                    <option value="Novel">Novel</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Comics">Comics</option>
                    <option value="Humor">Humor</option>
                    <option value="Dystopian">Dystopian</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Political">Political</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="owner-BTN">
              <div className="overlap-3">
                <div className="owner">
                  <select id="owner" className="input" name="owner" onChange={(e) => setSelectedOwner(e.target.value)}>
                    <option value="Owner">Owner</option>
                    <option value="Zarif">Zarif</option>
                    <option value="Raisa">Raisa</option>
                    <option value="Rubaid">Rubaid</option>
                    <option value="Rubaba">Rubaba</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="publications-btn">
              <div className="overlap-2">
                <div className="publications">
                  <select
                    id="publications"
                    className="input"
                    name="publications"
                    font-family="Poppins-Bold"
                  >
                    <option value="publications">Publications</option>
                    <option value="Panjery">Panjery</option>
                    <option value="Tamrolipi">Tamrolipi</option>
                  </select>
                </div>
              </div>
            </div>
            <form id="searchForm" onSubmit={handleFormSubmit}>
              <input
                type="search"
                id="searchInput"
                className="search-bar"
                placeholder="Search"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {/* <button type="submit">Submit</button> */}
            </form>

            <div id="searchResults"></div>

            <div className="rectangle-2"></div>
            <div className="frame">
              <div className="overlap-5">
                <div className="this-is-your-place">This Is Your Place</div>
                <img className="vector" src="img/Vector 5.png" />
                <img className="vector-2" src="img/Vector 3.png" />
                <p className="wanna-feel-the-smell">
                  Wanna Feel The&nbsp;&nbsp;Smell Of Books ?
                </p>
              </div>
            </div>
            <div className="demo-books">
              <div className="text-wrapper-6">Demo Books</div>

              <div className="book-holder">
                {
                  books.map((book, index) => (
                    <BookCard title={book.title} image={book.image} key={index}/>
                  ))
                }
              </div>
            </div>
            <div className="footer-UI">
              <div className="about-us">ABOUT US</div>
              <div className="privacy-policy">PRIVACY POLICY</div>
              <div className="disclaimer">DISCLAIMER</div>
              <div className="contact-us">CONTACT US</div>
              <div className="help">HELP</div>
              <p className="copyright-m">
                Copyright © 2020 Minimumlivingcost. All rights reserved
              </p>
              <div className="information">
                <div className="social">
                  <div className="overlap-8">
                    <div className="youtube-color">
                      <div className="img-wrapper">
                        <img className="youtube" src="img/youtube.svg" />
                      </div>
                    </div>
                    <div className="instagram-black">
                      <div className="img-wrapper">
                        <img className="img-3" src="img/instagram.svg" />
                      </div>
                    </div>
                    <div className="googleplus-black">
                      <div className="img-wrapper">
                        <img
                          className="google-plus"
                          src="img/google-plus.svg"
                        />
                      </div>
                    </div>
                    <div className="linkedin-black">
                      <div className="img-wrapper">
                        <img className="linked-in" src="img/LinkedIn.svg" />
                      </div>
                    </div>
                    <div className="facebook-black">
                      <div className="img-wrapper">
                        <img className="img-3" src="img/facebook.svg" />
                      </div>
                    </div>
                    <div className="pinterest-color">
                      <div className="img-wrapper">
                        <img className="img-3" src="img/pinterest.svg" />
                      </div>
                    </div>
                    <div className="rss-black">
                      <div className="img-wrapper">
                        <img className="img-3" src="img/RSS.svg" />
                      </div>
                    </div>
                    <div className="twitter-black">
                      <div className="img-wrapper">
                        <img className="twitter" src="img/twitter.svg" />
                      </div>
                    </div>
                  </div>
                  <div className="text-wrapper-11">Social Media</div>
                </div>
                <div className="location">
                  <p className="element-faulconer-drive">
                    New Cafetaria, MIST, Mirpur Cant, Dhaka
                  </p>
                  <div className="round-place">
                    <img className="shape" src="img/shape.svg" />
                  </div>
                </div>
                <div className="phone">
                  <div className="element-2">(123) 456-7890</div>
                  <img
                    className="facebook-black"
                    src="img/round-phone-24px.png"
                  />
                </div>
                <div className="fax">
                  <div className="element-2">(123) 456-7890</div>
                  <div className="round-local">
                    <img className="shape-2" src="img/shape-2.svg" />
                  </div>
                </div>
              </div>
              <div className="rectangle-3"></div>
            </div>
            <div className="book-cycle">Bookcycle</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginhomepage;
