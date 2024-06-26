// FINNHUB CAN ONLY DO MAX OF 30 REQUESTS PER MINUTE OF API...
// maybe worth splitting functions below
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import Account from "./components/Account";
import AlertMsg from "./components/AlertMsg";
import BarChart from "./components/extra/BarChart";
import Edit from "./components/extra/Edit";
import Funds from "./components/Funds";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Search from "./components/Search";
import Signup from "./components/Signup";
import Stock from "./components/Stock";
import Trade from "./components/Trade";
import { urlMain } from "./Keys";
import Transactions from "./components/Transactions";

// NEED TO HAVE FROM BACKEND THE USER'S STOCK DATA...SO WHAT STOCKS THEY OWN, WHAT PRICE THEY BOUGHT THEM, AND HOW MANY SHARES...IN ORDER TO USE THAT DATA HERE IN THE FRONT END AND DISPLAY TO THE USER

function App() {

    // LOOK INTO State Management: It can manage global application state if you're using a state management library like Redux or React Context API. It often initializes the state and provides it to child components.
    // SET USER INFO AND PASS INTO CHILDREN COMPONENTS
    // THIS NOT WORKING, STILL TAKES AN ADDITIONAL RENDER TO UPDATE USER'S INFO...useEffect only triggers once, and not when any component renders....
    // 1
    const [info, setinfo] = useState({
        "cash": 0.00,
        "total_transactions": 0
    })
    // 2
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false) // here i should check if user has a valid token, then keep them logged in, dont reset the state to false after refresh
    // 3
    const [newId, setId] = useState(localStorage.getItem('user_id'))
    // 4
    const [ticker, setTicker] = useState('') // NEED TO SET THIS TO LOCAL STORAGE ITEM to prevent refresh?
    // 5
    const [message, setMessage] = useState(null)
    // 6
    const [category, setCategory] = useState(null)

    const navigate = useNavigate()

    // CREATE FN TO GET USER INFO AND CALL FN IN OTHER COMPONENTS. THIS VS USEEFFECT WHICH DOESN'T WORK.
    // get user info and change the state if applicable
    const getUserInfo = () => {
        let token = localStorage.getItem('token')
        // fetch the data for info in user's acct
        if (token) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${urlMain}/auth/me`, requestOptions)
            .then(response => response.json())
            .then(result => setinfo(result))
            .catch(error => console.log('error', error));
        }
    };
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
    };
    const logout = () => {
        setinfo({})
        localStorage.removeItem('token')
        localStorage.removeItem('token_expiration')
        localStorage.removeItem('user_id')
        setLoggedIn(false)
        navigate('/login')
    };

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

                    <Route path='/portfolio' element={<Portfolio loggedIn={loggedIn} ticker={ticker} changeTicker={changeTicker} newId={newId} getUserInfo={getUserInfo} info={info} />} />
                    <Route path='/account' element={<Account flashMsg={flashMsg} logout={logout} newId={newId} info={info} getUserInfo={getUserInfo} />} />
                    {/* CHECK FUNDS LATER, SEE IF REMOVING CODE BELOW CHANGES ANYTHING SINCE FUNDS IS ALREADY PASSED INTO THE ACCOUNT COMPONENT */}
                    <Route path={`/account/${newId}/transactions`} element={<Transactions  />} />
                    <Route path='/account' element={<Funds flashMsg={flashMsg} logout={logout} newId={newId} />} />
                    <Route path='/search' element={<Search changeTicker={changeTicker} />} />
                    <Route path='/edit' element={<Edit />} />
                    <Route path='/stock' element={<Stock ticker={ticker} />} />
                    <Route path='/trade' element={<Trade flashMsg={flashMsg} ticker={ticker} newId={newId} />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
