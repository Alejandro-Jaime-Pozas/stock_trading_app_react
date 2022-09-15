    // fix useEffect not working
    // display only 2 decimal points for price, and %
    // be able to fetch multiple requests to display each stock's price info...
    // add user's holdings of each stock to the stock view...# of shares * current price
    // add user's portfolio value to top
    // add link/naviagate to STOCK page when user clicks a stock
// SHOWS USERS PORTFOLIO TOTAL VALUE, HISTORIC PRICE, STOCKS THEY OWN, STOCKS IN THEIR WATCHLIST
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiKey, urlMain } from './Keys'

export default function Portfolio(props) {

    // console.log(props.loggedIn)
    // for portfolio info, need to return the current price for each stock...
    let portfolio = ['AMZN', 'AAPL', 'ROKU']
    const [quote, setQuote] = useState({})
    const [userStocks, setUserStocks] = useState([])
    const [shares, setShares] = useState(null)
                
    // flask: need to get all the user's stocks to see if they already have a stock, do a put vs post a new stock...
    useEffect(() => {
        let token = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
            fetch(`${urlMain}/portfolio/${props.newId}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                        setUserStocks(result)
                        // console.log(result)
                    })
                    .catch(error => console.log('error', error));
                // console.log('did data above print 3?')
    }, [props.newId])

    // finnhub: need useEffect to store data for each ticker in new array, then display the desired data in return fn
    // useEffect(() => {
    //     for (let ticker of portfolio){

    //         fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 // console.log(data)
    //                 setquote(data)
    //                 // console.log(data)
    //             })
    //             .catch(err => console.log(err))
    //     }
    // }, [])
    // // console.log(quote)

    const handleClick = e => {
        // console.log(e.target.innerText)
        props.changeTicker(e.target.innerText)
    }

    const portfolioValue = () => {
        let total = 0
        for (let stock of userStocks){
            total += stock.real_value
        }
        return Number(total.toFixed(0)).toLocaleString()
    }

    return (
        <div>
            <div className='row'>
                <h1>My Portfolio</h1>
                <p className='lead'>${portfolioValue()}</p>
            </div>
            <div className="row border rounded m-3 " style={{height: '15vh'}}></div>
            <div className='row '>
                <div className="row">
                    <p className="col">Ticker</p>
                    <p className="col">Current Price</p>
                    <p className="col">My Shares</p>
                    <p className="col">My Total Value</p>
                </div>

                {/* this will be the data output for userStocks */}
                <div className="">
                    {userStocks.map((stock, i) => {
                        return (
                            <div key={i} className="row border-top align-items-center">
                                <Link to='/stock' onClick={handleClick} className="col">{stock.ticker}</Link>
                                <p className="col mt-3">${Number(stock.new_price?.toFixed(2)).toLocaleString()}</p>
                                <p className="col mt-3">{stock.total_shares?.toLocaleString()}</p>
                                <p className="col mt-3">${Number(stock.real_value?.toFixed(2)).toLocaleString()}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
