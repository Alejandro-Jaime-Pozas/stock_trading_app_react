    // display only 2 decimal points for price, and %
    // be able to fetch multiple requests to display each stock's real price quote...
// add user's holdings of each stock to the stock view...# of shares * current price
// add user's portfolio value to top
// add link/naviagate to STOCK page when user clicks a stock
// SHOWS USERS PORTFOLIO TOTAL VALUE, HISTORIC PRICE, STOCKS THEY OWN, STOCKS IN THEIR WATCHLIST
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiKey, urlMain } from './Keys'

export default function Portfolio(props) {

    // console.log(props.loggedIn)
    let portfolio = ['AAPL', 'AMZN', 'ROKU']
    const [quotes, setQuotes] = useState({})
    const [userStocks, setUserStocks] = useState([])
    // const [shares, setShares] = useState(null)
                
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
            fetch(`${urlMain}/portfolio/${user_id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                        setUserStocks(result)
                        // console.log(result)
                    })
                    .catch(error => console.log('error', error));
                // console.log('did data above print 3?')
    }, [])

    // finnhub: need useEffect to fetch and store each stock price for each ticker in a new array, then display the desired data in return fn
    // okay, esta muy random lo que hace el useeffect con el fetch. osea agarra las stocks random sin orden y las imprime tres veces cada una.
    // let prices = []

    // useEffect(() => {
    //     // try creating a list here, add info to list, then set the state to that list after for loop...
    //     for (let ticker of portfolio){
    //         fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 // console.log(data)
    //                 setQuotes(data)
    //                 // prices.push(data)
    //                 // console.log(data)
    //             })
    //             .catch(err => console.log(err))
    //         }
    //     }, [])
    // console.log(quotes) // this is printing before the console in for loop...

    // let xlist = []
    // xlist.push('something here')
    // console.log(xlist[0])
        
    const handleClick = e => {
        // console.log(e.target.innerText)
        props.changeTicker(e.target.innerText)
    }

    const portfolioValue = () => {
        let total = 0
        // console.log(userStocks)
        for (let stock of userStocks){
            total += stock.real_value
        }
        return Number(total?.toFixed(2)).toLocaleString()
    }

    return (
        <div>
            <div className='row'>
                <h1>{quotes.c}</h1>
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
                {/* the reason this doesn't update is it's not linked at all to the stock's real price. need to do multiple fetches one for each stock user owns to get real time quote */}
                <div className="">
                    {userStocks.map((stock, i) => {
                        return (
                            <div key={i} className="row border-top align-items-center">
                                <Link to='/stock' onClick={handleClick} className="col">{stock.ticker}</Link>
                                <p className="col mt-3">${stock.new_price?.toFixed(2).toLocaleString()}</p>
                                <p className="col mt-3">{stock.total_shares?.toLocaleString()}</p>
                                <p className="col mt-3">${(stock.real_value?.toFixed(2)).toLocaleString()}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* <div className="row my-5">
                {userStocks[0] ? null : <Link to='/search' className='btn btn-dark w-50 align-self-center col' >Start Searching for some stocks</Link>}
            </div> */}
        </div>
    )
}
