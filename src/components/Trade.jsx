    // {/* ADD CALCULATION OF SHARE * PRICE PER SHARE TO SHOW USER TOTAL AMOUNT THEY WOULD HAVE TO PAY */}

// SHOWS THE STOCK TICKER, AND OPTIONS FOR USER TO BUY OR SELL (IF THEY OWN STOCK) A CERTAIN AMOUNT OF SHARES. SHOWS CALCULATION OF SHARES * PRICE WHEN BUYING/SELLING, AND USER'S PORTFOLIO VALUE IMPACT SO THEY CAN MEASURE THE TRADE'S IMPACT ON PORTFOLIO. WHEN SUBMITTED, SHOWS SUCCESS FLASH MSG
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiKey } from './Keys'

export default function Trade(props) {

    let navigate = useNavigate()
    const [quote, setQuote] = useState('')

    useEffect(() => {
            fetch(`https://finnhub.io/api/v1/quote?symbol=${props.ticker}&token=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    setQuote(data)
                    console.log(data)
                })
                .catch(err => console.log(err))
    }, [props.ticker])

    const handleBuy = e => {
        e.preventDefault();
        // need to know if submit was to buy, then do buy process, if sell, then sell process
        // get num shares to buy
        let buy = e.target.buy.value;
        console.log(buy)
        // fetch to see if user has enough funds to buy shares, post the new share amount for that user's stock 
    }
    
    // IGNORE THIS UNTIL HANDLEBUY FN IS COMPLETE, copy paste
    const handleSell = e =>{
        e.preventDefault();
        // need to know if submit was to buy, then do buy process, if sell, then sell process
        // get num shares to buy
        let sell = e.target.sell.value;
        console.log(sell)
        // fetch to see if user has those shares, post the new share amount for that user's stock 
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
                    <input type="text" className='col form-control' placeholder='Enter shares to buy' name='buy'/>
                    <input type="submit" value='Buy' className='col-4 btn btn-dark ' />
                {/* </div> */}
            </form>
            {/* onsubmit the form you should handle the submit to get the input, check if user has that portfolio money, and buy the shares for that ticker */}
            <form onSubmit={handleSell} className='row my-4'>
                {/* <div className="form-group"> */}
                    <label htmlFor="sell"></label>
                    <input type="text" className='col form-control' placeholder='Enter shares to sell' name='sell'/>
                    <input type="submit" value='Sell' className='col-4 btn btn-dark ' />
                {/* </div> */}
            </form>
        </>
    )
}
