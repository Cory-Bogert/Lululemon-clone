import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [address, setAddress] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = []
    if(!username.length){errors.push('Username field needs to be filled out')}
    if(username.length > 20){errors.push('Username needs to be less than 20 characters')}
    if(!email.length){errors.push('email needs to be filled out')}
    if(email.length > 40){errors.push('email needs to be less than 40 characters')}
    if(firstName.length > 40){errors.push('First name needs to be less than 40 characters')}
    if(!firstName.length){errors.push('First name field needs to be filled out')}
    if(!lastName.length){errors.push('Last name field needs to be filled out')}
    if(lastName.length > 40){errors.push('Last name needs to be less than 40 characters')}
    if(!city.length){errors.push('City field needs to be filled out')}
    if(city.length > 20){errors.push('City field needs to be less than 20 characters')}
    if(!state.length){errors.push('State field needs to be filled out')}
    if(state.length > 20){errors.push('State Field needs to be less than 20 characters')}
    if(!address.length){errors.push('Address field needs to be filled out')}
    if(address.length > 100){errors.push('Address field needs to be less than 100 characters')}
    setValidationErrors(errors)
  }, [username, email, firstName, lastName, city, state, address])


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName, city, state, address));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFirstName= (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName= (e) => {
    setLastName(e.target.value);
  };

  const updateCity= (e) => {
    setCity(e.target.value);
  };

  const updateState= (e) => {
    setState(e.target.value);
  };

  const updateAddress= (e) => {
    setAddress(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div>
                    {validationErrors.length > 0 && validationErrors.map((error) => <div className="errors-container" key={error}>{error}</div>)}
                </div>
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
          ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={lastName}
          ></input>
      </div>
      <div>
        <label>City</label>
        <input
          type='text'
          name='city'
          onChange={updateCity}
          value={city}
          ></input>
      </div>
      <div>
        <label>State</label>
        <input
          type='text'
          name='state'
          onChange={updateState}
          value={state}
          ></input>
      </div>
      <div>
        <label>Address</label>
        <input
          type='text'
          name='address'
          onChange={updateAddress}
          value={address}
          ></input>
      </div>
      <button type='submit' className='signup-btn'>Sign Up</button>
    </form>
          </>
  );
};

export default SignUpForm;
