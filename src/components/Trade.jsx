// SHOWS THE STOCK TICKER, AND OPTIONS FOR USER TO BUY OR SELL (IF THEY OWN STOCK) A CERTAIN AMOUNT OF SHARES. SHOWS CALCULATION OF SHARES * PRICE WHEN BUYING/SELLING, AND USER'S PORTFOLIO VALUE IMPACT SO THEY CAN MEASURE THE TRADE'S IMPACT ON PORTFOLIO. WHEN SUBMITTED, SHOWS SUCCESS FLASH MSG
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiKey, urlMain } from './Keys'

export default function Trade(props) {

    let navigate = useNavigate()
    const [quote, setQuote] = useState({})
    const [userStocks, setUserStocks] = useState([])
    const [shares, setShares] = useState(null)
    const [totalShares, setTotalShares] = useState(null)

    // finnhub: get data for the current global ticker
    useEffect(() => {
        document.title = props.ticker 
            fetch(`https://finnhub.io/api/v1/quote?symbol=${props.ticker}&token=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setQuote(data)
                })
                .catch(err => console.log(err))
        }, [])
                
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
                        // also get the user's number of shares for that stock
                        for (let stock of result){
                            if (stock.ticker === props.ticker){
                                setTotalShares(stock.total_shares)
                                console.log('stock equals props.ticker')
                            }
                        }
                        // console.log(userStocks)
                    })
                    .catch(error => console.log('error', error));
                // console.log('did data above print 3?')
    }, [])


    const handleBuy = async e => {
        e.preventDefault();
        // get num shares to buy
        // console.log(buy)
        let token = localStorage.getItem('token');
        let new_price = quote.c;
        let new_shares = e.target.buy.value;
        for (let stock of userStocks) {
            // if user OWNS THE STOCK, DO PUT
            if (props.ticker === stock.ticker) { 
                let stock_id = stock.id;
                // console.log(stock_id, token, new_price, new_shares)
                let myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + token);
                myHeaders.append("Content-Type", "application/json");
                
                let raw = JSON.stringify({
                "new_price": new_price,
                "new_shares": Number(new_shares) // for some reason does not allow int-str transformation by aPI...
                });
                
                let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };
                
                let response = await fetch(`${urlMain}/portfolio/stocks/${stock_id}`, requestOptions);
                if (response.ok) {
                    let result = await response.json()
                    console.log(result)
                    props.flashMsg(`You have succesfully bought ${(new_shares)} more share(s) of ${stock.ticker}`, 'success')
                    navigate('/portfolio')
                } else {
                    props.flashMsg(`Sorry, you do not have enough funds to buy these shares of stock you already own`, 'warning')
                }
                return
                // fetch(`${urlMain}/portfolio/stocks/${stock_id}`, requestOptions)
                // .then(response => response.json())
                // .then(result => {
                //     console.log(result)
                //     props.flashMsg(`You have succesfully bought ${(new_shares)} more share(s) of ${stock.ticker}`, 'success')
                //     navigate('/portfolio')
                // })
                // .catch(error => console.log('error', error));

            }
        } 
        // if user does not own stock, DO A POST CREATE NEW STOCK
        let ticker = props.ticker;
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        
        let raw = JSON.stringify({
        "ticker": ticker,
        "new_price": new_price,
        "new_shares": Number(new_shares)
        });
        
        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        
        let response = await fetch(`${urlMain}/portfolio/stocks`, requestOptions);
            if (response.ok) {
                let result = await response.json()
                console.log(result)
                props.flashMsg(`You have succesfully bought ${(new_shares)} new share(s) of ${props.ticker}`, 'success')
                navigate('/portfolio')
            } else {
                props.flashMsg(`Sorry, you do not have enough funds to buy these shares of a new stock you don\'t own`, 'warning')
            }
        // fetch(`${urlMain}/portfolio/stocks`, requestOptions)
        // .then(response => response.json())
        // .then(result => {
        //     console.log(result)
        //     props.flashMsg(`You have succesfully bought ${(new_shares)} new share(s) of ${props.ticker}`, 'success')
        //     navigate('/portfolio')
        // })
        // .catch(error => console.log('error', error));
    }

    // IGNORE THIS UNTIL HANDLEBUY FN IS COMPLETE, copy paste
    const handleSell = async e =>{
        e.preventDefault();
        // fetch to see if user has those shares, post the new share amount for that user's stock 
        let token = localStorage.getItem('token');
        let new_price = quote.c;
        let new_shares = -e.target.sell.value;
        for (let stock of userStocks) {
            // if user OWNS THE STOCK, DO PUT
            if (props.ticker === stock.ticker) { 
                let stock_id = stock.id;
                // console.log(stock_id, token, new_price, new_shares)
                let myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + token);
                myHeaders.append("Content-Type", "application/json");
                
                let raw = JSON.stringify({
                  "new_price": new_price,
                  "new_shares": Number(new_shares) // for some reason does not allow int/str transformation by aPI...
                });
                
                let requestOptions = {
                  method: 'PUT',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };
                let response = await fetch(`${urlMain}/portfolio/stocks/${stock_id}`, requestOptions);
                // SOMETHING WRONG HERE FIIXX RESPONSE.OK GETTING MORE SHARES THAN USER HAS.
                if (response.ok) {
                    let result = await response.json()
                    console.log(result)
                    props.flashMsg(`You have sold ${(-new_shares)} share(s) of ${stock.ticker}`, 'info')
                    navigate('/portfolio')
                } else {
                    props.flashMsg(`Sorry, you entered more shares than you have`, 'warning')
                }
                return
                // fetch(`${urlMain}/portfolio/stocks/${stock_id}`, requestOptions)
                //   .then(response => response.json())
                //   .then(result => {
                //       console.log(result)
                //       props.flashMsg(`You have sold ${(-new_shares)} share(s) of ${stock.ticker}`, 'info')
                //       navigate('/portfolio')
                //   })
                //   .catch(error => console.log('error', error));

            }
        }
        // if user does not own stock, flash msg
        props.flashMsg(`Sorry, you can't sell a stock you don't own`, 'warning')
    }

    const handleShares = e => {
        console.log(e.target.form[0].value)
        setShares(e.target.form[0].value)
    }

    
    return (
        <>
            <Link to='/stock' className='btn btn-dark mb-3'>{`<`} Back</Link>
            <div className="row align-items-end">
                <h1 className='col display-3 m-0'>{props.ticker}</h1><p className='col-4 m-1 display-6 '>${quote.c?.toFixed(2)}</p>
            </div>
            <div className="row mt-5 ">
                <div className="col ">Your Shares: {totalShares ? totalShares.toLocaleString() : 0}</div>
            </div>
            <hr />
            {/* <div className="row my-5">
                <div className="col ">Number of Shares</div>
                <div className="col-4 mb-2">Choose Option</div>
            </div> */}
            {/* onsubmit the form you should handle the submit to get the input, check if user has that portfolio money, and buy the shares for that ticker */}
            <form onSubmit={handleBuy} className='row my-5'>
                {/* <div className="form-group"> */}
                    <label htmlFor="buy"></label>
                    <input onChange={handleShares} type="text" className='col form-control' placeholder='Enter shares to buy' name='buy' />
                    <input type="submit" value='Buy' className='col-4 btn btn-dark ' />
                {/* </div> */}
            </form>
            {/* onsubmit the form you should handle the submit to get the input, check if user has that portfolio money, and buy the shares for that ticker */}
            <form onSubmit={handleSell} className='row my-5'>
                {/* <div className="form-group"> */}
                    <label htmlFor="sell"></label>
                    <input onChange={handleShares} type="text" className='col form-control' placeholder='Enter shares to sell' name='sell' />
                    <input type="submit" value='Sell' className='col-4 btn btn-dark ' />
                {/* </div> */}
            </form>
            {shares ? <div className="row lead text-center">Total: ${(quote.c * shares)?.toFixed(2).toLocaleString()}</div> : null }
            {/* {shares ? <div className="row lead text-center">Total: ${Number((quote.c.toFixed(2) * shares)?.toFixed(2)).toLocaleString()}</div> : null } */}
        </>
    )
}
