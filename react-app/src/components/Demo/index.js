import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './index.css'

function DemoUser() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential:'demo@aa.io', password:'password' }))}
    return(
        <button className="demo-btn" onClick={handleSubmit} type="submit">Demo User</button>
    )
}

    export default DemoUser;
