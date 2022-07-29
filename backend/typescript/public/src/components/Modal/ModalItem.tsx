import { type } from 'os'
import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap'
import { connect, ConnectedProps } from 'react-redux'
import { Item } from '../../../../interfaces/Item'
import { resetModal } from '../../actions/modal'
import { ItemModal } from '../../types/Modal'
import { Restaurant } from '../../types/Restaurant'
import State from '../../types/State'

interface Props {
    state: ItemModal,
    resetModal: () => void,
    updateRestaurant: (restaurant: Restaurant) => void
};

const ModalItem: React.FC<Props> = ({resetModal, state, updateRestaurant}) => {
    const [formData, setFormData] = useState<Item>({
        name: '',
        price: 0,
        priceInCents: 0
    });
    const {name, price, priceInCents} = formData;
    var restaurant = new Restaurant({init: true});
    restaurant = state.restaurant ? {...state?.restaurant} : restaurant;
    const onchange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value});
    useEffect(() => {
        setFormData({...formData, priceInCents: price * 100});
    }, [price]);
    useEffect(() => {
        setFormData({...formData, name: state.name, price: state.price, priceInCents: state.priceInCents});
    }, [state])
    return (
        <>
            <Modal show={state.show} onHide={resetModal}>
                <Modal.Header closeButton onHide={resetModal}>
                    <Modal.Title>
                        {state.name !== '' ? state.name : 'New Item'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className='mb3'>
                        <FormControl 
                            placeholder='name...'
                            value={name}
                            name='name'
                            onChange={(e: any) => onchange(e)}
                        />
                    </InputGroup>
                    <br></br>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text id='basic-addon1'>$</InputGroup.Text>
                        <FormControl 
                            placeholder='price'
                            value={price}
                            name='price'
                            onChange={(e: any) => onchange(e)}
                        />
                    </InputGroup>
                    <br></br>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text id='basic-addon1'>&cent;</InputGroup.Text>
                        <FormControl 
                            placeholder='cents'
                            value={priceInCents}
                            name='priceInCents'
                            onChange={(e: any) => onchange(e)}
                        />
                    </InputGroup>
                    <div className={`flex-horizontal space-between`}>
                        <Button variant='primary' onClick={() => {
                            restaurant.items?.push({
                                name,
                                price,
                                priceInCents
                            });
                            updateRestaurant(restaurant);
                        }}>
                            Add Item
                        </Button>
                        <Button variant='primary' type='submit'>Add Another</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalItem;