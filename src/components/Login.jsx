// copy html from react social media
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    let navigate = useNavigate();
    console.log(props.loggedIn);

    // make async fn here
    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Logging in');
        
        let email = e.target.email.value;
        let password = e.target.password.value;

        // // POSTMAN CODE SNIPPET to get the email and password
        // let myHeaders = new Headers();
        // myHeaders.append('Authorization', 'Basic ' + btoa(`${email}:${password}`)) // COME BACK TO UNDERSTAND THIS

        // let response = await fetch('http://localhost:5000/api/token', {headers:myHeaders}); // COME BACK TO UNDERSTAND THIS
        // if (response.ok){
        //     let data = await response.json();
        //     // console.log(data)
        //     // END POSTMAN CODE SNIPPET - this snippet is shorter than the one shown on postman...
    
        //     // sotre the token and expiration in localStorage Application
        //     localStorage.setItem('token', data.token);
        //     // console.log(localStorage.getItem('token'))
        //     localStorage.setItem('expiration', data.token_expiration)
        //     // console.log(localStorage.getItem('expiration'))

        //     // set the logged in fn to true
        //     props.login()
    
        //     // flash success msg and nagivate back to home page
        //     props.flashMessage('You have logged in successfully', 'success');
        //     navigate('/');
        // } else {
        //     props.flashMessage('Your email/password are incorrect', 'danger');
        // }
        props.login()
        console.log(email, password, props.loggedIn)
        navigate('/portfolio');
    }
  
  return (
    <>
        <h4 className="text-center">Login</h4>
        <form onSubmit={handleSubmit}>
            <div className="form-group">

                <label htmlFor="email">Email</label>
                <input type="text" className='form-control' placeholder='Enter Email' name='email'/>
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' placeholder='Enter Password' name='password'/>
                <br />

                <input type="submit" value='Login' className='btn btn-primary w-100 mt-3' />
            </div>
        </form>

        </>
  )
}
