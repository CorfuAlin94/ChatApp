import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

const USER_REGISTRATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $image: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      image: $image
    ) {
      username
      email
      createdAt
    }
  }
`;

function Registration() {
  const navigate = useNavigate();

  const [variables, setVariables] = useState({
    username: "",
    password: "",
    email: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const [registrationUser, { loading }] = useMutation(USER_REGISTRATION, {
    update() {
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const submitForm = (e) => {
    e.preventDefault();
    console.log(variables);
    registrationUser({ variables });
  };

  return (
    <div className="registration">
      <form className="ui form" onSubmit={submitForm}>
        <h1>Create a Chat Account</h1>
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
          <label className={errors.email ? "errors" : ""}>
            {errors.email ? `${errors.email}` : "Email"}
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={variables.email}
            onChange={(e) =>
              setVariables({ ...variables, email: e.target.value })
            }
            required
          />
        </div>
        <div className="field">
          <label>Password</label>
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
        <div className="field">
          <div className="field">
            <label className={errors.image ? "errors" : ""}>
              {errors.image ? `${errors.image}` : null}
            </label>

            <input
              type="file"
              onChange={(e) =>
                setVariables({ ...variables, image: e.target.value })
              }
              required
            />
          </div>

          <div className="field">
            <div className="ui checkbox">
              <input id="check-b" type="checkbox" required />
              <label htmlFor="check-b">
                I agree to the <a href="_blank">Terms and Conditions</a>
              </label>
            </div>
          </div>
        </div>
        <br />
        <button className="ui button" type="submit" disabled={loading}>
          {loading ? "Loading.." : "Sign Up"}
        </button>
        <p>
          Do you have an account? <Link to="/">Login</Link>{" "}
        </p>
      </form>
    </div>
  );
}
export default Registration;
