import './tradelist.css';


function Tradelist() {
  return (
    <div className="trade-list-page">
    <div className="overlap-wrapper">
      <div className="overlap">
        <div className="nav-bg">
          <div className="overlap-group">
          <img className="nav-bg" alt="Nav bg" src="nav-bg.png" />
            <div className="book-cycle">Bookcycle</div>
          </div>
        </div>
        <div className="rectangle" />
        <div className="div" />
        <div className="author-btn">
          <div className="overlap-2">
            <div className="drop-down">
              <div className="overlap-group-2">
              <select id="author" className="input" name="author">
                    <option value="All">All</option>
                    <option value="Bought">Bought</option>
                    <option value="Borrowed">Borrowed</option>
                    <option value="Sold">Sold</option>
                    <option value="Lent">Lent</option>
                  </select>
                  <span class="dropdown-arrow"></span>

              </div>
            </div>
            <div className="text-wrapper">Author</div>
          </div>
        </div>
        <div className="group">
          <div className="overlap-3">
            <div className="form-control">Buyer:</div>
            <div className="form-control-2">Trading ID:</div>
            <div className="form-control-3">Book Name:</div>
            <div className="form-control-4">Price:</div>
            <div className="form-control-5">Date:</div>
            <div className="frame">
              <div className="form-control-6">Syeda Raisa Rahman</div>
            </div>
            <div className="form-control-wrapper">
              <div className="form-control-6">Harry Porter</div>
            </div>
            <div className="div-wrapper">
              <div className="form-control-6">T000163</div>
            </div>
            <div className="frame-2">
              <div className="form-control-6">269.00</div>
            </div>
            <div className="frame-3">
              <div className="form-control-6">08/10/2023</div>
            </div>
            <div className="text-wrapper-2">Sold</div>
          </div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-4">
            <div className="form-control">Borrower:</div>
            <div className="form-control-2">Book Name:</div>
            <div className="form-control-3">Price:</div>
            <div className="form-control-4">Trading ID:</div>
            <div className="form-control-5">Remaining Time:</div>
            <div className="form-control-7">Date:</div>
            <div className="frame-4">
              <div className="form-control-6">Zarif Zeisan Mustafa</div>
            </div>
            <div className="frame-5">
              <div className="form-control-6">Paradoxical Sajid</div>
            </div>
            <div className="frame-6">
              <div className="form-control-6">T000288</div>
            </div>
            <div className="frame-7">
              <div className="form-control-6">399.00</div>
            </div>
            <div className="frame-8">
              <div className="form-control-6">25 Days</div>
            </div>
            <div className="frame-9">
              <div className="form-control-6">08/10/2023</div>
            </div>
            <div className="text-wrapper-2">Lent</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Tradelist;