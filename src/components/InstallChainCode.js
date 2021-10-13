import React, { useState } from "react";
import axios from "axios";

export default function InstallChainCode() {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://10.1.11.184:3000/chaincodes", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.token);
        alert("Success")
      })
      .catch((err) => {
        alert("error message");
      });
  };

  return (
    <div className="install-code-chain container">
      <div className="heading-txt">
        <h1>Install ChainCode</h1>
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
          <label htmlFor="chaincodeversion">ChainCode Version</label>
          <input
            type="text"
            className="form-control function-txt p-0"
            placeholder="ChainCode Version"
            id="chaincodeversion"
            name="chaincodeVersion"
            onChange={handleChange}
            value={values.chaincodeVersion || ""}
          />
        </div>
      </div>



      <div className="input-group mb-0">
        <div className="input-group-prepend">
          <label htmlFor="inputGroupSelect01">Choose Chaincode</label>
        </div>
      </div>
      <div className="input-group-bdr mb-3">
        <select
          className="custom-select p-0"
          name="chaincodePath"
          onChange={handleChange}
          value={values.chaincodePath || ""}
        >
          <option selected></option>
          <option value="/home/msr/supply-chain/chaincode/dairychain">
            Dairychain
          </option>
          <option value="/home/msr/supply-chain/chaincode/medchain">
            Medchain
          </option>
          <option value="/home/msr/supply-chain/chaincode/lubechain">
            Lubechain
          </option>
        </select>
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
          {/* <option value="java">java</option>
          <option value="golang">golang</option> */}
        </select>
      </div>

      <div className="btn install-btn mt-2">
        <button type="button" className="inp-install-btn" onClick={handleSubmit}>
          INSTALL
        </button>
      </div>
    </div>
  );
}
