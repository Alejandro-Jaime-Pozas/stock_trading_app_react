// SHOWS USERNAME, EMAIL, PSWD, ADD FUNDS, WITHDRAW FUNDS, USER CAN EDIT EACH ONE INSIDE THE PAGE, OR FOR ADD FUNDS/REMOVE FUNDS, CREATE A NEW PAGE TO RECEIVE INPUT...
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Funds from './Funds'
import { urlMain } from './Keys'

export default function Account(props) {

    let navigate = useNavigate()
    const [info, setinfo] = useState(0)

    const handleClick = e => {
        console.log(e.target.name)
        navigate('/edit')
    }

    const handleDeposit = (e) => {
        e.preventDefault();
        let shares = e
    }

    useEffect(() => {
        let token = localStorage.getItem('token')
        // fetch the data for info in user's acct
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
    }, [])

    return (
        <>
            <h4 className="text-center">Account</h4>
            <br /><br />
            <div className="row">
                <div className="col">Username: {info.username}</div>
                <button onClick={handleClick} className="col-4 h-75 btn btn-dark" name='username' >Edit</button>
            </div><br /><br />
            <div className="row">
                <div className="col">Email: {info.email}</div>
                <button className="col-4 h-75 btn btn-dark" name='email' >Edit</button>
            </div><br /><br />
            <div className="row">
                <div className="col">Password: ------</div>
                <button className="col-4 h-75 btn btn-dark" name='password' >Edit</button>
            </div><br /><br />
            <div className="row">
                <div className="col">Your Cash Funds</div>
                <p className="col-4 lead h-75 text-center text-success" name='cash' >${Number(info.cash?.toFixed(2)).toLocaleString()}</p>
            </div><br /><br />
            <div className="row gy-3 p-0 justify-content-center ">
                <br />
                <Funds info={info} /><br /><br />
                {/* <Link to='/portfolio' className="col-12 h-25 btn btn-light" name='withdraw' >Withdraw Funds</Link><br /><br /><br /><br /> */}
                <Link to='/login' onClick={props.logout} className="col-12 h-25 btn btn-secondary mt-5" name='logout' >Logout</Link><br /><br />
            </div>
            <br /><br /><br /><br />
        </>
    )
}