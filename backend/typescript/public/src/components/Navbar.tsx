import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Nav variant='pills' defaultActiveKey={'home'} className='flex-column'>
        <Nav.Item>
            <Nav.Link eventKey={'home'}>
                <Link to={'/home'} className='link'>
                    Home <i className='fa-solid fa-chart-line'></i>
                </Link>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey={'restaurant'}>
                <Link to={'/restaurants'} className='link'>
                    Restaurants <i className='fa-solid fa-utensils'></i>
                </Link>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey={'orders'}>
                <Link to={'/orders'} className='link'>
                    Orders <i className='fa-solid fa-file-invoice'></i>
                </Link>
            </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
            <Nav.Link eventKey={'account'}>
                <Link to={'/account'} className='link'>
                    Account Management <i className='fa-solid fa-user'></i>
                </Link>
            </Nav.Link>
        </Nav.Item> */}
    </Nav>
  )
}

export default Navbar