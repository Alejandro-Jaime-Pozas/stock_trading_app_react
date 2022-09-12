// copy html from react social media
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

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
            navigate('/login')
        }
    }
  

    return (
        <>
            <h4 className="text-center">Sign Up</h4>
            <br /><br />
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className='form-control' placeholder='Enter Email' name='email'/>
                    <br />
                    <label htmlFor="username">Username</label>
                    <input type="text" className='form-control' placeholder='Enter Username' name='username'/>
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' placeholder='Enter Password' name='password'/>
                    <br />
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input type="password" className='form-control' placeholder='Confirm Password' name='confirmPass'/>
                    <br />

                    <input type="submit" value='Sign Up' className='btn btn-primary w-100 mt-3' />
                </div>
            </form>

        </>
    )
}
