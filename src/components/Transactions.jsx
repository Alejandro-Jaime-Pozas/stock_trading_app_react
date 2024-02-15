import React, { useEffect, useState } from 'react'
import { urlMain } from '../Keys'

export default function Transactions() {

    const [transactions, setTransactions] = useState([])
    
    useEffect(() => {
        let user_id = localStorage.getItem("user_id")
        let token = localStorage.getItem("token")

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token );

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`${urlMain}/portfolio/${user_id}/transactions`, requestOptions)
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.log('error', error));
        
    }, [])

    const toDollarSign = input => {
        return input < 0 ? `-$${-input.toFixed(2)}` : `$${input.toFixed(2)}`
    }
    
    return (
        <div className='ms-5'>
            <h2 className='mb-4'>Transactions</h2>

            <ul className="list-group list-group-flush col-6">
                {transactions.map((t, i) => {
                    return (
                        // if transaction is stock
                        t.transaction_type === 'stock' ?
                            <li className="list-group-item mb-4">
                                <div className="row mb-2 text-secondary">{t.datetime.slice(0, -4)}</div>
                                    <div className="col">transaction type: {t.transaction_type}</div>
                                    <div className="col">{t.ticker}</div>
                                    <div className="col">price: {toDollarSign(t.new_price)}</div>
                                    <div className="col">shares: {t.new_shares}</div>
                                    <div className="col mb-3">total: {toDollarSign(t.new_shares * t.new_price)}</div>
                            </li>
                        :
                        // if transactions is cash
                            <li className="list-group-item mb-4">
                                <div className="row mb-2 text-secondary">{t.datetime.slice(0, -4)}</div>
                                    <div className="col">transaction type: {t.transaction_type}</div>
                                    <div className="col">amount: {toDollarSign(t.amount)}</div>
                            </li>
                    )
                })}
            </ul>
        </div>
    )
}