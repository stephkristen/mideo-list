import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormErrors from "./FormErrors";
import { createAccount } from "../services/auth";

const INITIAL_USER = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
};

function SignUp() {
  const [user, setUser] = useState(INITIAL_USER);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    createAccount(user)
      .then(() => {
        navigate("/login", {
          state: {
            msg: "Success! You have created your account. Please login to proceed.",
            user,
          },
        });
      })
      .catch(setErrors);
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <div className="container w-100 py-5">
        <form
          onSubmit={handleSubmit}
          className="container-fluid py-5 rounded-3"
          style={{ backgroundColor: "rgba(140, 191, 248, 0.521)" }}
        >
          <h3>Sign Up</h3>
          <div className="mb-3 row">
            <label htmlFor="firstname" className="form-label col-sm-2">
              First Name
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="form-control"
                value={user.firstname}
                onChange={handleChange}
                placeholder="Enter first name"
              ></input>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="lastname" className="form-label col-sm-2">
              Last Name
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="form-control"
                value={user.lastname}
                onChange={handleChange}
                placeholder="Enter last name"
              ></input>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="username" className="col-form-label col-sm-2">
              Username
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={user.username}
                onChange={handleChange}
                placeholder="Enter username"
              ></input>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="form-label col-sm-2">
              Password
            </label>
            <div className="col-sm-8">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter password"
              ></input>
            </div>
          </div>
          <div className="my-4" style={{ textAlign: "center" }}>
            <button className="btn btn-primary" type="submit">
              Sign up
            </button>
            <Link className="btn btn-secondary mx-3" to="/">
              Cancel
            </Link>
          </div>
          {errors.length > 0 && <FormErrors errors={errors} />}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
