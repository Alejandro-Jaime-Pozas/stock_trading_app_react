// SHOWS STOCK TICKER, STOCK PRICE, STOCK HISTORICAL GRAPH PERFORMANCE, AS WELL AS FINANCIAL INFO LIKE PE RATIO, MARKET CAP, 52W HIGH/LOW. SHOWS TRADE BUTTON TO REDIRECT USER TO TRADE PAGE
    // display info from finnhub for a particular stock
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiKey, urlMain } from './Keys'
import Trade from './Trade'
import { Line } from 'react-chartjs-2';
// need this code below to import all of the chartjs funcionality and to view charts on web app
import Chart from 'chart.js/auto';

export default function Stock(props) {

    // useState for financials, quote data
    const [financials, setFinancials] = useState({})
    const [quote, setQuote] = useState({})
    const [companyInfo, setCompanyInfo] = useState({})
    const [userStock, setUserStock] = useState([])


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
                    for (let stock of result){
                        if (stock.ticker === props.ticker){
                            setUserStock(stock)
                        }
                    }
                        // setUserStock(result)
                        // console.log(result)
                    })
                .catch(error => console.log('error', error));
                // console.log('did data above print 3?')
    }, [props.ticker])

    // fetch financials
    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${props.ticker}&metric=all&token=${apiKey}`) // change AAPL later to props.ticker
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error)
                } else {
                    let metrics = data.metric;
                    setFinancials(metrics)
                }
            })
    }, [props.ticker]) // could include props.ticker adn apiKey, since they are used in hook but defined outside of it...

    // fetch quote
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
    }, [props.ticker]) // could include props.ticker and apiKey, since they are used in hook but defined outside of it...

    // fetch company info
    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${props.ticker}&token=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error)
                } else {
                    setCompanyInfo(data)
                }
            })
    }, [props.ticker])

    console.log(financials, quote, companyInfo, userStock)
    

    return (
        <>
            {/* row1: ticker, > company name, trade btn */}
            <div className='row lead'>
                <p className=''>{props.ticker}</p> 
                {/* <img className='col img-thumbnail w-25 h-25 me-3' src="https://static.finnhub.io/logo/81a6d1a8-80db-11ea-8d2d-00000000092a.png" alt="" /> */}
                <h1 className='col display-5 mb-3'>{companyInfo.name}</h1>
                <Link to="/trade" className='col-3 btn btn-dark align-self-center mb-3 me-3'>Trade</Link>
            </div>
            {/* row2: price, % */}
            <div className="row">
                {/* need fetch stock quote for this */}
                <p className='col lead'>${quote.c?.toFixed(2)}</p>
                {quote.dp > 0 
                ? 
                <p className='col-3 lead text-center fw-normal text-success'>{quote.dp?.toFixed(2)}%</p>
                :
                <p className='col-3 lead text-center fw-normal text-danger'>{quote.dp?.toFixed(2)}%</p>
                }
            </div>
            {/* row3: chart */}
            {/* placeholder chart */}
            {/* <div className="row border rounded m-3" style={{height: '25vh'}}> */}
            {/* need to import Chart from 'chart.js/auto' as above to be able to view charts... */}
            {/* new chart */}
                <div className='row justify-content-center mb-5 '>
                    <Line 
                        data={{
                            // how to change labels?
                            labels: [12, 19, 3, 5, 2, 3],
                            datasets: [
                                {
                                    label: '30-day',
                                    data: [12, 19, 3, 5, 2, 3],
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                }
                            ]
                        }}
                        height={100}
                        width={100}
                        options={{
                            maintainAspectRatio: true,
                        }}
                    />
                </div>
            {/* row4:  */}
            <div className="row gy-3">
                {/* need user's num of shares for this */}
                <div className="col mb-3"><b>Your shares:</b></div>
                <div className="col mb-3">{(userStock.total_shares)?.toLocaleString()}</div>
                <div className="col mb-3"><b>Your market value:</b></div>
                <div className="col mb-3">${(userStock.real_value)?.toFixed(2).toLocaleString()}</div>
            </div>
            {/* row5: financials - 52w-high, 52low, pe-ratio, mktcap, dividendyield, trading volume */}
            <div className="row">
                <div className="col-3 mb-3"><b>52-week high:</b></div>
                <div className="col-3 mb-3">${Number(financials['52WeekHigh'])?.toFixed(2)}</div>
                <div className="col-3 mb-3"><b>PE ratio:</b></div>
                <div className="col-3 mb-3">{Number(financials['peInclExtraTTM'])?.toFixed(2)}</div>
                <div className="col-3 mb-3"><b>52-week low:</b></div>
                <div className="col-3 mb-3">${Number(financials['52WeekLow'])?.toFixed(2)}</div>
                <div className="col-3 mb-3"><b>Div yield:</b></div>
                <div className="col-3 mb-3">{Number(financials['dividendYieldIndicatedAnnual'])?.toFixed(2)}</div>
                <div className="col-3 mb-3"><b>Market cap:</b></div>
                <div className="col-3 mb-3">${Number((financials['marketCapitalization'])?.toFixed(2)).toLocaleString()}</div>
                <div className="col-3 mb-3"><b>Volume:</b></div>
                <div className="col-3 mb-3">{Number(financials['10DayAverageTradingVolume'])?.toFixed(2)}</div>
            </div>
            <div hidden>
            <Trade userStock={userStock} hidden />
            </div>
        </>
    )
}
