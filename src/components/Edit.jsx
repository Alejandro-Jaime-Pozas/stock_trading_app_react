import React from 'react'

export default function Edit(props) {

    let randominput = null

    return (
        <form  >
            <div className="form-group">
                <label htmlFor="username">New Username</label>
                <input type="text" className='form-control' placeholder='Edit Username' name='username'/>
                <br />
                <label htmlFor="email">New Email</label>
                <input type="text" className='form-control' placeholder='Edit Email' name='email'/>
                <br />
                <label htmlFor="password">New Password</label>
                <input type="password" className='form-control' placeholder='Edit Password' name='password'/>
                <br />

                <input type="submit" value='Update' className='btn btn-primary w-100 mt-3' />
                <br /><br /><br /><br />
            </div>
        </form>
    )
}
