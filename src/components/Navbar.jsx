import React from 'react'
import { Link } from 'react-router-dom'

// FIND A WAY TO NOT ALLOW NAVBAR TO OVERLAP WITH CONTENT...SOMETIMES BUTTONS/CONTENT ARE HIDDEN BEHIND
export default function Navbar(props) {
  return (
    <>
        <nav className="navbar navbar-expand bg-dark navbar-dark fixed-bottom ">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse row text-center" id="navbarNav">
                    <ul className="navbar-nav p-0">
                        <li className="nav-item col">
                        {props.loggedIn ? 
                        <Link className="nav-link " to="/portfolio"><i className="fa-solid fa-sack-dollar fa-xl"></i></Link> 
                        : 
                        <Link className="nav-link" to="/"><i className="fa-solid fa-house fa-xl"></i></Link>
                        }
                        </li>
                        <li className="nav-item col">
                        <Link className="nav-link" to="/search"><i className="fa-solid fa-magnifying-glass-dollar fa-xl"></i></Link>
                        </li>
                        <li className="nav-item col">
                        <Link className="nav-link" to="/account"><i className="fa-solid fa-user fa-xl "></i></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}
