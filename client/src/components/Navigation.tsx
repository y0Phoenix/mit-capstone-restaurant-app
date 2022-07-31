import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <Navbar fixed='top' expand='lg' bg='light'>
            <Container>
                <Navbar.Brand href='/'>
                    Foodie <i className='fa-solid fa-utensils'></i>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end gap-xxlg'>
                    <Navbar.Text>
                        <Link to={'/login'} className='link'>
                            Login <i className="fa-solid fa-user"></i>
                        </Link>
                    </Navbar.Text>
                    <Navbar.Text>
                        <Link to={'/register'} className='link'>
                            Register <i className="fa-solid fa-user-check"></i>
                        </Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation