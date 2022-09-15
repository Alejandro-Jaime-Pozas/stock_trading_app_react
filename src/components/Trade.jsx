    // {/* ADD CALCULATION OF SHARE * PRICE PER SHARE TO SHOW USER TOTAL AMOUNT THEY WOULD HAVE TO PAY */}

// SHOWS THE STOCK TICKER, AND OPTIONS FOR USER TO BUY OR SELL (IF THEY OWN STOCK) A CERTAIN AMOUNT OF SHARES. SHOWS CALCULATION OF SHARES * PRICE WHEN BUYING/SELLING, AND USER'S PORTFOLIO VALUE IMPACT SO THEY CAN MEASURE THE TRADE'S IMPACT ON PORTFOLIO. WHEN SUBMITTED, SHOWS SUCCESS FLASH MSG
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiKey, urlMain } from './Keys'

export default function Trade(props) {

    let navigate = useNavigate()
    const [quote, setQuote] = useState('')
    const [shares, setShares] = useState(null)
    const [userStocks, setUserStocks] = useState([])

    // finnhub: get data for the current global ticker
    useEffect(() => {
            fetch(`https://finnhub.io/api/v1/quote?symbol=${props.ticker}&token=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    setQuote(data)
                })
                .catch(err => console.log(err))
    }, [props.ticker])

// flask: need to get all the user's stocks to see if they already have a stock, do a put vs post a new stock...
    useEffect(() => {
        let token = localStorage.getItem('token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`${urlMain}/portfolio/${props.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                
            })
            .catch(error => console.log('error', error));
    }, [])

const handleBuy = e => {
    e.preventDefault();
        // get num shares to buy
        let buy = e.target.buy.value;
        // fetch to see if user has enough funds to buy shares, post the new share amount for that user's stock 
    }
    // IGNORE THIS UNTIL HANDLEBUY FN IS COMPLETE, copy paste
    const handleSell = e =>{
        e.preventDefault();
        // get num shares to buy
        let sell = e.target.sell.value;
        console.log(sell)
        // fetch to see if user has those shares, post the new share amount for that user's stock 
    }

    const handleShares = e => {
        console.log(e.target.form[0].value)
        setShares(e.target.form[0].value)
    }
    
    return (
        <>
            <Link to='/stock' className='btn btn-dark mb-3'>{`<`} Back</Link>
            <div className="row align-items-end">
            <h1 className='col-5 display-3 m-0'>{props.ticker}</h1><p className='col m-1 display-6 '>${quote.c}</p>
            </div>
            <div className="row my-5">
                <div className="col ">Number of Shares</div>
                <div className="col-4 mb-2">Choose Option</div>
                <hr />
            </div>
            {/* onsubmit the form you should handle the submit to get the input, check if user has that portfolio money, and buy the shares for that ticker */}
            <form onSubmit={handleBuy} className='row my-4'>
                {/* <div className="form-group"> */}
                    <label htmlFor="buy"></label>
                    <input onChange={handleShares} type="text" className='col form-control' placeholder='Enter shares to buy' name='buy'/>
                    <input type="submit" value='Buy' className='col-4 btn btn-dark ' />
                {/* </div> */}
            </form>
            {/* onsubmit the form you should handle the submit to get the input, check if user has that portfolio money, and buy the shares for that ticker */}
            <form onSubmit={handleSell} className='row my-4'>
                {/* <div className="form-group"> */}
                    <label htmlFor="sell"></label>
                    <input onChange={handleShares} type="text" className='col form-control' placeholder='Enter shares to sell' name='sell'/>
                    <input type="submit" value='Sell' className='col-4 btn btn-dark ' />
                {/* </div> */}
            </form>
            {shares ? <div className="row lead text-center">Total: ${quote.c * shares}</div> : null }
        </>
    )
}
