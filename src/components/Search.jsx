// SHOWS A SEARCHBAR WHERE USER CAN LOOK FOR A COMPANY/STOCK SYMBOL, SEARCH RESULTS APPEAR, USER CLICKS ON A VALUE REDIRECTS TO STOCK PAGE
import React, { useEffect, useState } from 'react'
import { apiKey } from './APIKey'

export default function Search(props) {

// create simple search bar, where user needs to click or press 'enter' once they search, and fetch from api the search term...or flash msg
    // create useState as null for ticker search results data (will get from api) is a list
    const [results, setResults] = useState([]);
    // create useState as null for ticker symbol (will collect from user) is a str
    const [search, setSearch] = useState(null);
    // create useEffect to display on every search render, include url w dynamic search keyword option, fetch list data (console.log)
    useEffect(() => {
        if (search) {
            fetch(`https://finnhub.io/api/v1/search?q=${search}&token=${apiKey}`) // IF THIS WORKS, TRY SETTING THE API KEY TO A FN VS VARIABLE
            .then(res => res.json())
            .then(data => {
                let searchResults = data.result;
                setResults(searchResults)
            })

        }
    }, [search]) // INSERT TERM TO KEEP EFFECT IN LIST LATER []
    // create handle submit when user enters ticker input to change the state of the search keyword and update/fetch search results list
    let handleSearch = e => {
        let q = e.target.value;
        if (q.length > 2) {
            // console.log(q)
            setSearch(q)
        }
    }
    
    
    return (
        <>
            <div className="input-group rounded mb-4">
                <input onChange={handleSearch} type="search" className="form-control rounded" placeholder="Search a ticker/company name" aria-label="Search" aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search"></i>
                </span>
            </div>
            {/* map the results list items each to a simple card */}
            {results.map((stock, i) => {
                return (
                <a key={i} href='/stock' className="row border rounded my-1 btn btn-light w-100">
                    <p className='col m-2'>{stock.symbol}</p>
                    <p className='col m-2'>{stock.description}</p>
                </a>
                )
            })}
                {/* create table here where you can click on the correct stock ticker, and person is directed to the stock page for that ticker */}
        </>
    )
}
