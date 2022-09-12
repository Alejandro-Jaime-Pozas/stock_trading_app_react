// SHOWS USERS PORTFOLIO TOTAL VALUE, HISTORIC PRICE, STOCKS THEY OWN, STOCKS IN THEIR WATCHLIST
import React from 'react'

export default function Portfolio(props) {

    // console.log(props.loggedIn)


    return (
        <div>
            <div className='row'>
                <h1>My Portfolio</h1>
                <p>$2,500,000.00</p>
            </div>
            <div className="row border rounded m-3 " style={{height: '25vh'}}></div>
            <div className='row '>
                <p>stock info table with user's stocks showing ticker, current price, current day's % change</p>
            </div>
        </div>
    )
}
