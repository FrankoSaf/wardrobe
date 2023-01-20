import React, { useState } from "react";
import Login from "../../components/Authentication/Login";
import Registration from "../../components/Authentication/Registration";

const Authentication = () => {
  const [regOrLog, setRegOrLog] = useState(false);

  const onChangeHandler = (e, setArr) => {
    const inputValue = e.target.value;

    setArr((pre) => ({ ...pre, [e.target.name]: inputValue }));
  };

  return (
    <>
      {!regOrLog ? (
        <Registration onChangeHandler={onChangeHandler} />
      ) : (
        <Login onChangeHandler={onChangeHandler} />
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
