    // fix useEffect not working
    // display only 2 decimal points for price, and %
    // be able to fetch multiple requests to display each stock's price info...
    // add user's holdings of each stock to the stock view...# of shares * current price
    // add user's portfolio value to top
    // add link/naviagate to STOCK page when user clicks a stock
// SHOWS USERS PORTFOLIO TOTAL VALUE, HISTORIC PRICE, STOCKS THEY OWN, STOCKS IN THEIR WATCHLIST
import React, { useEffect, useState } from 'react'
import { apiKey } from './Keys'

export default function Portfolio(props) {

    // console.log(props.loggedIn)
    // for portfolio info, need to return the current price for each stock...
    let portfolio = ['AMZN', 'AAPL', 'ROKU']
    let portfolioData = []
    const [stockInfo, setStockInfo] = useState({})
    // will need to fetch data for each individual ticker...j
    // need useEffect to store data for each ticker in new array, then display the desired data in return fn
    useEffect(() => {
            fetch(`https://finnhub.io/api/v1/quote?symbol=${props.ticker}&token=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    portfolioData.push(data)
                })
                .catch(err => console.log(err))
    }, [portfolio, portfolioData])
    console.log(portfolioData)

    return (
        <div>
            <div className='row'>
                <h1>My Portfolio</h1>
                <p>$2,500,000.00</p>
            </div>
            <div className="row border rounded m-3 " style={{height: '40vh'}}></div>
            <div className='row '>
                <p>stock info table with user's stocks showing ticker, current price, current day's % change, and users holdings value</p>
                {/* find way to do this below but for every stock the user owns, need to know the ticker, and use ticker to fetch info */}
                <p>{props.ticker} {stockInfo.c} {stockInfo.dp}% myholdings</p>
                <p>AMZN $160 +52.4% myholdings</p>
                <p>ROKU $60 -70.0% myholdings</p>
            </div>
        </div>
    )
}
