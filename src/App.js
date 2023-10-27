// FINNHUB CAN ONLY DO MAX OF 30 REQUESTS PER MINUTE OF API...
// maybe worth splitting functions below 
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Account from "./components/Account";
import AlertMsg from "./components/AlertMsg";
import BarChart from "./components/BarChart";
import Edit from "./components/Edit";
import Funds from "./components/Funds";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Search from "./components/Search";
import Signup from "./components/Signup";
import Stock from "./components/Stock";
import Trade from "./components/Trade";

// NEED TO HAVE FROM BACKEND THE USER'S STOCK DATA...SO WHAT STOCKS THEY OWN, WHAT PRICE THEY BOUGHT THEM, AND HOW MANY SHARES...IN ORDER TO USE THAT DATA HERE IN THE FRONT END AND DISPLAY TO THE USER

function App() {
    
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false) // here i should check if user has a valid token, then keep them logged in, dont reset the state to false after refresh
    const [newId, setId] = useState(0)
    const [ticker, setTicker] = useState('') // NEED TO SET THIS TO LOCAL STORAGE ITEM to prevent refresh
    const [message, setMessage] = useState(null)
    const [category, setCategory] = useState(null)

    const flashMsg = (message, category) => {
        setMessage(message);
        setCategory(category);
    };
    const changeTicker = (newTicker) => {
        setTicker(newTicker)
    };
    const userId = (newId) => {
        setId(newId)
    };
    const login = () => {
        setLoggedIn(true)
    }
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('token_expiration')
        localStorage.removeItem('user_id')
        setLoggedIn(false)
        navigate('/login')
    }
    
    // if user loggedin, then hide homepage, signup, login, etc. if logged out, hide account page, stock, trade, etc
    return (
        <>
            <Navbar loggedIn={loggedIn} />
            <br />
            <div className="container ">
            {message ? <AlertMsg flashMsg={flashMsg} message={message} category={category} /> : null }
                <Routes >
                    {/* testing how barcharts work here */}
                    <Route path='/bar' element={<BarChart />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup flashMsg={flashMsg} />} />
                    <Route path='/login' element={<Login flashMsg={flashMsg} login={login} loggedIn={loggedIn} userId={userId} />} />

                    <Route path='/portfolio' element={<Portfolio loggedIn={loggedIn} ticker={ticker} changeTicker={changeTicker} newId={newId} />} />
                    <Route path='/account' element={<Account flashMsg={flashMsg} logout={logout} newId={newId} />} />
                    <Route path='/account' element={<Funds flashMsg={flashMsg} logout={logout} newId={newId} />} />
                    <Route path='/search' element={<Search changeTicker={changeTicker} />} />
                    <Route path='/edit' element={<Edit />} />
                    <Route path='/stock' element={<Stock ticker={ticker} />} />
                    <Route path='/trade' element={<Trade flashMsg={flashMsg} ticker={ticker} newId={newId} />} />
                </Routes>
            </div>
        </>
    );
}

export default App;