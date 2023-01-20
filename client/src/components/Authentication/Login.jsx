import React, { useState } from "react";

const Login = ({ onChangeHandler }) => {
  const [logInputArr, setLogInputArr] = useState({});
  console.log(logInputArr);
  return (
    <form>
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
