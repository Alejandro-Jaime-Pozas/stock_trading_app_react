// SHOWS STOCK TICKER, STOCK PRICE, STOCK HISTORICAL GRAPH PERFORMANCE, AS WELL AS FINANCIAL INFO LIKE PE RATIO, MARKET CAP, 52W HIGH/LOW. SHOWS TRADE BUTTON TO REDIRECT USER TO TRADE PAGE
    // display info from finnhub for a particular stock
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiKey } from './Keys'

export default function Stock(props) {

    // useState for financials, quote data
    const [financials, setFinancials] = useState({})
    const [quote, setQuote] = useState({})

    // fetch data for AAPL or clicked stock 
    // (will need to make 2 fetches total for price and financials)
    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${props.ticker}&metric=all&token=${apiKey}`) // change AAPL later to props.ticker
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error)
                } else {
                    let metrics = data.metric;
                    // set state of financials
                    setFinancials(metrics)
                }
            })
    }, []) // could include props.ticker adn apiKey, since they are used in hook but defined outside of it...

    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/quote?symbol=${props.ticker}&token=${apiKey}`) // change AAPL later to props.ticker
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error)
                } else {
                    setQuote(data)
                }
            })
    }, []) // could include props.ticker and apiKey, since they are used in hook but defined outside of it...

    return (
        <>
            {/* row1: ticker, > company name, trade btn, > price, % increase */}
            <div className='row lead'>
                <p>{props.ticker}</p> 
                <h1 className='col display-5'>{props.ticker}</h1>
                {/* fix this button to be link */}
                <Link to="/trade" className='col-3 btn btn-dark align-self-center'>Trade</Link>
            </div>
            {/* row2: price, % */}
            <div className="row gy-3">
                {/* need fetch stock quote for this */}
                <p className='col lead'>${quote.c}</p>
                <p className='col-3 lead text-start'>{quote.dp}%</p>
            </div>
            {/* row3: chart */}
            <div className="row border rounded m-3" style={{height: '25vh'}}></div>
            {/* row4:  */}
            <div className="row gy-3">
                {/* need user's num of shares for this */}
                <div className="col">Your shares:</div>
                <div className="col">insert num shares</div>
                <div className="col">Your market value:</div>
                <div className="col">insert $ value</div>
            </div>
            {/* row5: financials - 52w-high, 52low, pe-ratio, mktcap, dividendyield, trading volume */}
            <div className="row">
                <div className="col-3">52-week high:</div>
                <div className="col-3">${financials['52WeekHigh']}</div>
                <div className="col-3">PE ratio:</div>
                <div className="col-3">{financials['peInclExtraTTM']}</div>
                <div className="col-3">52-week low:</div>
                <div className="col-3">${financials['52WeekLow']}</div>
                <div className="col-3">Div yield:</div>
                <div className="col-3">{financials['dividendYieldIndicatedAnnual']}</div>
                <div className="col-3">Market cap:</div>
                <div className="col-3">${financials['marketCapitalization']}</div>
                <div className="col-3">Volume:</div>
                <div className="col-3">{financials['10DayAverageTradingVolume']}</div>
            </div>
        </>
    )
}
