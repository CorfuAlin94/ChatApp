import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../context/auth";

const USER_LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

function Login() {
  const navigate = useNavigate();

  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useAuthDispatch();

  const [loginUser, { loading }] = useLazyQuery(USER_LOGIN, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      dispatch({ type: "LOGIN", payload: data.login });
      navigate("/chat");
    },
  });

  const submitForm = (e) => {
    e.preventDefault();
    console.log(variables);
    loginUser({ variables });
  };

  return (
    <div>
      <form className="ui form" onSubmit={submitForm}>
        <h1>Login to Account</h1>
        <div className="field">
          <label className={errors.username ? "errors" : ""}>
            {errors.username ? `${errors.username}` : "Username"}
          </label>
          <input
            type="text"
            name="first-name"
            placeholder="Username"
            value={variables.username}
            onChange={(e) =>
              setVariables({ ...variables, username: e.target.value })
            }
            required
          />
        </div>

        <div className="field">
          <label className={errors.password ? "errors" : ""}>
            {errors.password ? `${errors.password}` : "Password"}
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={variables.password}
            onChange={(e) =>
              setVariables({ ...variables, password: e.target.value })
            }
            required
          />
        </div>
        <br />
        <button className="ui button" type="submit" disabled={loading}>
          {loading ? "Loading.." : "Login"}
        </button>
        <p>
          Don't have an account? <Link to="/registration">Register</Link>{" "}
        </p>
      </form>
    </div>
  );
}
export default Login;
