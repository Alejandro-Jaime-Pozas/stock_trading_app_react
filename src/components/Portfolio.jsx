    // fix useEffect not working
    // display only 2 decimal points for price, and %
    // be able to fetch multiple requests to display each stock's price info...
    // add user's holdings of each stock to the stock view...# of shares * current price
    // add user's portfolio value to top
    // add link/naviagate to STOCK page when user clicks a stock
// SHOWS USERS PORTFOLIO TOTAL VALUE, HISTORIC PRICE, STOCKS THEY OWN, STOCKS IN THEIR WATCHLIST
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiKey } from './Keys'

export default function Portfolio(props) {

    // console.log(props.loggedIn)
    // for portfolio info, need to return the current price for each stock...
    let portfolio = ['AMZN', 'AAPL', 'ROKU']
    let portfolioData = []
    const [stockQuote, setStockQuote] = useState([])

    // finnhub: need useEffect to store data for each ticker in new array, then display the desired data in return fn
    useEffect(() => {
        for (let ticker of portfolio){

            fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setStockQuote(data)
                    // console.log(data)
                })
                .catch(err => console.log(err))
        }
    }, [])
    console.log(stockQuote)

    const handleClick = e => {
        console.log(e.target.innerText)
        props.changeTicker(e.target.innerText)
    }

    return (
        <div>
            <div className='row'>
                <h1>My Portfolio</h1>
                <p>insert total value $2,500,000.00</p>
            </div>
            <div className="row border rounded m-3 " style={{height: '40vh'}}></div>
            <div className='row '>
                <p>stock info table with user's stocks showing ticker, current price, current day's % change, and users holdings value</p>
                {/* find way to do this below but for every stock the user owns, need to know the ticker, and use ticker to fetch info */}
                <div className="row">
                    <p className="col">Ticker</p>
                    <p className="col">Price</p>
                    <p className="col">(+/-) %</p>
                    <p className="col">My Value</p>
                </div>
                <hr />
                <div className="row">
                    <Link to='/stock' onClick={handleClick} className="col">{portfolio[0]}</Link>
                    <p className="col">${stockQuote.c}</p>
                    <p className="col">{stockQuote.dp}%</p>
                    <p className="col">insert value</p>
                </div>
                <div className="row">
                    <Link to='/stock' onClick={handleClick} className="col">{portfolio[1]}</Link>
                    <p className="col">${stockQuote.c}</p>
                    <p className="col">{stockQuote.dp}%</p>
                    <p className="col">insert value</p>
                </div>
                <div className="row">
                    <Link to='/stock' onClick={handleClick} className="col">{portfolio[2]}</Link>
                    <p className="col">${stockQuote.c}</p>
                    <p className="col">{stockQuote.dp}%</p>
                    <p className="col">insert value</p>
                </div>
            </div>
        </div>
    )
}
