// TODO
    // be able to fetch multiple requests to display each stock's real price quote...
// SHOWS USERS PORTFOLIO TOTAL VALUE, HISTORIC PRICE, STOCKS THEY OWN, STOCKS IN THEIR WATCHLIST
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiKey, urlMain } from '../Keys'

export default function Portfolio(props) {


    const [userStocks, setUserStocks] = useState([])
    const [userQuotes, setUserQuotes] = useState({})
                
    // flask: need to get all the user's stocks to see if they already have a stock, do a put vs post a new stock...
    // create fn to fetch all the user stocks from api and return an array of those stocks
    
    // finnhub: need useEffect to fetch and store each stock price for each ticker in a new array, then display the desired data in return fn
    // okay, esta muy random lo que hace el useeffect con el fetch. osea agarra las stocks random sin orden y las imprime tres veces cada una.
    // WHAT I NEED TO DO IS, DO THE FETCH AND ALL THE FUNCTIONALITY WITHIN A FN, THEN CALL A USEEFFECT ON THE FN...
    const currentStockPrices = async (stocks) => {
        let prices = {}
        for (let stock of stocks){
                let res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${apiKey}`)
            let data = await res.json()
            prices[stock.ticker] = data.c
            // .catch(err => console.log(err))
        }
        return prices
    }
    
    useEffect(() => {
        document.title = 'My Portfolio'
        let token = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        // AbortController allows you to cancel a fetch request if user abandons page
        const controller = new AbortController();
        const signal = controller.signal; // include this in requestOptions
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            signal
            };
            fetch(`${urlMain}/portfolio/${user_id}`, requestOptions)
                .then(response => response.json())
                // create async fn within promise to handle fetch in currentStockPrices()
                .then(async result => {
                    setUserStocks(result)
                    const stockResults = await currentStockPrices(result)
                    
                    await Promise.all([
                        setUserQuotes(stockResults),
                        props.getUserInfo()
                    ])
                })
                .catch(error => console.log('error', error));

        // cleanup
        return () => {
            controller.abort();
        }
    }, [])
    

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
        return Number(total?.toFixed(0))
    }
    console.log(userQuotes)



    return (
        <div>
            <div className='row'>
                <h1>My Portfolio</h1>
                <h6 className='lead my-3'>Total Funds: 
                    <span> ${(portfolioValue() + props.info.cash).toLocaleString()}</span>
                </h6>
                <div className="row my-2">
                    <h6>Invested Funds: <span className="text-success">${portfolioValue().toLocaleString()}</span></h6>
                    <h6>Cash Funds: ${Number(props.info.cash?.toFixed(0)).toLocaleString()}</h6>
                </div>
            </div>
            {/* graph goes here */}
            <div className="row border rounded m-3 " style={{height: '15vh'}}></div>
                <div className="row table_ mx-2 ">
                    <div className="row table_headers">
                        <p className="col-3">Ticker</p>
                        <p className="col-3">Current Price</p>
                        <p className="col-3">My Shares</p>
                        <p className="col-3">My Total Value</p>
                    </div>

                    {/* this will be the data output for userStocks */}
                    {/* the reason this doesn't update is it's not linked at all to the stock's real price. need to do multiple fetches one for each stock user owns to get real time quote */}
                        {userStocks.map((stock, i) => {
                            return (
                                <div key={i} className="row border-top align-items-center ">
                                    <Link className="col-3 btn btn-dark " to='/stock' onClick={handleClick} >{stock.ticker}</Link>
                                    {/* if 429 error for too many requests, just output last stock price in userStocks */}
                                    <p className="col-3 mt-3 ">${Number(
                                        userQuotes[stock.ticker] !== undefined 
                                        ? userQuotes[stock.ticker] 
                                        : stock.new_price?.toFixed(2)
                                        ).toLocaleString()}</p>
                                    <p className="col-3 mt-3 ">{stock.total_shares?.toLocaleString()}</p>
                                    <p className="col-3 mt-3 ">${Number(stock.real_value?.toFixed(2)).toLocaleString()}</p>
                                </div>
                            )
                        })}
                </div>
            <div className="my-5 text-center container">
                {userStocks[0] ? null : <Link to='/search' className='btn btn-dark col p-2' >Search for some stocks</Link>}
            </div>
        </div>
    )
}