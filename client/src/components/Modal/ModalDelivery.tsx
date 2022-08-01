import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputGroup, ListGroup, Modal } from 'react-bootstrap'
import { DeliveryModal } from '../../types/Modal'
import { UserState } from '../../types/User'
import { Delivery } from '../../types/Order';
import Alert from '../../../../backend/typescript/classes/Alert';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface Props {
    user: UserState,
    state: DeliveryModal
    resetModal: () => void,
    setAlert: (alert: Alert) => void,
    initOrder: (user: UserState, delivery: Delivery, instructions: string, callback: () => void) => void
};

const ModalDelivery: React.FC<Props> = ({resetModal, user, state, setAlert, initOrder}) => {
    const [delivery, setDelivery] = useState<Delivery>({
        address: '',
        bool: false
    });
    const [instructions, setInstructions] = useState('');
    const navigate = useNavigate();
    const handleClose = () => resetModal();
    const handleSubmit = () => {
        if (delivery.address == '')  return setAlert(new Alert({
            title: 'Invalid Input',
            text: 'Address Required',
            options: {
                type: 'modal',
                variant: 'error'
            }
        }));
        initOrder(user, delivery, instructions, handleClose);
    }
    return (
        <>
            <Modal show={state.show} onHide={handleClose}>
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title>
                        Additional Info Needed
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex-vertical gap-lg'>
                    <InputGroup>
                        <FormControl 
                            as={'textarea'}
                            placeholder='instructions...'
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />
                    </InputGroup>
                    <div className='flex-horizontal gap-sm center'>
                        <input type={'checkbox'} checked={delivery.bool} onChange={(e) => setDelivery({...delivery, bool: e.target.checked})}></input>
                        <small>Delivery</small>
                    </div>
                    {delivery.bool &&
                        <div className='flex-vertical gap-md'>
                            <InputGroup>
                                <InputGroup.Text id='basic-addon1'>*</InputGroup.Text>
                                <FormControl
                                    placeholder='address...'
                                    value={delivery.address}
                                    onChange={(e) => setDelivery({...delivery, address: e.target.value})}
                                />
                            </InputGroup>
                        </div>
                    }
                    <Button variant='primary' onClick={handleSubmit}>Proceed To Checkout</Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalDelivery;