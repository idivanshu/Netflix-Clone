import React from 'react'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

const Header = () => {
  return (
    <nav className='header'>
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />

      <div>
        <Link to="/TV">TV</Link>
        <Link to="/Movie">Movie</Link>
        <Link to="/Sports">Sports</Link>
        <Link to="/Kids">Kids</Link>

      </div>
      <FiSearch />
    </nav>
  )
}

export default Header