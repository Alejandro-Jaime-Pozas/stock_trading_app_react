// SHOWS USERNAME, EMAIL, PSWD, ADD FUNDS, WITHDRAW FUNDS, USER CAN EDIT EACH ONE INSIDE THE PAGE, OR FOR ADD FUNDS/REMOVE FUNDS, CREATE A NEW PAGE TO RECEIVE INPUT...
import React, { useState } from 'react'
import { useEffect } from 'react'
import Funds from './Funds'
import { urlMain } from '../Keys'
// import Edit from './Edit'
import { Link } from 'react-router-dom'

export default function Account(props) {

    const [editing, setEditing] = useState(null)
    const [changeConfirmed, setChangeConfirmed] = useState(false)
    const credentials = [
        {'username': props.info.username}, 
        {'email': props.info.email}, 
        {'password': props.info.password},
    ]

    // fetch user's info to display
    useEffect(() => { 
        document.title = 'Account'
        props.getUserInfo()
        setChangeConfirmed(false)
    }, [changeConfirmed]) // WILL NEED TO CHANGE THIS ONCE UPDATING TO ALLOW FOR USEFFECT TO RE-RENDER AFTER USER EDITS INFO
    // console.log(props.info)

    // handle when user clicks one of the edit buttons, so that the button that's clicked changes its value from user info to input for editing. should only edit one field at a given time, flash msg otherwise, and also if they try to change page/refresh open a modal to ensure they don't want to edit.
    const handleEditClick = (e, keys) => {
        e.preventDefault()
        let editing_field = e.target.name // check if this correct target value
        !editing ? setEditing(editing_field) : setEditing(null)
    }

    const handleConfirmClick = (e, keys) => {
        e.preventDefault()
        let editing_field = e.target.elements[keys].name
        !editing ? setEditing(editing_field) : setEditing(null)
    }
    
    // console.log(editing);

    // this to handle the user changing their account info username, email, pwd
    const handleEdit = async (e, keys) => {
        // e.preventDefault() // MAY REMOVE THIS SO THAT PAGE REFRESHES AND RE TRIGGERS USEEFFECT
        handleConfirmClick(e, keys)
        let attributeChange = e.target[0].value

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
              [keys] : attributeChange
            });
            
        var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
        
        let response = await fetch(`${urlMain}/auth/users/${props.newId}`, requestOptions)
        if (response.ok) {
            let result = await response.text()
            console.log(result)
            props.flashMsg(`Your ${keys} has been successfully updated.`, 'info')
        } else {
            console.error(`Something wrong with '${keys}: ${attributeChange}', cannot update with PUT method`)
            props.flashMsg(`${keys}: ${attributeChange} already exists.`, 'warning')
            return 
        }
                // .then(response => response.text())
                // .then(result => console.log(result))
                // .catch(error => console.log('error', error));

        setChangeConfirmed(true)
    }
            
    return (
        <>
            <h4 className="text-center">Account</h4>
            <br /><br />
            <div className="row align-items-center text-center mb-5 " >
            {credentials.map((cred, i) => {
                let keys = Object.keys(cred)[0];
                let values = Object.values(cred)[0] === undefined ? '*******' : Object.values(cred)[0]
                return (
                    <div key={i}>
                    {
                        editing === keys
                        ?
                        // IF EDIT BUTTON HAS BEEN CLICKED, SHOW INPUT FIELD AND CONFIRM BUTTON
                            <form className="form-group row d-flex justify-content-around my-2" onSubmit={(e) => handleEdit(e, keys)} >
                                <div className="col-4 ">
                                    {keys}:
                                    <input type="text" className='form-control' placeholder={`New ${keys}`} name={keys} required/>
                                </div>
                                <input 
                                    type='submit'
                                    value='Confirm' 
                                    className={`col-4 h-75 btn btn-success`} 
                                    name={keys} >
                                </input>
                            </form>
                        : 
                        // IF EDIT BUTTON HAS NOT BEEN CLICKED SHOW EDIT BUTTON
                            <div className=" row d-flex justify-content-around my-2" key={i}>
                                <div className="col-4 ">
                                    {keys}:{' ' + values}
                                </div>
                                <button className={`col-4 h-75 btn btn-dark`} onClick={handleEditClick} name={keys} >
                                        Edit
                                </button>
                            </div>
                    }
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