import React, { useState } from "react";
import Login from "../../components/Authentication/Login";
import { useDispatch } from "react-redux";
import Registration from "../../components/Authentication/Registration";
import axios from "axios";
const Authentication = () => {
  const [regOrLog, setRegOrLog] = useState(false);
  const dispatch = useDispatch();
  const onChangeHandler = (e, setArr) => {
    const inputValue = e.target.value;

    setArr((pre) => ({ ...pre, [e.target.name]: inputValue }));
  };
  const onSubmitHandler = async (e, arrOfObj, route) => {
    e.preventDefault();
    try {
      const data = await axios.post(route, arrOfObj);
      if (route === "/auth/login") {
        dispatch(authActions.setUser(data.data));
      }
    } catch (err) {
      console.log(err.request.response);
    }
  };

  return (
    <>
      {!regOrLog ? (
        <Registration
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
        />
      ) : (
        <Login
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
        />
      )}
      {!regOrLog ? (
        <p>
          You already have an account? Then{" "}
          <button onClick={() => setRegOrLog(true)}>Login</button>
        </p>
      ) : (
        <p>
          You don't have an account? Then{" "}
          <button onClick={() => setRegOrLog(false)}>Register</button>
        </p>
      )}
    </>
  );
};

export default Authentication;
