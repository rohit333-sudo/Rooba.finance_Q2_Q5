import React, { useState, useEffect } from "react";
import axios from "axios";
function Form() {
  let obj = { Password: "", Email: "", Country: "", Name: "", Age: "" };
  const [msg, setMsg] = useState("");
  const [isSubmit, setSubmit] = useState(false);
  const [data, setData] = useState(obj);
  const [err, setErr] = useState({ err: "" });
  useEffect(() => {
    const isComplete = Object.values(data).every((value) => value !== "");
    setSubmit(isComplete);
  }, [data]);

  function handleData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    setErr(validate(data));
    console.log("object data", Object.values(data));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("handle submit");
    // setSubmit(true);
    setMsg(" Message Sent");
    localStorage.setItem("data", JSON.stringify(data));
    try {
      const response = await axios.post(
        "http://localhost:5000/post/user",
        data
      );
      console.log(response);
    } catch (error) {
      console.error("Axios error msg:", error);
      // Handle error: for example, show an error message
    }
  }
  function validate(data) {
    let err = {};
    console.log("validate");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (data.Email && !emailRegex.test(data.Email))
      err.Email = "enter correct email";
    if (data.Password && data.Password.length <= 8)
      err.Password = "password length should be 8 or more";
    console.log(err);
    return err;
  }

  return (
    <>
      <div data-aos="zoom-in-down" data-offset="250" className="container ">
        <div className="row ">
          <div className="text-primary marg">
            <h1 className="text-center ">SignUp form</h1>
            <hr className="m-auto w-25" />
          </div>
          <div className="col-lg-6 ">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="row g-3"
            >
              <div className="col-12">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  onChange={(e) => handleData(e)}
                  value={data.Name}
                  name="Name"
                  type="text"
                  className="form-control"
                  id="inputName"
                />
                {err.Name && <span style={{ color: "red" }}>{err.Name}</span>}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  onChange={(e) => handleData(e)}
                  name="Email"
                  type="text"
                  value={data.Email}
                  className="form-control"
                  id="inputEmail4"
                />
                {err.Email && <span style={{ color: "red" }}>{err.Email}</span>}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => handleData(e)}
                  name="Password"
                  type="password"
                  value={data.Password}
                  className="form-control"
                  id="inputPassword4"
                />
                {err.Password && (
                  <span style={{ color: "red" }}>{err.Password}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                  Country
                </label>
                <input
                  onChange={(e) => handleData(e)}
                  name="Country"
                  type="text"
                  value={data.City}
                  className="form-control"
                  id="inputCity"
                />
                {err.City && <span style={{ color: "red" }}>{err.City}</span>}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputAge" className="form-label">
                  Age
                </label>
                <input
                  onChange={(e) => handleData(e)}
                  name="Age"
                  value={data.Age}
                  min="0"
                  max="150"
                  type="number"
                  className="form-control"
                  id="inputAge"
                />
                {err.Age && <span style={{ color: "red" }}>{err.Age}</span>}
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="w-100 btn btn-primary"
                  disabled={!isSubmit}
                >
                  Submit
                </button>{" "}
                {msg && (
                  <span
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    className="text-success me-5"
                  >
                    {msg} ....!{" "}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
