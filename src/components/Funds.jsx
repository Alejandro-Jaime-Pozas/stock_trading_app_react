import React from 'react'
import { useNavigate } from 'react-router-dom'
import { urlMain } from './Keys'

export default function Funds(props) {

    let navigate = useNavigate()
    const handleDeposit = async e => {
        e.preventDefault()
        // get the deposit sumbission amount from form and add the cash to user's cash acct by updating user's cash
        let deposit = e.target.deposit.value
        let token = localStorage.getItem('token')
        // let user_id = localStorage.getItem('user_id')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "cash": deposit
        });
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        let response = await fetch(`${urlMain}/auth/users/${props.info.id}`, requestOptions)
        if (response.ok){
            let result = response.json() 
            props.flashMsg(`You added $${deposit} to your cash account, now start investing!`, 'success')
            console.log(result)
            navigate('/portfolio')
        } else {
            console.log('this response was not ok')
        }
    }

    const handleWithdraw = e => {
        e.preventDefault()
        // get the deposit sumbission amount from form and add the cash to user's cash acct by updating user's cash
        let withdrawal = -e.target.withdrawal.value
        let token = localStorage.getItem('token')
        // let user_id = localStorage.getItem('user_id')
        // if the amount to withdraw is > user's cash, throw warning msg and terminate event
        if (props.info.cash + withdrawal < 0){
            return props.flashMsg(`Sorry, you cannot withdraw more money than you have in cash ($${props.info.cash?.toFixed(2)})`, 'warning')
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "cash": withdrawal
        });
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(`${urlMain}/auth/users/${props.info.id}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            props.flashMsg(`Your withdrawal for -$${-withdrawal} was successful, you now have $${result.cash} left in your cash account.`, 'info')
            console.log(result)
            navigate('/portfolio')
          })
          .catch(error => console.log('error', error));
        
    }

    return (
        <div className="row">

            {/* BUTTONS */}
            <button type="button" className="col-4 btn btn-success w-50 " data-bs-toggle="modal" data-bs-target="#deleteModal1">
                Deposit Funds
            </button>
            <button type="button" className="col-4 btn btn-light w-50" data-bs-toggle="modal" data-bs-target="#deleteModal2">
                Withdraw Funds
            </button>

            {/* DEPOSIT MODAL */}
            <div className="modal fade" id="deleteModal1" tabIndex="-1">
                <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="deleteModalLabel">Deposit Funds From Your Bank</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>

                <form onSubmit={handleDeposit}  >
                    <div className="form-groupm modal-body">
                        <label htmlFor="deposit"></label>
                        <input type="text" className='form-control' placeholder='Enter Amount' name='deposit' required/>
                        <br />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                        <input type="submit" value='Deposit' data-bs-dismiss="modal" className='btn btn-success' />
                    </div>
                </form>

                </div>
                </div>
            </div>

            {/* WITHDRAW MODAL */}
            <div className="modal fade" id="deleteModal2" tabIndex="-1">
                <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="deleteModalLabel">Withdraw Funds</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>

                <form onSubmit={handleWithdraw}  >
                    <div className="form-groupm modal-body">
                        <label htmlFor="withdrawal"></label>
                        <input type="text" className='form-control' placeholder='Enter Amount' name='withdrawal' required/>
                        <br />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                        <input type="submit" value='Withdraw' data-bs-dismiss="modal" className='btn btn-secondary' />
                    </div>
                </form>

                </div>
            </div>
        </div>
    </div>
    )
}