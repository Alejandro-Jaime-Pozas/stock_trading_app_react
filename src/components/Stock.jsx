// SHOWS STOCK TICKER, STOCK PRICE, STOCK HISTORICAL GRAPH PERFORMANCE, AS WELL AS FINANCIAL INFO LIKE PE RATIO, MARKET CAP, 52W HIGH/LOW. SHOWS TRADE BUTTON TO REDIRECT USER TO TRADE PAGE
    // display info from finnhub for a particular stock
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiKey, apiKeyAlpha, urlMain } from '../Keys'
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
    const [stockHistory, setStockHistory] = useState([])
    const [needPremium, setNeedPremium] = useState(false)
    // const [stockDatesState, setStockDatesState] = useState([])


    useEffect(() => {
        document.title = props.ticker 
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
        fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${props.ticker}&metric=all&token=${apiKey}`)
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
        fetch(`https://finnhub.io/api/v1/quote?symbol=${props.ticker}&token=${apiKey}`)
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
        
        // fetch stock price history
        // need to fetch 1 year of historical data, weekly: Math.floor((Date.now()-(365*24*60*60*1000))/1000)
        // AS OF 12/2023 THIS IS A PREMIUM API ENDPOINT!!!
    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${props.ticker}&resolution=W&from=${Math.floor((Date.now()-(365*24*60*60*1000))/1000)}&to=${Math.floor(Date.now()/1000)}&token=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.error(data.error)
                setNeedPremium(true)
            } else {
                setStockHistory(data)
                }
            })
    }, [props.ticker]);

    // fetch stock price history by month
    useEffect(() => {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${props.ticker}&apikey=${apiKeyAlpha}`)
        .then(res => res.json())
        .then(data => console.log(data))
    }, [props.ticker])


    // FINNHUB: takes a stock's timestamps array and converts to dates array
    const stockDates = unix_timestamps => {
        const dates = unix_timestamps.map(unix => {
            const d = new Date(unix * 1000)
            return d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear()
        })
        return dates
    };

    // ALLPHAVANTAGE: takes a stock's date string and converts to mm-dd format

    // console.log('here is the ticker: ', typeof props.ticker, props.ticker);
    // console.log(financials, quote, companyInfo, userStock)
    

    return (
        <>
            {/* row1: ticker, > company name, trade btn */}
            {/* <div className="">{new Date(1638750635000)}</div> */}
            <div className='row lead '>
                <div className="row mb-3 d-flex align-items-end">
                    <img className='stock_image_logo img-fluid col-2 rounded ' src={companyInfo.logo} alt="" style={{ filter: 'grayscale(100%)' }} />
                    <p className='col mb-0 me-2 text-end'>{props.ticker}</p> 
                </div>
                <div className="row ">
                    <h1 className='col display-5 mb-3'>{companyInfo.name}</h1>
                    <Link to="/trade" className='col-3 btn btn-dark align-self-center mb-3 me-3'>Trade</Link>
                </div>
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
            {/* HISTORICAL STOCK PRICES/CANDLES NO LONGER FREE FEATURE 12/2023 */}
            {needPremium ? 
            <p className="col text-center lead fst-italic text-warning">Sorry, charts are a PREMIUM feature</p>
            :
            null 
            }
            {/* need to import Chart from 'chart.js/auto' as above to be able to view charts... */}
            {/* new chart */}
                <div className='row justify-content-center mb-4 '>
                    <Line
                        data={{
                            // change labels to dates of included timestamps >>> stockHistory.t
                            labels: stockHistory.t ? stockDates(stockHistory.t) : null,
                            datasets: [
                                {
                                    // need to create a new array w timestamps mapped to dd/mm/yyyy
                                    label: props.ticker,
                                    data: stockHistory.c,
                                    backgroundColor: quote.dp >= 0 ? 'green' : 'red',
                                    borderColor: quote.dp >= 0 ? 'green' : 'red',
                                }
                            ]
                        }}
                        // height={200}
                        // width={300}
                        options={{
                            // display option within scales removes x axis labels...
                            scales: {
                                x: {
                                    ticks: {
                                        display: false
                                    }
                                }
                            },
                            // maintainAspectRatio: false,
                            responsive: true,
                            legend: {
                                display: false
                            },
                            tooltips: {
                                callbacks: {
                                   label: function(tooltipItem) {
                                          return tooltipItem.yLabel;
                                   }
                                }
                            }
                        }}
                    />
                </div>
            {/* row4:  */}
            <div className="row gy-3">
                {/* need user's num of shares for this */}
                <div className="col mb-3"><b>Your shares:</b></div>
                <div className="col mb-3">{Number((userStock.total_shares)) ? Number((userStock.total_shares))?.toLocaleString() : 0}</div>
                <div className="col mb-3"><b>Your market value:</b></div>
                <div className="col mb-3">${Number((userStock.real_value)) ? Number((userStock.real_value)?.toFixed(2)).toLocaleString() : 0}</div>
            </div>
            {/* row5: financials - 52w-high, 52low, pe-ratio, mktcap, dividendyield, trading volume */}
            <div className="row">
                <div className="col-3 mb-3"><b>52-week high:</b></div>
                <div className="col-3 mb-3">${Number(financials['52WeekHigh'])?.toFixed(2)}</div>
                <div className="col-3 mb-3"><b>PE ratio:</b></div>
                <div className="col-3 mb-3">{Number(financials['peInclExtraTTM']) ? Number(financials['peInclExtraTTM'])?.toFixed(2) : 'NA' }</div>
                <div className="col-3 mb-3"><b>52-week low:</b></div>
                <div className="col-3 mb-3">${Number(financials['52WeekLow'])?.toFixed(2)}</div>
                <div className="col-3 mb-3"><b>Div yield:</b></div>
                <div className="col-3 mb-3">{Number(financials['dividendYieldIndicatedAnnual']) ? Number(financials['dividendYieldIndicatedAnnual'])?.toFixed(2) : 'NA'}</div>
                <div className="col-3 mb-3"><b>Market cap:</b></div>
                <div className="col-3 mb-3">${Number(financials['marketCapitalization']) ? Number((financials['marketCapitalization'])?.toFixed(2)).toLocaleString() : 0}</div>
                <div className="col-3 mb-3"><b>Volume:</b></div>
                <div className="col-3 mb-3">{Number(financials['10DayAverageTradingVolume'])?.toFixed(2)}</div>
            </div>
            <div hidden>
                <Trade userStock={userStock} hidden />
            </div>
        </>
    )
}
