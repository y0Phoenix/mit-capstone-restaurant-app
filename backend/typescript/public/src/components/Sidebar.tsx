import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Offcanvas, SplitButton } from 'react-bootstrap'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State'
import Navbar from './Navbar';
import {logout} from '../actions/user';
import { Link } from 'react-router-dom';

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user
});

const connecter = connect(mapStateToProps, {logout});

type Props = ConnectedProps<typeof connecter>;

const Sidebar: React.FC<Props> = ({isAuthenticated, user, logout}) => {
    if (!isAuthenticated) return null;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const account = (
        <Link to={'/account'}></Link>
    )
    return (
        <>
            <button className='sidebar' onClick={handleShow}>
                <i className='fa-solid fa-bars'></i>
            </button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Foodie Admin Dashboard
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='sidebar-body'>
                        <Navbar />
                        <div className='sidebar-account'>
                            <SplitButton variant='outline-secondary' title={user.name} href={'/account'}>
                                <Dropdown.Item>
                                    <Link to={'/account'} className='link'>
                                        Edit Account <i className='fa-solid fa-user-pen'></i>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logout}>
                                    Logout <i className='fa-solid fa-right-from-bracket'></i>
                                </Dropdown.Item>
                            </SplitButton>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default connecter(Sidebar);