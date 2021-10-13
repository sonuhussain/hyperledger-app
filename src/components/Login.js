import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    orgName: "",
  });

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    console.log(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = Object.keys(values)
      .map((key) => `${key}=${encodeURIComponent(values[key])}`)
      .join("&");

    axios
      .post("http://10.1.11.184:3000/users", data, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }) /* values */
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        alert(localStorage.getItem("token"));
      })
      .catch((err) => {
        alert("error message");
      });
  };

  return (
    <>
      <div className="login-main-content">
        <div className="login-content">
          <h1>Create user for consortium</h1>
          <p>Register and enroll new user in the organization</p>

          <div className="input-group mb-3">
            <div className="form-group">
              <label htmlFor="username">username</label>
              <input
                type="text"
                className="form-control function-txt p-0"
                placeholder="username"
                id="username"
                name="username"
                onChange={handleChange}
                value={values.username || ""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="orgname">Org name</label>
              <input
                type="text"
                className="form-control function-txt p-0"
                placeholder="org name"
                id="orgname"
                name="orgName"
                onChange={handleChange}
                value={values.orgName || ""}
              />
            </div>
          </div>

          <div className="btn create-btn">
            <button
              type="button"
              className="inp-create-btn"
              onClick={handleSubmit}
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
