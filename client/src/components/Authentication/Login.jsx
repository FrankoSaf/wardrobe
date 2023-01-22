import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { regOrLogUser } from "../../store/authAction";
const Login = ({ onChangeHandler, onSubmitHandler }) => {
  const [logInputArr, setLogInputArr] = useState({});
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const loginData = { ...logInputArr, action: "login" };
        dispatch(regOrLogUser(loginData));
      }}
    >
      <div className="">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => onChangeHandler(e, setLogInputArr)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => onChangeHandler(e, setLogInputArr)}
        />
      </div>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
