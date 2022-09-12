// SHOWS STOCK TICKER, STOCK PRICE, STOCK HISTORICAL GRAPH PERFORMANCE, AS WELL AS FINANCIAL INFO LIKE PE RATIO, MARKET CAP, 52W HIGH/LOW. SHOWS TRADE BUTTON TO REDIRECT USER TO TRADE PAGE
import React from 'react'

export default function Stock() {

    // useState to check which stock was clicked by the user...

    return (
        <>
            {/* row1: ticker, > company name, trade btn, > price, % increase */}
            <div className='row lead'>
                <p>ticker</p> 
                <h1 className='col display-5'>Company Name</h1>
                <a className='col-3 btn btn-primary' href="/trade">Trade</a>
            </div>
            {/* row2: price, % */}
            <div className="row gy-3">
                <p className='col'>$ current price</p>
                <p className='col'>% up/down</p>
            </div>
            {/* row3: chart */}
            <div className="row border rounded m-3" style={{height: '25vh'}}></div>
            {/* row4:  */}
            <div className="row gy-3">
                <div className="col">Your shares:</div>
                <div className="col">num shares</div>
                <div className="col">Your market value:</div>
                <div className="col">$ value</div>
            </div>
            {/* row5: financials - 52w-high, 52low, pe-ratio, mktcap, dividendyield, trading volume */}
            <div className="row">
                <div className="col-3">52-week high:</div>
                <div className="col-3">hey</div>
                <div className="col-3">PE ratio:</div>
                <div className="col-3">hey</div>
                <div className="col-3">52-week low:</div>
                <div className="col-3">hey</div>
                <div className="col-3">Div yield:</div>
                <div className="col-3">hey</div>
                <div className="col-3">Market cap:</div>
                <div className="col-3">hey</div>
                <div className="col-3">Volume:</div>
                <div className="col-3">hey</div>
            </div>
        </>
    )
}
