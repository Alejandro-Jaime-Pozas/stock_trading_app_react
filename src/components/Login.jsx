// copy html from react social media
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { urlMain } from './Keys';

export default function Login(props) {

    let navigate = useNavigate();
    // make async fn here
    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Logging in');
        
        let username = e.target.username.value;
        let password = e.target.password.value;

        // POSTMAN CODE SNIPPET to get the username and password
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`)) // COME BACK TO UNDERSTAND THIS

        let response = await fetch(`${urlMain}/auth/token`, {headers:myHeaders}); // instead of requestOptions, if everything is default except for myHeaders, just input headers:MyHeaders
        if (response.ok){ // checks if response is valid, not error
            let data = await response.json();

            // store the token and expiration in localStorage Application
            localStorage.setItem('token', data.token);
            localStorage.setItem('token_expiration', data.token_expiration)

            // set the logged in state to true
            props.login()
            // flash success msg and nagivate back to portfolio
            navigate('/portfolio');
        } else {
            props.flashMsg('Your username/password are incorrect, try again', 'warning');
        }
    }
  
  return (
    <>
        <h4 className="text-center">Login</h4>
        <form onSubmit={handleSubmit}>
            <div className="form-group">

                <label htmlFor="username">Username</label>
                <input type="text" className='form-control' placeholder='Enter Username' name='username' required/>
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' placeholder='Enter Password' name='password' required/>
                <br />

                <input type="submit" value='Login' className='btn btn-dark w-100 mt-3' />
            </div>
        </form>

        </>
  )
}
