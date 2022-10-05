// SHOWS USERNAME, EMAIL, PSWD, ADD FUNDS, WITHDRAW FUNDS, USER CAN EDIT EACH ONE INSIDE THE PAGE, OR FOR ADD FUNDS/REMOVE FUNDS, CREATE A NEW PAGE TO RECEIVE INPUT...
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Edit from './Edit'
import Funds from './Funds'
import { urlMain } from './Keys'

export default function Account(props) {

    let navigate = useNavigate()
    const [info, setinfo] = useState({})

    const handleEdit = e => {
        e.preventDefault()
        let username = e.target.username.value 
        let email = e.target.email.value
        let password = e.target.password.value 

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "username": username,
          "email": email,
          "password": password
        });
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(`${urlMain}/auth/users/${props.newId}`, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));       
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

            <form onSubmit={handleEdit} className="row form-group">
                {/* <label className='col' htmlFor="username">New Username</label> */}
                <div className="col">Username: {info.username}</div>
                {/* <input className='my-2 form-control' type="text"  placeholder={info.username} name='username'/> */}
            <br />
                {/* <label className='col' htmlFor="email">New Email</label> */}
                <div className="col">Email: {info.email}</div>
                {/* <input className='my-2 form-control' type="text"  placeholder={info.email} name='email'/> */}
            <br />
                {/* <label className='col' htmlFor="password">New Password</label> */}
                {/* <input className='my-2 form-control' type="password"  placeholder='--' name='password'/> */}

                {/* <input type='submit' value='Edit' className="col-4 h-75 btn btn-dark" /> */}
            </form>

            <br /><br />
            <div className="row">
                <div className="col">Your Cash Funds</div>
                <p className="col-4 lead h-75 text-center text-success fw-normal" name='cash' >${Number(info.cash?.toFixed(2)).toLocaleString()}</p>
            </div><br /><br />
            <div className="row gy-3 p-0 justify-content-center ">
                <br />
                <Funds info={info} /><br /><br />
                {/* {clickToEdit ? <Edit info={info} /> : null } */}
                {/* <Link to='/portfolio' className="col-12 h-25 btn btn-light" name='withdraw' >Withdraw Funds</Link><br /><br /><br /><br /> */}
                <Link to='/login' onClick={props.logout} className="col-12 h-25 btn btn-secondary mt-5" name='logout' >Logout</Link><br /><br />
            </div>

                <br onSubmit={handleEdit} />


            {/* <div className="row">
                <div className="col">Email: {info onSubmit={handleEdit}.email}</div>
                <button className="col-4 h-75 btn btn-dark" name='email' >Edit</button>
            </div><br /><br /> */}
            {/* <div className="row">
                <div className="col">Password: ------</div>
                <button className="col-4 h-75 btn btn-dark" name='password' >Edit</button>
            </div><br /><br /> */}
            {/* <form>
                <label htmlFor="email">New Email</label>
                <input type="text" className='form-control' placeholder={info.email} name='email'/>
            </form>
                <br />
            <form>
                <label htmlFor="password">New Password</label>
                <input type="password" className='form-control' placeholder='--' name='password'/>
                <br />
            </form> */}
            <br /><br /><br /><br />
        </>
    )
}