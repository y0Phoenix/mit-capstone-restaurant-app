import React, { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State'
import Navbar from './Navbar';

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.user.isAuthenticated
});

const connecter = connect(mapStateToProps);

type Props = ConnectedProps<typeof connecter>;

const Sidebar: React.FC<Props> = ({isAuthenticated}) => {
    if (!isAuthenticated) return null;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                    <Navbar />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default connecter(Sidebar);