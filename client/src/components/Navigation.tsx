import React from 'react'
import { Button, Container, Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import State from '../types/State';
import { logout } from '../actions/user'

const mapStateToProps = (state: State) => ({
    user: state.user
});

const connector = connect(mapStateToProps, {logout});

type Props = ConnectedProps<typeof connector>;

const Navigation: React.FC<Props> = ({user, logout}) => {
    return (
        <Navbar fixed='top' expand='lg' bg='light'>
            <Container>
                <Navbar.Brand href='/'>
                    Foodie <i className='fa-solid fa-utensils'></i>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end gap-xxlg'>
                    {!user.isAuthenticated ?
                        (
                            <>
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
                            </>
                        )
                        :
                        (
                            <>
                                <Navbar.Text as='div' className='flex-horizontal gap-md'>
                                    <div>
                                        Logged in as {user.name}
                                    </div> 
                                    <img className='avatar-sm' src={user.avatar}></img>
                                </Navbar.Text>
                                <Navbar.Text>
                                    <Button onClick={logout}>
                                        Logout <i className="fa-solid fa-right-from-bracket"></i>
                                    </Button>
                                </Navbar.Text>
                            </>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default connector(Navigation);