    // create fetch to create a new user, if no user already exists with email/username
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { urlMain } from './Keys';

export default function Signup(props) {

    useEffect(() => {
        document.title = 'Sign Up'
    }, [])

    let navigate = useNavigate()
    // handlesubmit fn to get form info and if valid, fetch post a new user, redirect to portfolio page
    const handleSubmit = e => {
        e.preventDefault();
        let email = e.target.email.value;
        let username = e.target.username.value;
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        // check if password matches confirm password
        if (password !== confirmPass){
            // flash msg...
            props.flashMsg('Make sure your passwords match!', 'warning')
        // fetch email and username from db, post if neither exists, else flash msg to try another email/username, redirect to login
        } else {
            // fetch post create user, if console.err, flash msg
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({
              "username": username,
              "email": email,
              "password": password
            });
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${urlMain}/auth/users`, requestOptions) 
              .then(response => response.json())
              .then(data => {
                if (data.error){ // this checks for the API error that is in backend code (400 error)
                    console.error(data.error) // console.error returns both the backend error type (400,401) and the backend msg
                    props.flashMsg(`A user with the email ${email} or username ${username} already exists. Try another one.`, 'warning')
                } else{
                    // flash msg success, redirect to login page
                    props.flashMsg(`You have registered successfully, now you can login ${username}!`, 'success')
                    navigate('/login')
                }
            })
        }
    }
  

    return (
        <>
            <h4 className="text-center">Sign Up</h4>
            <br /><br />
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' placeholder='Enter Email' name='email' required/>
                    <br />
                    <label htmlFor="username">Username</label>
                    <input type="text" className='form-control' placeholder='Enter Username' name='username' required/>
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' placeholder='Enter Password' name='password' required/>
                    <br />
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input type="password" className='form-control' placeholder='Confirm Password' name='confirmPass' required/>
                    <br />

                    <input type="submit" value='Sign Up' className='btn btn-dark w-100 mt-3' />
                </div>
            </form>

        </>
    )
}
