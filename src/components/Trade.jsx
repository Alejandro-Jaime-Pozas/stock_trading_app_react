// SHOWS THE STOCK TICKER, AND OPTIONS FOR USER TO BUY OR SELL (IF THEY OWN STOCK) A CERTAIN AMOUNT OF SHARES. SHOWS CALCULATION OF SHARES * PRICE WHEN BUYING/SELLING, AND USER'S PORTFOLIO VALUE IMPACT SO THEY CAN MEASURE THE TRADE'S IMPACT ON PORTFOLIO. WHEN SUBMITTED, SHOWS SUCCESS FLASH MSG
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Trade(props) {

    let navigate = useNavigate()
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

    }

    return (
        <>
            <div className="row my-5">
                <div className="col"># of shares</div>
                <div className="col-4">Choose Option</div>
            </div>
            {/* onsubmit the form you should handle the submit to get the input, check if user has that portfolio money, and buy the shares for that ticker */}
            <form onSubmit={handleBuy} className='row my-4'>
                {/* <div className="form-group"> */}
                    <label htmlFor="buy"></label>
                    <input type="text" className='col form-control' placeholder='Enter shares to buy' name='buy'/>
                    <input type="submit" value='Buy' className='col-4 btn btn-primary ' />
                {/* </div> */}
            </form>
            {/* onsubmit the form you should handle the submit to get the input, check if user has that portfolio money, and buy the shares for that ticker */}
            <form onSubmit={handleSell} className='row my-4'>
                {/* <div className="form-group"> */}
                    <label htmlFor="sell"></label>
                    <input type="text" className='col form-control' placeholder='Enter shares to sell' name='sell'/>
                    <input type="submit" value='Sell' className='col-4 btn btn-primary ' />
                {/* </div> */}
            </form>
        </>
    )
}
