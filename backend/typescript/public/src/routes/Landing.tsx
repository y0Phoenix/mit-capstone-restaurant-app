import React, { useState } from 'react'
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import pic from '../../pictures/logo_50.png';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const {
    email,
    password,
    remember
  } = formData;

  const onsubmit = (e: any) => {};
  const onchange = (e: any) => {};
  return (
    <div className='landing'>
      <Card style={{width: '425px', height: '750px'}}>
        <Card.Img variant='top' src={pic}></Card.Img>
        <Card.Body>
          <Card.Title>Login To Your Admin Dashboard</Card.Title>
          <br></br>
          <form autoComplete='off' onSubmit={e => onsubmit(e)}>
            <Card.Text>
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
              <div className='remember-me'>
                <input type={'checkbox'} checked={remember} name='remeber' onChange={e => onchange(e)}></input>
                <small>
                  Remeber Me
                </small>
              </div>
              <small>
                <Link to={'/register'} className='link'>
                  Or Create Account
                </Link>
              </small>
              <br></br>
              <motion.button className='btn btn-dark' whileHover={{scale: 1.07}} type='submit'>
                Login
              </motion.button>
            </Card.Text>
          </form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Landing