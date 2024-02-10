import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// this homepage should have some general content, like what the app is, does, allows you to do...or thinking of it as a mobile app, maybe better to just do IF USER NOT SIGNED IN, TAKE THEM TO SIGN IN OR SIGNUP. So the user would have to sign in...or maybe I can put them in the navbar, WHILE the user is not signed in...for now 

export default function Home() {

    useEffect(() => {
      document.title = 'Home'
    
    }, [])
    

    return (
        <div>

            <div className='row text-center m-5'>
                <h1>Welcome to the Lean Stock Trading App.</h1>
                <p className='col w-50 m-3'>
                    It's never been so easy to invest in the stocks you want. Just look a stock up, view its info, and decide how much to invest.
                </p>
            </div>
            <div className="row my-3 align-items-center text-center flex-column">
                {/* need to insert onClick to Links... */}
                <Link className='col-4 btn btn-dark' to='/login' >Login</Link>
                <p className='my-3'>or </p>
                <Link className='col-4 btn btn-dark' to='/signup' >Signup</Link>
            </div>
        </div>
    )
}