// copy html from react social media
import React, { useEffect, useState } from 'react'
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlMain } from '../Keys';

export default function Login(props) {

    let navigate = useNavigate()

    useEffect(() => {
        document.title = 'Login'
    }, [])

    const [clicked, setClicked] = useState(false)
    

    // make async fn here
    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Logging in');
        setClicked(true)
        
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
            // localStorage.setItem('token_expiration', data.token_expiration);

            // also set the user_id to the user's id
            let token = localStorage.getItem('token');
            let myHeaders2 = new Headers();
            myHeaders2.append("Authorization", "Bearer " + token);
            let requestOptions2 = {
                method: 'GET',
                headers: myHeaders2,
                redirect: 'follow'
                };
            let response2 = await fetch(`${urlMain}/auth/me`, requestOptions2)
            if (response2.ok) {
                let result2 = await response2.json()
                localStorage.setItem('user_id', result2.id)
                props.userId(result2.id)
            } else {
                console.log('something wrong with user_id check')
            }
                        
            // set the logged in state to true
            props.login()
            // flash success msg and nagivate back to portfolio
            navigate('/portfolio');
        } else {
            props.flashMsg('Your username/password are incorrect, try again', 'warning');
            setClicked(false)
        }
    }
    
    return (
        <>
        <h4 className="text-center">Login</h4>
        <form onSubmit={handleSubmit}>
            <div className="form-group col-8 col-md-6 col-lg-4 mx-auto my-5">
                
                <label htmlFor="username">Username</label>
                <input type="text" className='form-control' placeholder='Enter Username' name='username' required/>
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' placeholder='Enter Password' name='password' required/>
                <br />

                <input type="submit" value='Login' className='btn btn-dark w-100 mt-3' />
            </div>
        </form>
        <hr />
        { 
            clicked 
            ? 
            <>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <br />
                <div className="d-flex justify-content-center">
                    <p>Firing up a server which could take some time since the hosting is free..</p>
                </div>
            </>
            :
            null
        }

        </>
  )
}
