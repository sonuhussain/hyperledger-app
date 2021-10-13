import React, { useState } from "react";
import axios from "axios";

export default function InstantiateChainCode() {
  const [values, setValues] = useState({});
  
  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
      functionName: "Init",
      args: [""],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://10.1.11.184:3000/channels/mychannel/chaincodes", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.token);
        alert("Success");
      })
      .catch((err) => {
        alert("error message");
      });
  };

  return (
    <div className="instant-code-chain container">
      <div className="heading-txt">
        <h1>Instantiate ChainCode</h1>
      </div>

     
      <div className="input-group mb-3">
        <div className="form-group">
          <label htmlFor="namechain">ChainCode Name</label>
          <input
            type="text"
            className="form-control function-txt p-0"
            placeholder="ChaininCode Name"
            id="namechain"
            name="chaincodeName"
          onChange={handleChange}
          value={values.chaincodeName || ""}
          />
        </div>
      </div>

      <div className="input-group mb-3">
        <div className="form-group">
          <label htmlFor="function">ChainCode Version</label>
          <input
            type="text"
            className="form-control function-txt p-0"
            placeholder="ChainCode Version"
            id="function"
            name="chaincodeVersion"
            onChange={handleChange}
            value={values.chaincodeVersion || ""}
          />
        </div>
      </div>

      <div className="input-group mb-0">
        <div className="input-group-prepend">
          <label htmlFor="inputGroupSelect01">ChainCode Type</label>
        </div>
      </div>
      <div className="input-group-bdr mb-3">
        <select
          className="custom-select p-0"
          name="chaincodeType"
          onChange={handleChange}
          value={values.chaincodeType || ""}
        >
          <option selected></option>
          <option value="node"> node</option>
          {/*  <option value="java">java</option>
          <option value="golang">golang</option> */}
        </select>
      </div>

      <div className="btn intantiate-btn mt-2">
        <button
          type="button"
          className="inp-intantiate-btn"
          onClick={handleSubmit}
        >
          INSTANTIATE
        </button>
      </div>
    </div>
  );
}
