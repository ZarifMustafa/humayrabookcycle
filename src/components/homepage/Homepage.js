import { useNavigate } from "react-router";
import "./homepage.css";
import { toast } from "react-toastify";

function Homepage() {
    const navigate=useNavigate();

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

  const requestToLogin = () => {
    toast.error("Please login first");
  }
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
            <button className="sign-up-btn" onClick={Call_SignUp}>
              <div className="overlap-group">
                <div className="text-wrapper-2">Sign Up</div>
              </div>
            </button>
            <div className="log-in-btn" onClick={Call_LogIn}>
              <div className="overlap-group">
                <div className="text-wrapper-3">Log In</div>
              </div>
            </div>
            <div className="add-book-btn" onClick={call_addbook}>
              <div className="overlap-group">
                <div className="text-wrapper-3"></div>
              </div>
            </div>
            <div className="author-btn">
              <div className="overlap-2">
                <div className="text-wrapper-4">
                  <select id="author" className="input" name="author">
                    <option value="Author">Author</option>
                    <option value="Robindranath Tagore">
                      Robindranath Tagore
                    </option>
                    <option value="Kazi Nazrul Islam">Kazi Nazrul Islam</option>
                    <option value="Ayman Sadiq">Ayman Sadiq</option>
                    <option value="Humayun Ahmed">Humayun Ahmed</option>
                    <option value="Arif Azad">Arif Azad</option>
                    <option value="Md Zafor Iqbal">Md Zafor Iqbal</option>
                    <option value="William Shakespear">
                      William Shakespear
                    </option>
                    <option value="Anisul Haque">Anisul Haque</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="category-btn">
              <div className="overlap-3">
                <div className="text-wrapper-3">
                  <select id="category" className="input" name="category">
                    <option value="Category">Category</option>
                    <option value="Novel">Novel</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Islamic Books">Islamic Books</option>
                    <option value="Biography">Biography</option>
                    <option value="Kids">Kids</option>
                    <option value="Computer">Computer</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="owner-BTN">
              <div className="overlap-3">
                <div className="owner">
                  <select id="owner" className="input" name="owner">
                    <option value="owner">Owner</option>
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
                    font-family= "Poppins-Bold"

                  >
                    <option value="publications">Publications</option>
                    <option value="Panjery">Panjery</option>
                    <option value="Tamrolipi">Tamrolipi</option>
                  </select>
                </div>
              </div>
            </div>
            <input
              type="text"
              id="searchInput"
              className="search-bar"
              placeholder="Search"
              oninput="performSearch(this.value)"
              onClick={requestToLogin}
            />
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
              <div className="quran" onClick={requestToLogin}>
                <div className="demo-button-groups">
                  <div className="author-btn-2">
                    <div className="overlap-group-4">
                      <div className="text-wrapper-7">Read</div>
                    </div>
                  </div>
                  <div className="author-btn-3">
                    <div className="overlap-6">
                      <div className="text-wrapper-8">Buy</div>
                    </div>
                  </div>
                  <div className="author-btn-4">
                    <div className="overlap-7">
                      <div className="text-wrapper-9">Borrow</div>
                    </div>
                  </div>
                </div>
                <img className="img-2" src="img/AlQuranCover.png" />
                <div className="al-quran">Al-quran</div>
              </div>
              <div className="vallage-na" onClick={requestToLogin}>
                <div className="demo-button-groups-2">
                  <div className="author-btn-2">
                    <div className="overlap-group-4">
                      <div className="text-wrapper-7">Read</div>
                    </div>
                  </div>
                  <div className="author-btn-3">
                    <div className="overlap-6">
                      <div className="text-wrapper-8">Buy</div>
                    </div>
                  </div>
                  <div className="author-btn-4">
                    <div className="overlap-7">
                      <div className="text-wrapper-9">Borrow</div>
                    </div>
                  </div>
                </div>
                <div className="text-wrapper-10">Vallage Na</div>
                <img className="element" src="img/VallageNaCover.png" />
              </div>
              <div className="sajid" onClick={requestToLogin}>
                <div className="demo-button-groups-3">
                  <div className="author-btn-2">
                    <div className="overlap-group-4">
                      <div className="text-wrapper-7">Read</div>
                    </div>
                  </div>
                  <div className="author-btn-3">
                    <div className="overlap-6">
                      <div className="text-wrapper-8">Buy</div>
                    </div>
                  </div>
                  <div className="author-btn-4">
                    <div className="overlap-7">
                      <div className="text-wrapper-9">Borrow</div>
                    </div>
                  </div>
                </div>
                <div className="paradoxical-sajid">Paradoxical Sajid</div>
                <img
                  className="paradoxical-sajid-2"
                  src="img/SajidCover.png"
                  onClick={Call_BookDetails}
                />
              </div>
              <div className="nimikh-pane" onClick={requestToLogin}>
                <div className="demo-button-groups-4">
                  <div className="author-btn-2">
                    <div className="overlap-group-4">
                      <div className="text-wrapper-7">Read</div>
                    </div>
                  </div>
                  <div className="author-btn-3">
                    <div className="overlap-6">
                      <div className="text-wrapper-8">Buy</div>
                    </div>
                  </div>
                  <div className="author-btn-4">
                    <div className="overlap-7">
                      <div className="text-wrapper-9">Borrow</div>
                    </div>
                  </div>
                </div>
                <div className="nimikh-paane">Nimikh Paane</div>
                <img className="element-adad" src="img/NimikhePaneCover.png" />
              </div>
              <div className="golpo-guccho" onClick={requestToLogin}>
                <div className="demo-button-groups-4">
                  <div className="author-btn-2">
                    <div className="overlap-group-4">
                      <div className="text-wrapper-7">Read</div>
                    </div>
                  </div>
                  <div className="author-btn-3">
                    <div className="overlap-6">
                      <div className="text-wrapper-8">Buy</div>
                    </div>
                  </div>
                  <div className="author-btn-4">
                    <div className="overlap-7">
                      <div className="text-wrapper-9">Borrow</div>
                    </div>
                  </div>
                </div>
                <div className="golpoguchcho" onClick={requestToLogin}>
                  Golpo
                  <br />
                  guchcho
                </div>
                <img className="download" src="img/GolpoGucchoCover.png" />
              </div>
              <div className="batman">
                <div className="demo-button-groups-4">
                  <div className="author-btn-2">
                    <div className="overlap-group-4">
                      <div className="text-wrapper-7">Read</div>
                    </div>
                  </div>
                  <div className="author-btn-3">
                    <div className="overlap-6">
                      <div className="text-wrapper-8">Buy</div>
                    </div>
                  </div>
                  <div className="author-btn-4">
                    <div className="overlap-7">
                      <div className="text-wrapper-9">Borrow</div>
                    </div>
                  </div>
                </div>
                <div className="BATMAN" onClick={requestToLogin}>Batman</div>
                <img className="img-2" src="img/BatmanCover.png" />
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

export default Homepage;