import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './index.css'

function DemoUser() {
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(sessionActions.login('demo@aa.io','password' ))}
    return(
        <button className="demo-btn" onClick={handleSubmit} type="submit">Demo</button>
    )
}

    export default DemoUser;
