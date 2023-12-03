import { useNavigate,useParams } from "react-router";
import "./readpage.css";
import { useState, useEffect } from "react";
import { findBookToFind, setBookToFind } from '../LocalStorage/LocalStorage.js';

function Readpage() {
  const navigate= useNavigate();
  const [currentBook, setCurrentBook] = useState(null);
  const {bookId} = useParams();

  useEffect(() => {
    console.log("Component Mounted");
    const bookToFind = findBookToFind();
    console.log("Book To Find:", bookToFind);
  
    if (bookToFind) {
      const book = bookToFind.find((book) => book._id === bookId)
      console.log("Book Found",book);
      setCurrentBook(book);
    }
  }, []);
  
  function Call_LogIn() {
    navigate('/login2');
  }

  function Call_SignUp() {

    navigate('/Register');
  }

  function Call_BookDetails() {
    navigate('/bookdetails');
  }

  const call_addbook = () => {
    navigate("/addBook");
  }

  // if(!currentBook) return <>Loading...</>;

  return (
    <div>
      <div className="read-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="nav-bg">
            <div className="overlap-group">
            <img className="nav-bg" alt="Nav bg" src="/img/NavBg.png" />
              <div className="book-cycle">Bookcycle</div>
            </div>
          </div>
          <div className="rectangle" />
          <div className="div" />
          <div className="rectangle-2" />
          <iframe className="paradoxical-sajid" alt="Paradoxical sajid" src={currentBook?.bookpdf} />
          <div className="group">
            <div className="overlap-2">
              <div className="form-control">Book:</div>
              <div className="text-wrapper">Author:</div>
              <div className="form-control-2">Year:</div>
              <div className="frame">
                <div className="form-control-3">{currentBook?.author}</div>
              </div>
              <div className="form-control-wrapper">
                <div className="form-control-3">{currentBook?.year}</div>
              </div>
              <div className="frame-2">
                <div className="div-wrapper">
                  <div className="form-control-3">{currentBook?.rating.toFixed(2)} Star</div>
                </div>
                <div className="overlap-group-2">
                  {
                    // show star based on rating
                    // make the currentBook?.rating integer
                    
                    [...Array(Math.ceil(currentBook?.rating) || 0)].map((e, i) => (
                      <div className={`frame-${i+3}`} key={i} />
                    ))
                  }
                </div>
              </div>
              <img className="frame-8" src={currentBook?.image} />
              <div className="frame-9">
                <div className="form-control-4">{currentBook?.title}</div>
              </div>
            </div>
          </div>
          <div className="log-in-btn">
            <div className="rubaba-hadiel-wrapper">
              <div className="rubaba-hadiel">Rubaba Hadiel</div>
            </div>
          </div>
          <div className="overlap-group-wrapper">
            <div className="log-out-wrapper">
              <div className="log-out">Log Out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Readpage;