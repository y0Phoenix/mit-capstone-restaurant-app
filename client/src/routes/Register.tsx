import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { setAlert } from '../actions/alert';
import { register } from '../actions/user';
import State from '../types/State';

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.user.isAuthenticated
});

const connector = connect(mapStateToProps, {setAlert, register});
type Props = ConnectedProps<typeof connector>;

import React, {useState} from 'react'

const Register: React.FC<Props> = ({setAlert, register, isAuthenticated}) => {
  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        password2: ''
    });
    const [passType, setPassType] = useState('password');
    const [passType2, setPassType2] = useState('password');
    const {
        email,
        password,
        password2,
        name
    } = formData;
    
    const onsubmit = (e: any) => {
        e.preventDefault();
        register(formData, setAlert);
    };
    const onchange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value});
    const toggleShowPass = (which: string) => {
        if (which == '1') {
            if (passType == 'password') return setPassType('text');
           return setPassType('password');
        }
        if (passType2 == 'password') return setPassType2('text');
        return setPassType2('password')
    };
    return (
        <div className='landing'>
            <Card style={{width: '425px', height: '835px'}}>
        <Card.Img variant='top' src='https://github.com/y0Phoenix/mit-capstone-restaurant-app/blob/master/shared/logo_50.png?raw=true'></Card.Img>
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
                  type={passType}
                  onChange={e => onchange(e)}>
                </Form.Control>
                <Button type='button' variant='secondary' id='button-addon2' onClick={() => toggleShowPass('1')}>
                  <i className='fa-solid fa-eye'></i>
                </Button>
                <InputGroup.Text id='basic-addon2'>atleat 6 characters</InputGroup.Text>
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='basic-addon1'>*</InputGroup.Text>
                <Form.Control
                  placeholder='Repeat Password'
                  value={password2}
                  name='password2'
                  type={passType2}
                  onChange={e => onchange(e)}>
                </Form.Control>
                <Button type='button'variant='secondary' id='button-addon2' onClick={() => toggleShowPass('2')}>
                  <i className='fa-solid fa-eye'></i>
                </Button>
                <InputGroup.Text id='basic-addon2'>must match</InputGroup.Text>
              </InputGroup>
              <div className="link">
                <Link to={'/'} className='link'>
                    <small>
                        Already Registered? Click to Login
                    </small>
                </Link>
              </div>
              <br></br>
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

export default connector(Register);