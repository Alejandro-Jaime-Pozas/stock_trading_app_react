// SHOWS USERNAME, EMAIL, PSWD, ADD FUNDS, WITHDRAW FUNDS, USER CAN EDIT EACH ONE INSIDE THE PAGE, OR FOR ADD FUNDS/REMOVE FUNDS, CREATE A NEW PAGE TO RECEIVE INPUT...
import React from 'react'
import { useEffect } from 'react'
import Funds from './Funds'
import { urlMain } from '../Keys'
// import Edit from './Edit'
import { Link } from 'react-router-dom'

export default function Account(props) {

    // fetch user's info to display
    useEffect(() => { 
        document.title = Account.name
        props.getUserInfo()
    }, []) // WILL NEED TO CHANGE THIS ONCE UPDATING TO ALLOW FOR USEFFECT TO RE-RENDER AFTER USER EDITS INFO
    console.log(props.info)

    // this to handle the user changing their account info username, email, pwd
    const handleEdit = e => {
        e.preventDefault() // MAY REMOVE THIS SO THAT PAGE REFRESHES AND RE TRIGGERS USEEFFECT
        let username =  e.target.username.value 
        let email =  e.target.email.value 
        let password =  e.target.password.value 
        console.log(username);

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

    return (
        <>
            <h4 className="text-center">Account</h4>

            <br /><br />

            <form onSubmit={handleEdit} className="row form-group text-center">
                {/* <label className='col' htmlFor="username">New Username</label> */}
                <div className="col">Username: {props.info.username}</div>
                {/* <input className='my-2 form-control' type="text"  placeholder={info.username} name='username'/> */}
            <br />
                {/* <label className='col' htmlFor="email">New Email</label> */}
                <div className="col ">Email: {props.info.email}</div>
                {/* <input className='my-2 form-control' type="text"  placeholder={info.email} name='email'/> */}
            <br />
                {/* <label className='col' htmlFor="password">New Password</label> */}
                {/* <input className='my-2 form-control' type="password"  placeholder='--' name='password'/> */}

                {/* <input type='submit' value='Edit' className="col-4 h-75 btn btn-dark" /> */}
            </form>

            <br /><br />
            <div className="row text-center">
                <div className="col">Your Cash Funds</div>
                <p className="col lead h-75 text-center text-success fw-normal" name='cash' >${props.info.cash ? Number(props.info.cash?.toFixed(2)).toLocaleString() : 0}</p>
            </div><br /><br />
            <div className="row gy-3 p-0 justify-content-center ">
                <br />
                <Funds info={props.info} flashMsg={props.flashMsg} /><br /><br />
                {/* {clickToEdit ? <Edit info={info} /> : null } */}
                {/* <Link to='/portfolio' className="col-12 h-25 btn btn-light" name='withdraw' >Withdraw Funds</Link><br /><br /><br /><br /> */}
                <Link to='/login' onClick={props.logout} className="col-8 h-25 btn btn-secondary mt-5" name='logout' >Logout</Link><br /><br />
            </div>

            <br /><br />

            {/* TESTING EDIT USER INFO */}
            {/* best here is for user to click EDIT, and when they do so, the current edit field should turn into an input field right then and there. so 'Username: ajp' becomes 'Enter new username' input field */}
            <div className="row w-50 align-items-center ">
            <div className="row ">
                <div className="col">Username: {props.info.username} 
                {/* if edit button is in status 'clicked' then show input form to let user input new info */}
                    {props.info.username ? 
                        <span> something</span> 
                        :
                        null
                    }
                </div>
                <button className="col-4 h-75 btn btn-dark" name='username' >Edit</button>
            </div><br /><br />
            <div className="row">
                <div className="col">Email: {props.info.email}</div>
                <button className="col-4 h-75 btn btn-dark" name='email' >Edit</button>
            </div><br /><br />
            <div className="row">
                <div className="col">Password: --------</div>
                <button className="col-4 h-75 btn btn-dark" name='password' >Edit</button>
            </div><br /><br />
            {/* <form>
                <label htmlFor="email">New Email</label>
                <input type="text" className='form-control w-50' placeholder={props.info.email} name='email'/>
            </form>
            <br />
            <form>
                <label htmlFor="password">New Password</label>
                <input type="password" className='form-control w-50' placeholder='--' name='password'/>
                <br />
            </form> */}
            </div>

            <br /><br /><br /><br />
        </>
    )
}