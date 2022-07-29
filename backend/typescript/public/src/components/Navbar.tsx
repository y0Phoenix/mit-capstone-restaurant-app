import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const {pathname} = useLocation();
    const getActive = () => {
        if (pathname.includes('home')) return 'home'
        if (pathname.includes('restaurant')) return 'restaurant'
        if (pathname.includes('orders')) return 'orders'
    }
  return (
    <Nav variant='pills' defaultActiveKey={getActive()} className='flex-column'>
        <Nav.Item>
            <Nav.Link eventKey={'home'} as={'div'}>
                <Link to={'/home'} className='link'>
                    Home <i className='fa-solid fa-chart-line'></i>
                </Link>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey={'restaurant'} as={'div'}>
                <Link to={'/restaurants'} className='link'>
                    Restaurants <i className='fa-solid fa-utensils'></i>
                </Link>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey={'orders'} as={'div'}>
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