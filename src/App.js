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


function App() {
    
    let navigate = useNavigate
    const [message, setMessage] = useState(null)
    const [category, setCategory] = useState(null)

    const [loggedIn, setLoggedIn] = useState(false)

    const flashMsg = (message, category) => {
        setMessage(message);
        setCategory(category);
    }
    
    const login = () => {
        setLoggedIn(true)
    }
    const logout = () => {
        setLoggedIn(false)
        navigate('/login')
    }
    
    // LATER: if user loggedin, then hide homepage, signup, login, etc
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
                    <Route path='/login' element={<Login login={login} loggedIn={loggedIn} />} />

                    <Route path='/portfolio' element={<Portfolio loggedIn={loggedIn} />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/account' element={<Account logout={logout} />} />
                    <Route path='/edit' element={<Edit />} />

                    <Route path='/stock' element={<Stock />} />
                    <Route path='/trade' element={<Trade />} />
                </Routes>
            </div>
        </>
    );
}


export default App;