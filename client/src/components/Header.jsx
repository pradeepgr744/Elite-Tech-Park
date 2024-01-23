import React from 'react'
import './form.css'
import { NavLink } from 'react-router-dom'


const Header = () => {
    return (
        <div className='flex'>
            <NavLink to="" >
                <h1>Student Form</h1></NavLink>
            <NavLink to="/studentdetails">
                <h1>Student Detail</h1></NavLink>
        </div>
    )
}

export default Header