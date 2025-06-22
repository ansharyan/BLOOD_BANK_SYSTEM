import React from 'react'
import {BiDonateBlood,BiUserCircle} from 'react-icons/bi'
import { useSelector} from 'react-redux'

import { useNavigate,useLocation, Link } from 'react-router-dom'

const Header = () => {
  const{user}=useSelector(state=>state.auth)
  const navigate=useNavigate();
  const location=useLocation();
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/login')
    alert('logout successfully');
  }
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
        <div className="navbar-brand h1" ><BiDonateBlood color="red"/> Blood Bank App
        </div>
        <ul className="navbar-nav flex-row">
          <li className='nav-item mx-3'>
            <p className="nav-link mx-3">
              <BiUserCircle />
              Welcome {user?.name||user?.hospitalName||user?.organisationName||'Guest'} &nbsp;
              <span className="badge text-bg-secondary">{user?.role}</span>
            </p>
          </li>
          {
            (location.pathname==='/'||location.pathname==='/donar'||location.pathname==='/hospital')?(<li className='nav-item mx-3'>
            <Link to="/analytics" className="nav-link mx-3">Analytics
            </Link>
          </li>):(<li className='nav-item mx-3'>
            <Link to="/" className="nav-link mx-3">Home
            </Link></li>)
          }

          <li className='nav-item'>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        </div>
      </nav>
    </>
  )
}

export default Header