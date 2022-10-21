// SHOWS A SEARCHBAR WHERE USER CAN LOOK FOR A COMPANY/STOCK SYMBOL, SEARCH RESULTS APPEAR, USER CLICKS ON A VALUE REDIRECTS TO STOCK PAGE
    // missing link when clicking btn to that stock's page...
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { apiKey } from './Keys'

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
    const handleSearch = e => {
        let q = e.target.value;
        setSearch(q)
    };

    const handleClick = e => {
        console.log(e.target.innerText)
        props.changeTicker(e.target.innerText)
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
                    <>
                        <p key={i} className='m-2'>{stock.description}</p>
                        <Link onClick={handleClick} to='/stock' className="row border rounded my-1 btn btn-light w-100 fs-1">{stock.symbol}</Link>
                    </>
                    )
            })}
        </>
    )
}
