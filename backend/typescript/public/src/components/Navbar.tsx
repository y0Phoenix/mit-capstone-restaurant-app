import React from 'react'
import { Nav } from 'react-bootstrap'

const Navbar = () => {
  return (
    <Nav className='flex-column'>
        <Nav.Item>
            <Nav.Link href='/home'>
                Home <i className='fa-solid fa-chart-line'></i>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href='/restaurants'>
                Restaurants <i className='fa-solid fa-utensils'></i>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href='/orders'>
                Orders <i className='fa-solid fa-file-invoice'></i>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href='/account'>
                Account Management <i className='fa-solid fa-user'></i>
            </Nav.Link>
        </Nav.Item>
    </Nav>
  )
}

export default Navbar