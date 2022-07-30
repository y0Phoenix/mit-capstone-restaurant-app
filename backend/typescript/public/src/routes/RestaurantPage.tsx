import React, {Fragment, useEffect, useLayoutEffect, useRef, useState} from 'react'
import { Button, Card, Row, Col, ListGroup, InputGroup, FormControl, ButtonProps } from 'react-bootstrap'
import { connect, ConnectedProps } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { updateRestaurant, addRestaurant, filterRestaurants, getRestaurants } from '../actions/restaurant'
import State from '../types/State'
import { setAlert } from '../actions/alert'
import { Restaurant } from '../types/Restaurant'
import { setModal } from '../actions/modal'
import { Item } from '../../../interfaces/Item'
import { ConfirmModalPayload } from '../types/Modal';
import {v4 as uuid} from 'uuid';

const mapStateToProps = (state: State) => ({
    restaurant: state.restaurant,
    user: state.user
})

const connector = connect(mapStateToProps, {getRestaurants, updateRestaurant, setAlert, setModal, addRestaurant, filterRestaurants});

type Props = ConnectedProps<typeof connector>;

interface AddItemProps extends Props {
    setState: React.Dispatch<React.SetStateAction<FormData>>,
    formData: FormData
};

let additem: React.FC<AddItemProps> = ({setModal, setState, formData}) => (
    <Button variant='primary' onClick={() => setModal({
        type: 'item',
        item: {
            show: true,
            name: '',
            price: 0,
            priceInCents: 0,
            id: '',
            setState: setState,
            stateData: formData
        }
    })}>
        Add Item <i className="fa-solid fa-pen-to-square"></i>
    </Button>
)

const AddItem = connector(additem);

interface FormData {
    name: string,
    desc: string,
    items: Item[]
}

const RestaurantPage: React.FC<Props> = ({restaurant, user, getRestaurants, updateRestaurant, setAlert, addRestaurant, filterRestaurants, setModal}) => {
    const {restaurants, filtered} = restaurant
    const [formData, setFormData] = useState<FormData>({
        name: '',
        desc: '',
        items: []
    });
    const [search, setSearch] = useState('');
    const {name, desc, items} = formData;
    const {pathname} = useLocation();
    const save = useRef<HTMLButtonElement>(null);
    const onchange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value});
    const onchangeJSON = (e: any) => setFormData(JSON.parse(e.target.value));
    const onsubmit = () => {
        if (pathname.includes('new')) return addRestaurant(new Restaurant({name, desc, items}));
        updateRestaurant(new Restaurant({
            name: name,
            desc: desc,
            items: items,
            _id: _restaurant._id,
            picture: _restaurant.picture,
            date: _restaurant.date
        }));
    }
    const removeItem = ({id}: ConfirmModalPayload) => setFormData({...formData, items: items.filter(item => {
        if (item.id === id) return null;
        return item;
    })});
    let _restaurant: Restaurant = new Restaurant({init: true});
    if (filtered && !pathname.includes('new')) _restaurant = filtered[0];
    useEffect(() => {
        if (restaurants.length <= 0) getRestaurants();
    }, [])
    useEffect(() => {
        if (!save.current) return;
        if (formData.name == '' && formData.desc == '' && formData.items.length == 0) {
            save.current.disabled = true;
            return
        }
        save.current.disabled = false;
    }, [formData]);
    useEffect(() => {
        setFormData({...formData, name: _restaurant.name, desc: _restaurant.desc, items: _restaurant.items})
    }, [_restaurant])
    useEffect(() => {
        if (user.isAuthenticated) {
            const id = pathname.replace('/restaurant/', '');
            filterRestaurants({id: id, restaurantState: restaurant});
        }
    }, [pathname, user]);
    return (
        <div className='restaurants'>
            <div className='restaurants-container'>
                <Card>
                    <Card.Header className='relative'>
                        <div className='corner top-right'>
                            <Button variant='outine-secondary' ref={save} onClick={onsubmit}>
                                Save <i className="fa-solid fa-floppy-disk"></i>
                            </Button>
                        </div>
                        {
                            !pathname.includes('new') && (
                                <div className='corner top-left'>
                                    <Button variant='outine-secondary'>
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </Button>
                                </div>
                            )
                        }
                        <Card.Title>
                            {pathname.includes('new') ? 'New Restaurant' : _restaurant.name}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                    <Row md={2}>
                        {!pathname.includes('new') &&
                            <Col xs={6}>
                                <Card>
                                    <Card.Header>Items</Card.Header>
                                    <Card.Body>
                                        <ListGroup>
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                const regex = new RegExp(search, 'gi');
                                                setFormData({...formData, items: _restaurant.items.filter((item => regex.test(item.name) ? item : null))});
                                            }}>
                                                <ListGroup.Item as={'div'}>
                                                    <InputGroup>
                                                        <InputGroup.Text as='button' id='basic-addon2' className='btn btn-secondary'>
                                                            <i className='fa-solid fa-magnifying-glass'></i>
                                                        </InputGroup.Text>
                                                        <FormControl 
                                                            placeholder='search...'
                                                            value={search}
                                                            onChange={(e) => setSearch(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </ListGroup.Item>
                                            </form>
                                            {formData.items.length > 0 && formData.items.map((item, i) => (
                                                <Fragment key={i}>
                                                    <ListGroup.Item>
                                                        <div className="flex-horizontal space-between">
                                                            <div className="flex-horizontal gap-lg">
                                                                <div>
                                                                    {item.name}    
                                                                </div>
                                                                <div>
                                                                    {item.price}    
                                                                </div>
                                                            </div>    
                                                            <div className="flex-horizontal">
                                                                <Button variant='outine-secondary' onClick={() => setModal({
                                                                    type: 'item',
                                                                    item: {
                                                                        name: item.name,
                                                                        price: item.price,
                                                                        priceInCents: item.priceInCents,
                                                                        show: true,
                                                                        id: item.id,
                                                                        setState: setFormData,
                                                                        stateData: formData
                                                                    }
                                                                })}>
                                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                                </Button>
                                                                <Button variant='outine-secondary' onClick={() => {
                                                                    setModal({
                                                                        type: 'confirm',
                                                                        confirm: {
                                                                            title: 'Confirm Delete',
                                                                            text: `Confirm Deletion Of ${item.name}`,
                                                                            type: 'warning',
                                                                            show: true,
                                                                            callback: removeItem,
                                                                            payload: {
                                                                                id: item.id
                                                                            }
                                                                        }
                                                                    })
                                                                    console.log(item);
                                                                }}>
                                                                    <i className="fa-solid fa-x"></i>
                                                                </Button>
                                                            </div>    
                                                        </div>
                                                    </ListGroup.Item>
                                                </Fragment>
                                            ))}
                                            <br></br>
                                            {!pathname.includes('new') && <AddItem setState={setFormData} formData={formData}/>}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        }
                        <Col md={pathname.includes('new') ? 12 : 6}>
                            <Card>
                                <Card.Header>Details</Card.Header>
                                <Card.Body>
                                    <InputGroup>
                                        <FormControl 
                                            placeholder='name'
                                            value={name}
                                            name='name'
                                            onChange={(e: any) => onchange(e)}
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <FormControl
                                            as='textarea'
                                            rows={6}
                                            placeholder='description'
                                            value={desc}
                                            name='desc'
                                            onChange={(e: any) => onchange(e)}
                                        />
                                    </InputGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={12}>
                            <Card>
                                <Card.Header>Raw JSON</Card.Header>
                                <Card.Body>
                                    <InputGroup>
                                        <FormControl 
                                            as={'textarea'}
                                            rows={12}
                                            value={JSON.stringify(formData)}
                                            onChange={(e: any) => onchangeJSON(e)}
                                        />
                                    </InputGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default connector(RestaurantPage);