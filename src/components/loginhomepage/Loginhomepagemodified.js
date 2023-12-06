import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./loginhomepagemodified.css";
import axios from "axios"; // Import Axios
import { findBookToFind, setBookToFind } from '../LocalStorage/LocalStorage.js';
// import Select from 'react-select';
import arrow from "./whitedown.png"
import brownarrow from "./browndown.png"
import {motion} from "framer-motion"

function Loginhomepagemodified() {
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");
  const [books, setbooks] = useState([]);
  const [allbooks, setallbooks] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("Author");
  const [selectedGenre, setSelectedGenre] = useState("Category");
  const [selectedOwner, setSelectedOwner] = useState("Owner");
  const [bookToFind, setBookToFind] = useState(findBookToFind());

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenOwner, setIsOpenOwner] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const options = ["author 1", "author 2", "author 3", "author 4"];


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdownCategory = () => {
    setIsOpenCategory(!isOpenCategory);
  };
  const toggleDropdownOwner = () => {
    setIsOpenOwner(!isOpenOwner);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setSelectedAuthor(selectedAuthor);
    
    setIsOpen(false);
  };
  const selectOptionCategory = (option) => {
    setSelectedGenre(selectedGenre);
    setIsOpen(false);
  };

  const uniqueGenres = new Set();

  // Populate uniqueGenres with genres from the books array
  books.forEach((book) => {
    if (book.genres) {
      book.genres.forEach((genre) => uniqueGenres.add(genre));
    }
  });

  // Convert the Set back to an array
  const uniqueGenreList = Array.from(uniqueGenres);

  const performSearch = (value2) => {
    // Your search logic here
    console.log("Performing search with value: ", value2);
    setValue(value2);
  };
  useEffect(() => {
    searchByTitle();
  }, [value,selectedAuthor,selectedGenre]);
  const navigate = useNavigate();

  function Call_LogIn() {
    navigate("/login2");
  }

  function call_profile() {
    navigate("/profilemodified");
  }

  function Call_BookDetails() {
    navigate("/bookdetails");
  }

  const call_addbook = () => {
    navigate("/addbook");
  };
  const call_addbook_borrow = () => {
    navigate("/addbook");
  };
  const call_tradelist = () => {
    navigate("/tradelist");
  };
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    performSearch(searchValue);
  };


  const searchByTitle = () => {
    const titleToSearch = value;
    console.log(titleToSearch, "hlkeflk");

    // Define the URL of your API endpoint
    const apiUrl = process.env.REACT_APP_CURRENT_PATH+`/searchByTitle?title=${titleToSearch}&genre=${selectedGenre}&owner=${selectedOwner}&author=${selectedAuthor}`;

    // Make the GET request to the API
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the API response here
        setbooks(response.data);
        
        let flag=localStorage.getItem('flagForInit');
        console.log('Flag: ');
        console.log(flag);
        if(flag===null || flag==='0'){
          setallbooks(response.data);
          localStorage.setItem('flagForInit','1');
        }
        setBookToFind(response.data);
        console.log(response.data); // This will log the response data to the console
      })
      .catch((error) => {
        // Handle any errors here
        console.error("An error occurred:", error);
      });
  };

  function callBuyrequestlist() {
    navigate('/buyrequestdynamic');
  }
  function callBorrowrequestlist() {
    navigate('/borrowrequestdynamic'); 
  }

  function callLogOut() {
    navigate('/');
  }

  async function Call_Buy(title) {
    try {
      
      const response = await axios.get(process.env.REACT_APP_CURRENT_PATH+`/bookByTitle/${title}`);
      const books=[];
      console.log(response.data);
      books.push(response.data);
      console.log(books);
      localStorage.setItem('bookToFind',JSON.stringify(books));  
      navigate('/buypagemodified');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  async function Call_Borrow(title) {
    // console.log(findBookToFind());
    const response = await axios.get(process.env.REACT_APP_CURRENT_PATH+`/bookByTitle/${title}`);
      const books=[];
      console.log(response.data);
      books.push(response.data);
      console.log(books);
      localStorage.setItem('bookToFind',JSON.stringify(books));
    navigate('/borrowpage');
  }
  // async function Call_Read(title) {
  //   // console.log(findBookToFind());
  //   const response = await axios.get(`http://localhost:5000/bookByTitle/${title}`);
  //     const books=[];
  //     console.log(response.data);
  //     books.push(response.data);
  //     console.log(books);
  //     localStorage.setItem('bookToFind',JSON.stringify(books));
  //   navigate('/readpage');
  // }
  async function Call_ReadPage(_id,title) {
    const response = await axios.get(process.env.REACT_APP_CURRENT_PATH+`/bookByTitle/${title}`);
      const books=[];
      console.log(response.data);
      books.push(response.data);
      console.log(books);
      localStorage.setItem('bookToFind',JSON.stringify(books));
    navigate(`/readpage/${_id}`);
  }
  async function Call_BookDetails(title) {
    console.log(findBookToFind());
    const response = await axios.get(process.env.REACT_APP_CURRENT_PATH+`/bookByTitle/${title}`);
      const books=[];
      console.log(response.data);
      books.push(response.data);
      console.log(books);
      localStorage.setItem('bookToFind',JSON.stringify(books));
    navigate('/bookdetails');
  }
  const BookCard = ({ title, image, _id }) => {
    const maxTitleLength = 10;
    const truncatedTitle = title.length > maxTitleLength ? title.slice(0, maxTitleLength) + "..." : title;
  
    return (
      <div className="bookcard">
        <img className="book-image" src={image} onClick={() => Call_BookDetails(title)} />
        <div className="book-title">{truncatedTitle}</div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.9 }}
          className="read"
          // onClick={() => Call_Read(title)}
          onClick={()=>Call_ReadPage(_id,title)}
        >
          Read
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.9 }}
          className="buy"
          onClick={() => Call_Buy(title)}
        >
          Buy
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.9 }}
          className="borrow"
          onClick={() => Call_Borrow(title)}
        >
          Borrow
        </motion.button>
      </div>
    );
  };
  
  const handleHover = () => {
    const overlapGroupWrapper = document.querySelector('.overlap-group-wrapper');
    if (overlapGroupWrapper) {
      overlapGroupWrapper.style.transform = 'scale(1.2)';
    }
  };

  const handleLeave = () => {
    const overlapGroupWrapper = document.querySelector('.overlap-group-wrapper');
    if (overlapGroupWrapper) {
      overlapGroupWrapper.style.transform = 'scale(1)';
    }
  };

  return (
    
    <div className="hosting-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="rectangle" />
          <div className="bg-pic">
            <div className="div" />
          </div>
          <div className="text-wrapper">Book Cycle</div>
          <div className="share-borrow-repeat">Share ,borrow &amp; Repeat</div>
          <img className="nav-bg" alt="Nav bg" src="nav-bg.png" />
          <div className="log-in-btn" onClick={callLogOut}>
            <div className="overlap-group">
              <div className="log-out">Log Out</div>
            </div>
          </div>
          <div className="book-cycle">Bookcycle</div>
          <div className="overlap-group-wrapper" onMouseEnter={handleHover} onMouseLeave={handleLeave} onClick={call_profile}>
            <div className="rubaba-hadiel-wrapper">
              <div className="rubaba-hadiel">{JSON.parse(localStorage.getItem('currentUser')).name}</div>
            </div>
          </div>
          
            {/* <div className="dropdown-button">
                <button onClick={toggleDropdown} className="button">
                    {selectedAuthor || "Author"}
                    <img src ={arrow} className="w-1" style={{"margin-left":"50px"}} />
                </button>
                {isOpen && (
                    <ul className="dropdown-menu" onChange={(e) => setSelectedAuthor(e.target.value)}>
                    {books.map((book,index) => (
                        <li value={book.author} key={index} onClick={() => selectOption(book.author)} onChange={(e) => setSelectedGenre(e.target.value)}>
                        {book.author}
                        </li>
                    ))}
                    </ul>
                )}
            </div> */}
            
            <div className="dropdown-button">
              
                  <select id="author" className="button" name="author" onChange={(e) => setSelectedAuthor(e.target.value)}>
                    <option value="Author">Author</option>
                    {
                      allbooks.map((book,index) =>(
                        <option value={book.author} key={index}>{book.author}</option>
                      ))
                    }
                  </select>
            </div>
            
            <select onChange={(e) => setSelectedGenre(e.target.value)}>
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


            {/* <div className="dropdown-button-category">
            <button onClick={toggleDropdownCategory} className="button-category">
                {selectedGenre || "Category"}
                <img src={brownarrow} className="w-1" style={{ "marginLeft": "50px" }} />
            </button>
            {isOpenCategory && (
                <ul className="dropdown-menu-category">
                {uniqueGenreList.map((genre, index) => (
                    <li value={genre} key={index} onClick={() => selectOptionCategory(genre)}>
                    {genre}
                    </li>
                ))}
                </ul>
            )}
            </div> */}
            <div className="dropdown-button-category">
            <select id="category" className="button-category" name="category" onChange={(e) => setSelectedGenre(e.target.value)}>
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
            
        <div className="owner-BTN">
          <div className="overlap-3">
            <div className="drop-down-2">
              <div className="overlap-group-2">
                <img className="line" alt="Line" src="img/line-2-2.svg" />
                <img className="img" alt="Line" src="img/line-3-3.svg" />
              </div>
            </div>
            <div className="owner">Owner</div>
          </div>
        </div>
        <div className="publications-btn">
          <div className="overlap-2">
            <div className="drop-down-3">
              <div className="overlap-group-2">
                <img className="line" alt="Line" src="img/line-2-3.svg" />
                <img className="img" alt="Line" src="img/line-3-4.svg" />
              </div>
            </div>
            <div className="publications">Publications</div>
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
          <div className="rectangle-2" />
          <div className="text-wrapper-4">Demo Books</div>
          <div className="frame-frame">
              <div className="overlap-5-frame">
                <div className="this-is-your-place-frame">This Is Your Place</div>
                <img className="vector-frame" src="img/Vector 5.png" />
                <img className="vector-2-frame" src="img/Vector 3.png" />
                <p className="wanna-feel-the-smell-frame">
                  Wanna Feel The&nbsp;&nbsp;Smell Of Books ?
                </p>
              </div>
            </div>
          <div className="demo-books">
              <div className="text-wrapper-6">Demo Books</div>

              <div className="book-holder">
                {
                  books.map((book, index) => (
                    <BookCard title={book.title} image={book.image} _id={book._id} key={index}/>
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
            <p className="copyright-m">Copyright 漏 2020 Minimumlivingcost. All rights reserved</p>
            <div className="information">
              <div className="social">
                {/* <div className="overlap-7"> */}
                  <div className="youtube-color">
                    <div className="img-wrapper">
                      <img className="youtube" alt="Youtube" src="img/youtube.svg" />
                    </div>
                  </div>
                  <div className="instagram-black">
                    <div className="img-wrapper">
                      <img className="img-3" alt="Instagram" src="img/instagram.svg" />
                    </div>
                  </div>
                  <div className="googleplus-black">
                    <div className="img-wrapper">
                      <img className="google-plus" alt="Google plus" src="img/google-plus.svg" />
                    </div>
                  </div>
                  <div className="linkedin-black">
                    <div className="img-wrapper">
                      <img className="linked-in" alt="Linked in" src="img/linked-in.svg" />
                    </div>
                  </div>
                  <div className="group">
                    <div className="round-phone">
                      <div className="img-wrapper">
                        <img className="img-3" alt="Facebook" src="img/facebook.svg" />
                      </div>
                    </div>
                    <div className="pinterest-color">
                      <div className="img-wrapper">
                        <img className="img-3" alt="Pinterest" src="img/pinterest.svg" />
                      </div>
                    </div>
                    <div className="rss-black">
                      <div className="img-wrapper">
                        <img className="img-3" alt="Rss" src="img/RSS.svg" />
                      </div>
                    </div>
                  </div>
                  <div className="twitter-black">
                    <div className="img-wrapper">
                      <img className="twitter" alt="Twitter" src="img/twitter.svg" />
                    </div>
                  </div>
                {/* </div> */}
                <div className="text-wrapper-8">Social Media</div>
              </div>
              <div className="location">
                <p className="element-faulconer-drive">New Cafetaria, MIST, Mirpur Cant, Dhaka</p>
                <div className="round-place">
                  <img className="shape" alt="Shape" src="img/shape.svg" />
                </div>
              </div>
              <div className="phone">
                <div className="element-2">(123) 456-7890</div>
                <img className="round-phone" alt="Round phone" src="img/round-phone-24px.png" />
              </div>
              <div className="fax">
                <div className="element-2">(123) 456-7890</div>
                <div className="round-local">
                  <img className="shape-2" alt="Shape" src="img/shape-2.svg" />
                </div>
              </div>
            </div>
            <div className="rectangle-3" />
          </div>
          <div className="add-BTN" onClick={call_addbook} />
          <div className="add-a-book-for" onClick={call_addbook}> 
            Add A Book <br/> for Buy
          </div>
          {/* <div className="add-BTN-borrow" onClick={call_addbook_borrow} />
          <div className="add-a-book-for-borrow">
            Add A Book <br/> for Borrow
          </div> */}
          <div className="check-BTN" onClick={call_tradelist} />
          <p className="let-others-see">
            Let Others See &amp; Explore
            <br />
            your Collection
          </p>
          <div className="check-my-collection" onClick={call_tradelist}>
            My Trades
          </div>
          <p className="show-my-books-bought">
            Show My Books <br />
            bought/borrowed From
            <br />
            others
          </p>
          <div className="add-BTN-2" onClick={callBuyrequestlist} />
          <div className="requests-for-borrow" onClick={callBuyrequestlist} >
            Requests <br />
            for Buy
          </div>
          <div className="show-my-buy-borrow">
            Show My
            <br />
            buy/borrow
            <br />
            requests
          </div>
        </div>
        <div className="add-BTN-7" onClick={callBorrowrequestlist} />
          <div className="requests-for-borrow2" onClick={callBorrowrequestlist}>
            Requests <br />
            for Borrow
          </div>
         
        </div>
      </div>
   
  );
};

export default Loginhomepagemodified;