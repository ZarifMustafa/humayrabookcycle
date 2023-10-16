import { ToastContainer } from 'react-toastify';
import './App.css';
import Thankucreating from './components/thankucreating/Thankucreating';
import Tradelist from './components/tradelist/Tradelist';
import Profile from './components/profile/Profile';
import Login2 from './components/login2/Login2';
import 'react-toastify/dist/ReactToastify.css';
import Bookdetails from './components/bookdetails/Bookdetails';
import Homepage from './components/homepage/Homepage';
import Confirmorder from './components/confirmorder/Confirmorder';
import Confirmborrow from './components/confirmborrow/Confirmborrow';
import Buypage from './components/buypage/Buypage';
import Borrowpage from './components/borrowpage/Borrowpage';
import Buyrequest from './components/buyrequest/Buyrequest';
import Borrowrequest from './components/borrowrequest/Borrowrequest';
import Register from './components/register/Register';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
     <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route exact path="/tradelist" element={<Tradelist/>} />
            <Route exact path="/bookdetails" element={<Bookdetails/>} />
            <Route exact path="/thankucreating" element={<Thankucreating/>} />
            <Route exact path="/confirmorder" element={<Confirmorder/>} />
            <Route exact path="/confirmborrow" element={<Confirmborrow/>} />
            <Route exact path="/buypage" element={<Buypage/>} />
            <Route exact path="/borrowpage" element={<Borrowpage/>} />
            <Route exact path="/buyrequest" element={<Buyrequest/>} />
            <Route exact path="/borrowrequest" element={<Borrowrequest/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/login2" element={<Login2/>} />
           </Routes>
           <ToastContainer/>
        </div>

     </Router>
    </div>
  );
}

export default App;