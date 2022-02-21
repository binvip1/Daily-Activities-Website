import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'

export default function Nav() {
    return(
        <nav>
            <h3>Menu</h3>
            <ul className="nav-links">
                <Link to="/" className="nav-style">
                    <li>Home Page</li>
                </Link>
                <Link to="/TodoApp" className="nav-style">
                    <li>Todo App</li>
                </Link>
            </ul>
        </nav>
    )
}