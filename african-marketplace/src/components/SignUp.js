import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import "../styles/styles.css";

let initialValues = {
  name: "",
  email: "",
  password: "",
  country: "",
  user_info: "",
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  country: "",
};

const initialDisabled = false;

export default function Signup() {
  const [values, setValues] = useState(initialValues);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [countries, setCountries] = useState([]);

  const { push } = useHistory();

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/region/africa")
      .then((res) => {
        setCountries(
          res.data.map((country) => {
            return country.name;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    updateForm(name, valueToUse);
  };

  const updateForm = (inputName, inputValue) => {
    // yup
    //   .reach(formSchema, inputName)
    //   .validate(inputValue)
    //   .then(() => {
    //     setFormErrors({ ...formErrors, [inputName]: "" });
    //   })
    //   .catch((err) => {
    //     setFormErrors({ ...formErrors, [inputName]: err.errors[0] });
    //   });
    setValues({
      ...values,
      [inputName]: inputValue,
    });
    console.log(values);
  };

  const submitForm = () => {
    const newUser = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
      country: values.country.trim(),
      user_info: values.user_info.trim(),
    };
    postNewUser(newUser);
  };

  //Registration Submit ---------------------
  const postNewUser = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post("/users/register", values)
      .then((response) => {
        console.log("Sign up success:", response);
        push("/login");
      })
      .catch((error) => {
        console.log("Sign up error", error.response.data.message);
        setFormErrors();
      });
  };

  const Form = styled.form`
    box-sizing: border-box;
    display: flex;
    border-radius: 3px;
    border: 2px solid white;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100vw;
    height: 90vh;
    padding: 50px;
    align-items: space-between;
    justify-content: space-between;
    /* align-content: space-between;
    justify-items: space-between; */
    .formchild {
      width: 60%;
    }
  `;

  return (
    <Form className="form container" onSubmit={postNewUser}>
      <TextField
        className="formchild"
        id="outlined-basic"
        name="name"
        label="Name"
        value={values.name}
        onChange={handleChange}
        maxLength="100"
        variant="outlined"
        size="small"
      />
      <TextField
        id="outlined-basic"
        name="email"
        className="formchild"
        type="email"
        value={values.email}
        onChange={handleChange}
        maxLength="100"
        label="Email"
        variant="outlined"
        size="small"
      />
      <TextField
        id="outlined-basic"
        name="password"
        className="formchild"
        type="password"
        value={values.password}
        onChange={handleChange}
        maxLength="40"
        label="Password"
        variant="outlined"
        size="small"
      />
      <textarea
        id="outlined-basic"
        name="user_info"
        className="formchild"
        type="textarea"
        value={values.user_info}
        onChange={handleChange}
        maxLength="500"
        placeholder="Information about you."
        variant="outlined"
        size="small"
      />

      <FormControl className="formControl">
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="formchild"
          name="country"
          value={values.country}
          onChange={handleChange}
        >
          {countries.map((country) => {
            return <MenuItem value={`${country}`}>{country}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <div className="container">
        <Button
          type="submit"
          className="submit"
          value="submit"
          disabled={disabled}
          variant="contained"
          color="primary"
          size="small"
          endIcon={<Icon>send</Icon>}
        >
          submit
        </Button>
        {/* <div className="errors">
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div> */}
      </div>
    </Form>
  );
}
