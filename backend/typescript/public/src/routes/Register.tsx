import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import pic from '../../pictures/logo_50.png';
import { Link } from 'react-router-dom';

import React, {useState} from 'react'

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        password2: ''
    });
    const {
        email,
        password,
        password2,
        name
    } = formData;
    
    const onsubmit = (e: any) => {};
    const onchange = (e: any) => {};
    return (
        <div className='landing'>
            <Card style={{width: '425px', height: '800px'}}>
        <Card.Img variant='top' src={pic}></Card.Img>
        <Card.Body>
          <Card.Title>Register New User For Your Admin Dashboard</Card.Title>
          <br></br>
          <form autoComplete='off' onSubmit={e => onsubmit(e)}>
            <Card.Text>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='basic-addon1'>*</InputGroup.Text>
                <Form.Control
                  placeholder='Username'
                  value={name}
                  name='name'
                  onChange={e => onchange(e)}>
                </Form.Control>
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='basic-addon1'>*</InputGroup.Text>
                <Form.Control
                  placeholder='Email'
                  value={email}
                  name='email'
                  onChange={e => onchange(e)}>
                </Form.Control>
                <InputGroup.Text id='basic-addon2'>@example.com</InputGroup.Text>
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='basic-addon1'>*</InputGroup.Text>
                <Form.Control
                  placeholder='Password'
                  value={password}
                  name='password'
                  onChange={e => onchange(e)}>
                </Form.Control>
                <InputGroup.Text id='basic-addon2'>atleat 6 characters</InputGroup.Text>
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='basic-addon1'>*</InputGroup.Text>
                <Form.Control
                  placeholder='Repeat Password'
                  value={password2}
                  name='password2'
                  onChange={e => onchange(e)}>
                </Form.Control>
                <InputGroup.Text id='basic-addon2'>must match</InputGroup.Text>
              </InputGroup>
              <motion.button className='btn btn-dark' whileHover={{scale: 1.07}} type='submit'>
                Register
              </motion.button>
            </Card.Text>
          </form>
        </Card.Body>
      </Card>
        </div>
    )
}

export default Register