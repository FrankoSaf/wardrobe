import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { regOrLogUser } from "../../store/authAction";

const Registration = ({ onChangeHandler, onSubmitHandler }) => {
  const [regInputArr, setRegInputArr] = useState({});
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(regOrLogUser({ ...regInputArr, action: "register" }));
      }}
    >
      <div className="">
        <label htmlFor="first_name">First name</label>
        <input
          type="text"
          name="firstName"
          id="first_name"
          onChange={(e) => onChangeHandler(e, setRegInputArr)}
        />
      </div>
      <div className="">
        <label htmlFor="last_name">Last name</label>
        <input
          type="text"
          name="lastName"
          id="last_name"
          onChange={(e) => onChangeHandler(e, setRegInputArr)}
        />
      </div>
      <div className="">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => onChangeHandler(e, setRegInputArr)}
        />
      </div>
      <div className="">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => onChangeHandler(e, setRegInputArr)}
        />
      </div>
      <div className="">
        <label htmlFor="confirm_password">Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirm_password"
          onChange={(e) => onChangeHandler(e, setRegInputArr)}
        />
      </div>
      <input type="submit" value="Register" />
    </form>
  );
};

export default Registration;
