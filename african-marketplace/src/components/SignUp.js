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
import styled from "styled-components";
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

const Form = styled.form`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 300;
  color: white;
  background-image: url("https://images7.alphacoders.com/912/912808.jpg");
  background-size: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  padding: 50px;
  align-items: space-between;
  justify-content: space-between;
  align-content: center;
  justify-items: space-between;

  h1 {
    font-size: 1.4rem;
    padding: 3px;
    font-weight: 300;
    background: rgb(43, 43, 46);
    background: linear-gradient(
      53deg,
      rgba(43, 43, 46, 1) 0%,
      rgba(0, 0, 0, 0.5914740896358543) 0%
    );
    border-radius: 3px;
    display: flex;
    justify-content: center;
    margin: 0 30px 10px 30px;
  }
  .formControl {
    width: 50%;
    max-height: 50px;
  }

  .formControl div {
    min-width: 80%;
  }
  .submitContainer {
    width: 25%;
  }

  .MuiInputBase-input {
    color: white;
  }
  .formchild {
    border-radius: 3px;
    color: white;
    width: 60%;
    background: rgb(43, 43, 46);
    background: linear-gradient(
      53deg,
      rgba(43, 43, 46, 1) 0%,
      rgba(0, 0, 0, 0.5914740896358543) 0%
    );
  }
  textarea {
    background: transparent;
  }
  .innerContainer {
    box-sizing: border-box;
    width: 60%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

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

  return (
    <Form className="form container" onSubmit={submitForm}>
      <h1>Sign Up Now It's Free!</h1>
      <TextField
        className="formchild"
        name="name"
        label="Name"
        value={values.name}
        onChange={handleChange}
        maxLength="100"
        variant="outlined"
        size="small"
      />
      <TextField
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
      <div className="innerContainer">
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
            {countries.map((country, i) => {
              return (
                <MenuItem key={i} value={`${country}`}>
                  {country}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <div className="submitContainer">
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
      </div>
    </Form>
  );
}
