import React, { FC, useState } from 'react'
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import pic from '../../pictures/logo_50.png';
import { Link } from 'react-router-dom';
import State from '../types/State';
import { connect, ConnectedProps } from 'react-redux';
import { setAlert } from '../actions/alert';
import { login } from '../actions/user';

const connector = connect(null, {setAlert, login});
type Props = ConnectedProps<typeof connector>;

const Landing: FC<Props> = ({setAlert, login}) => {
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

  const onsubmit = (e: any) => {
    e.preventDefault();
    login(formData, setAlert)};
  const onchange = (e: any) => setFormData({...formData, [e.target.name]: e.target.name !== 'remember' ? e.target.value : e.target.checked});
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
                <input type={'checkbox'} checked={remember} name='remember' onChange={e => onchange(e)}></input>
                <small>
                  Remeber Me
                </small>
              </div>
              <div className='link'>
                <Link to={'/register'} className='link'>
                  <small>
                    Or Create Account
                  </small>
                </Link>
              </div>
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

export default connector(Landing);