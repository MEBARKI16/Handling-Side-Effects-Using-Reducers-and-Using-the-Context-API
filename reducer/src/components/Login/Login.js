import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const emailReducer = (state,action) => {
  if(action.type === 'add') {return {
      value:action.val,
      isVlid: action.val.includes('@')
  }}
  if(action.type === 'addval') {return {
    value:state.value,
    isVlid: state.value.includes('@')
}}
  return ({
    value:'',isVlid: false
  })
}
const passwordReducer = (state,action) => {
  if(action.type === 'add'){
    return ({
      value : action.val, isVlid: action.val.trim().length > 6
    })
  }
  if(action.type === 'addval'){
    return ({
      value: state.value, isVlid : state.value.trim().length > 6
    })
  }
 return ({
  value:'',isVlid: false
 })
}
const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
const [emailState,dispatchEmail] = useReducer(emailReducer,{value:'',isVlid: null})
const [passwordState,dispatchPassword] = useReducer(passwordReducer,{value:'',isVlid: null})
  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

    const {isVlid: emailvld} =emailState;
    const {isVlid: passwordvld} =passwordState;

   useEffect(() => {
     const identifier = setTimeout(() => {
       console.log('Checking form validity!');
       setFormIsValid(
         emailvld && passwordvld       );
    }, 500);

     return () => {
       console.log('CLEANUP');
       clearTimeout(identifier);
     };
   }, [emailvld, passwordvld]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'add',val:event.target.value})
   // setFormIsValid(
     // event.target.value.includes('@') && passwordState.value.trim().length > 6
   // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'add',val:event.target.value})
    //setFormIsValid(
      //emailState.value.includes('@') && event.target.value.trim().length > 6
    //);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'addval'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'addval'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isVlid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isVlid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
