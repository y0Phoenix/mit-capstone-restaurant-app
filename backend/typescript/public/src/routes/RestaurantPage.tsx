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

const mapStateToProps = (state: State) => ({
    restaurants: state.restaurant,
    user: state.user
})

const connector = connect(mapStateToProps, {getRestaurants, updateRestaurant, setAlert, setModal, addRestaurant, filterRestaurants});

type Props = ConnectedProps<typeof connector>;

interface AddItemProps extends Props {
    restaurant: Restaurant
};

let additem: React.FC<AddItemProps> = ({setModal, restaurant}) => (
    <Button variant='primary' onClick={() => setModal({
        type: 'item',
        item: {
            show: true,
            name: '',
            price: 0,
            priceInCents: 0,
            restaurant: restaurant
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

const RestaurantPage: React.FC<Props> = ({restaurants, user, getRestaurants, updateRestaurant, setAlert, addRestaurant, filterRestaurants, setModal}) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        desc: '',
        items: []
    });
    const {name, desc, items} = formData;
    const {pathname} = useLocation();
    const save = useRef<HTMLButtonElement>(null);
    const onchange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value});
    const onchangeJSON = (e: any) => setFormData({...formData, ...JSON.parse(e.target.value)});
    const onsubmit = () => addRestaurant(new Restaurant({name, desc, items}));
    const removeItem = (name: string) => setFormData({...formData, items: items.filter(item => item.name !== name ? null : item)});
    let restaurant: Restaurant = new Restaurant({init: true});
    if (restaurants.length > 0 && !pathname.includes('new')) restaurant = restaurants[0];
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
        setFormData({...formData, name: restaurant.name, desc: restaurant.desc, items: restaurant.items})
    }, [restaurant])
    useEffect(() => {
        if (user.isAuthenticated) {
            const id = pathname.replace('/restaurant/', '');
            filterRestaurants(id, restaurants);
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
                        Restaurant {pathname.includes('new') ? 'New' : restaurant.name}
                    </Card.Header>
                    <Card.Body>
                    <Row md={2}>
                        {!pathname.includes('new') &&
                            <Col xs={6}>
                                <Card>
                                    <Card.Header>Items</Card.Header>
                                    <Card.Body>
                                        <ListGroup>
                                            {restaurant.items.length > 0 ? restaurant.items.map((item, i) => (
                                                <Fragment key={i}>
                                                    <ListGroup.Item>
                                                        <div className="flex-horizontal space-between">
                                                            <div className="flex-horizontal">
                                                                {item.name}    
                                                                {item.price}    
                                                            </div>    
                                                            <div className="flex-horizontal">
                                                                <Button variant='outine-secondary' onClick={() => setModal({
                                                                    type: 'item',
                                                                    item: {
                                                                        name: item.name,
                                                                        price: item.price,
                                                                        priceInCents: item.priceInCents,
                                                                        show: true,
                                                                        restaurant: restaurant
                                                                    }
                                                                })}>
                                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                                </Button>
                                                                <Button variant='outine-secondary'>
                                                                    <i className="fa-solid fa-x"></i>
                                                                </Button>
                                                            </div>    
                                                        </div>
                                                    </ListGroup.Item>
                                                </Fragment>
                                            )) : <AddItem restaurant={restaurant}/>}
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