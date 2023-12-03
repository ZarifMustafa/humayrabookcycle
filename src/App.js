import { ToastContainer } from 'react-toastify';
import './App.css';
import Thankucreating from './components/thankucreating/Thankucreating';
import Tradelist from './components/tradelist/Tradelist';
import Profile from './components/profile/Profile';
import Profilemodified from './components/profile/Profilemodified';
import Login2 from './components/login2/Login2';
import 'react-toastify/dist/ReactToastify.css';
import Bookdetails from './components/bookdetails/Bookdetails';
import Homepage from './components/homepage/Homepage';
import Confirmorder from './components/confirmorder/Confirmorder';
import Confirmborrow from './components/confirmborrow/Confirmborrow';
import Buypage from './components/buypage/Buypage';
import Buypagemodified from './components/buypage/Buypagemodified';
import Borrowpage from './components/borrowpage/Borrowpage';
import Buyrequest from './components/buyrequest/Buyrequest';
import Borrowrequest from './components/borrowrequest/Borrowrequest';
import Register from './components/register/Register';
import Loginhomepage from './components/loginhomepage/Loginhomepage';
import Loginhomepagemodified from './components/loginhomepage/Loginhomepagemodified';
import Test from './components/loginhomepage/Test';
import Readpage from './components/Readpage/Readpage.js';
import Buyrequestlist from './components/Buyrequestlist/Buyrequestlist';
import Buyrequestdynamic from './components/Buyrequestlist/Buyrequestdynamic';
import Addbook from './components/addbook/Addbook';
import Addbookborrow from './components/addbookborrow/Addbookborrow';
import Borrowrequestdynamic from './components/borrowrequestlist/Borrowrequestdynamic';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
     <Router>
        {/* <div style = {{height:"100%"}}> */}
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/loginhomepage" element={<Loginhomepage/>} />
            <Route exact path="/loginhomepagemodified" element={<Loginhomepagemodified/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route exact path="/profilemodified" element={<Profilemodified/>} />
            <Route exact path="/tradelist" element={<Tradelist/>} />
            <Route exact path="/bookdetails" element={<Bookdetails/>} />
            <Route exact path="/thankucreating" element={<Thankucreating/>} />
            <Route exact path="/confirmorder" element={<Confirmorder/>} />
            <Route exact path="/confirmborrow" element={<Confirmborrow/>} />
            <Route exact path="/buypage" element={<Buypage/>} />
            <Route exact path="/buypagemodified" element={<Buypagemodified/>} />
            <Route exact path="/borrowpage" element={<Borrowpage/>} />
            <Route exact path="/buyrequest" element={<Buyrequest/>} />
            <Route exact path="/borrowrequest" element={<Borrowrequest/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/login2" element={<Login2/>} />
            <Route exact path="/test" element={<Test/>} />
            {/* <Route exact path="/readpage" element={<Readpage/>} /> */}
            <Route exact path="/readpage/:bookId" element={<Readpage/>} />
            <Route exact path="/buyrequestlist" element={<Buyrequestlist/>} />
            <Route exact path="/buyrequestdynamic" element={<Buyrequestdynamic/>} />
            <Route exact path="/addbook" element={<Addbook/>} />
            <Route exact path="/addbookborrow" element={<Addbookborrow/>} />
            <Route exact path="/borrowrequestdynamic" element={<Borrowrequestdynamic/>} />
           </Routes>
           <ToastContainer/>
        {/* </div> */}

     </Router>
    </div>
  );
}

export default App;