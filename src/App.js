// FINNHUB CAN ONLY DO MAX OF 30 REQUESTS PER MINUTE OF API...
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Account from "./components/Account";
import AlertMsg from "./components/AlertMsg";
import Edit from "./components/Edit";
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
    
    let navigate = useNavigate
    const [loggedIn, setLoggedIn] = useState(false)
    const [id, setId] = useState(null)
    const [ticker, setTicker] = useState('')
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
        setLoggedIn(false)
        navigate('/login')
    }
    
    // LATER: if user loggedin, then hide homepage, signup, login, etc. if logged out, hide account page, stock, trade, etc
    return (
        <>
            <Navbar loggedIn={loggedIn} />
            <br />
            <div className="container ">
            {message ? <AlertMsg flashMsg={flashMsg} message={message} category={category} /> : null }
                {/* <h1 className="col ">Hello </h1> */}
                <Routes >
                    <Route path='/' element={<Home />} />
                    {/* if user not signed up, show signup page */}
                    <Route path='/signup' element={<Signup flashMsg={flashMsg} />} />
                    {/* if user not logged in, show login page */}
                    <Route path='/login' element={<Login flashMsg={flashMsg} login={login} loggedIn={loggedIn} />} />

                    <Route path='/portfolio' element={<Portfolio loggedIn={loggedIn} ticker={ticker} changeTicker={changeTicker} />} />
                    <Route path='/search' element={<Search changeTicker={changeTicker} />} />
                    <Route path='/account' element={<Account logout={logout} />} />
                    <Route path='/edit' element={<Edit />} />

                    <Route path='/stock' element={<Stock ticker={ticker} />} />
                    <Route path='/trade' element={<Trade ticker={ticker} userId={userId} id={id} />} />
                </Routes>
            </div>
        </>
    );
}


export default App;