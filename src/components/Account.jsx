// SHOWS USERNAME, EMAIL, PSWD, ADD FUNDS, WITHDRAW FUNDS, USER CAN EDIT EACH ONE INSIDE THE PAGE, OR FOR ADD FUNDS/REMOVE FUNDS, CREATE A NEW PAGE TO RECEIVE INPUT...
import React, { useState } from 'react'
import { useEffect } from 'react'
import Funds from './Funds'
import { urlMain } from '../Keys'
// import Edit from './Edit'
import { Link } from 'react-router-dom'

export default function Account(props) {

    const [editing, setEditing] = useState(false)
    const credentials = [
        {'username': props.info.username}, 
        {'email': props.info.email}, 
        {'password': props.info.password},
    ]

    console.log(credentials)
    // fetch user's info to display
    useEffect(() => { 
        document.title = Account.name
        props.getUserInfo()
    }, []) // WILL NEED TO CHANGE THIS ONCE UPDATING TO ALLOW FOR USEFFECT TO RE-RENDER AFTER USER EDITS INFO
    // console.log(props.info)

    // handle when user clicks one of the edit buttons, so that the button that's clicked changes its value from user info to input for editing. should only edit one field at a given time, flash msg otherwise, and also if they try to change page/refresh open a modal to ensure they don't want to edit.
    const handleClick = e => {
        e.preventDefault()
        !editing ? setEditing(true) : setEditing(false)
    }
    console.log(editing);

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

            <div className="row align-items-center text-center mb-5 " >
            {credentials.map((cred, i) => {
                return (
                <div className="row d-flex justify-content-around my-2" key={i}>
                    <div className="col-4 ">
                        {Object.keys(cred)}:
                        {
                            editing 
                            ? 
                            <form className="">
                                <input type="text" className='form-control' placeholder={`New ${Object.keys(cred)}`} name={Object.keys(cred)}/>
                            </form>
                            :
                            ' ' + Object.values(cred)
                        }
                    </div>
                    <button className={`col-4 h-75 btn btn-${!editing ? 'dark' : 'success'}`} name={Object.keys(cred)} onClick={handleClick} >
                        {!editing ? 'Edit' : 'Confirm'}
                    </button>
                </div>
                )
            })}
            </div>
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
        </>
    )
}

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