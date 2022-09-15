// SHOWS USERNAME, EMAIL, PSWD, ADD FUNDS, WITHDRAW FUNDS, USER CAN EDIT EACH ONE INSIDE THE PAGE, OR FOR ADD FUNDS/REMOVE FUNDS, CREATE A NEW PAGE TO RECEIVE INPUT...
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Account(props) {
    let navigate = useNavigate()
    const handleClick = e => {
        console.log(e.target.name)
        navigate('/edit')
    }

    const handleDeposit = (e) => {
        e.preventDefault();
        let shares = e
    }

    return (
        <>
            <h4 className="text-center">Account</h4>
            <br /><br />
            <div className="row">
                <div className="col">Username</div>
                <button onClick={handleClick} className="col-4 h-75 btn btn-dark" name='username' >Edit</button>
            </div><br /><br />
            <div className="row">
                <div className="col">Email</div>
                <button className="col-4 h-75 btn btn-dark" name='email' >Edit</button>
            </div><br /><br />
            <div className="row">
                <div className="col">Password</div>
                <button className="col-4 h-75 btn btn-dark" name='password' >Edit</button>
            </div><br /><br />
            <div className="row gy-3 p-0 justify-content-center ">
                <br />
                <Link to='/portfolio' className="col-12 h-25 btn btn-success" name='deposit' >Deposit Funds</Link><br /><br />
                <Link to='/portfolio' className="col-12 h-25 btn btn-light" name='withdraw' >Withdraw Funds</Link><br /><br /><br /><br />
                {/* RE-USE THIS CODE BELOW TO CREATE LINKS VS a/buttons */}
                <Link to='/login' onClick={props.logout} className="col-12 h-25 btn btn-secondary" name='logout' >Logout</Link><br /><br />
            </div>
            <br /><br /><br /><br />
        </>
    )
}
