// SHOWS A SEARCHBAR WHERE USER CAN LOOK FOR A COMPANY/STOCK SYMBOL, SEARCH RESULTS APPEAR, USER CLICKS ON A VALUE REDIRECTS TO STOCK PAGE
import React, { useEffect, useState } from 'react'
import apiKey from './APIKey'

export default function Search(props) {

// create simple search bar, where user needs to click or press 'enter' once they search, and fetch from api the search term...or flash msg
    // create useState as null for ticker search results data (will get from api) is a list
    const [results, setResults] = useState([]);
    // create useState as null for ticker symbol (will collect from user) is a str
    const [search, setSearch] = useState(null);
    // create useEffect to display on every search render, include url w dynamic search keyword option, fetch list data (console.log)
    console.log(apiKey)
    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/search?q=amzn&token=${apiKey}`) // IF THIS WORKS, TRY SETTING THE API KEY TO A FN VS VARIABLE
            .then(res => res.json())
            .then(data => console.log(data))
        
    }, []) // INSERT TERM TO KEEP EFFECT IN LIST LATER []
    // create handle submit when user enters ticker input to change the state of the search keyword and update/fetch search results list
    
    
    return (
        <>
            <div className="input-group rounded">
                <input type="search" name='search' className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search"></i>
                </span>
            </div>
            <div className="row border rounded my-3">
                <p className='col'>this is one paragraph</p>
                <p className='col'>this is one paragraph</p>
                <p className='col'>this is one paragraph</p>
                {/* create table here where you can click on the correct stock ticker, and person is directed to the stock page for that ticker */}
            </div>
        </>
    )
}
