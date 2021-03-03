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
import styled from "styled-components";
import "../styles/styles.css";
import * as yup from "yup";
import validationForm from "./validationForm";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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

const initialDisabled = true;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-sizing: border-box;
  max-width: 100%;
  height: 100vh;

  .MuiAppBar-colorPrimary {
    color: black;
    background-color: #ffd7c0;
    background-image: linear-gradient(0deg, #ffd7c0 0%, #e09d74 100%);
  }

  .navtitle {
    flex-grow: 1;
  }
`;

const Form = styled.form`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 300;
  color: #2b2b2b;
  background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
  background-size: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 100%;
  align-items: space-evenly;
  justify-content: space-evenly;
  align-content: center;
  justify-items: space-evenly;
  flex-grow: 1;

  h1 {
    font-size: 1.4rem;
    padding: 1%;
    font-weight: 300;
    background: rgb(43, 43, 46);
    background: linear-gradient(
      53deg,
      rgba(43, 43, 46, 1) 0%,
      rgba(255, 255, 255, 0.39539565826330536) 0%
    );
    border-radius: 3px;
    display: flex;
    justify-content: center;
  }
  .errors {
    border-radius: 3px;
    color: red;
    background: rgb(43, 43, 46);
    background: linear-gradient(
      53deg,
      rgba(43, 43, 46, 1) 0%,
      rgba(255, 255, 255, 0.39539565826330536) 0%
    );
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

  .formchild {
    border-radius: 3px;
    width: 60%;
    background: rgb(43, 43, 46);
    background: linear-gradient(
      53deg,
      rgba(43, 43, 46, 1) 0%,
      rgba(255, 255, 255, 0.39539565826330536) 0%
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

  // useEffect(() => {
  //   axios
  //     .get("https://restcountries.eu/rest/v2/region/africa")
  //     .then((res) => {
  //       setCountries(
  //         res.data.map((country) => {
  //           return country.name;
  //         })
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    axiosWithAuth()
      .get("/countries")
      .then((response) => {
        setCountries(response.data);
        console.log('Data Here:', response.data)
      })
      .catch((error) => {
        console.log("countries error", error);
      });
  }, []);

  // const handleChange = (event) => {
  //   const { name, value, type, checked } = event.target;
  //   const valueToUse = type === "checkbox" ? checked : value;
  //   updateForm(name, valueToUse);
  // };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    console.log('Values:', values)
  };

  const updateForm = (inputName, inputValue) => {
    yup
      .reach(validationForm, inputName)
      .validate(inputValue)
      .then(() => {
        setFormErrors({ ...formErrors, [inputName]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [inputName]: err.errors[0] });
      });
    setValues({
      ...values,
      [inputName]: inputValue,
    });
  };

  // const submitForm = () => {
  //   const newUser = {
  //     name: values.name.trim(),
  //     email: values.email.trim(),
  //     password: values.password.trim(),
  //     country: values.country.trim(),
  //     user_info: values.user_info.trim(),
  //   };
  //   postNewUser(newUser);
  // };

  //Registration Submit ---------------------
  const submitRegistration = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://ialkamal-be-amp.herokuapp.com/api/users/register", values)
      .then((response) => {
        console.log("Registration submit success", response);
        console.log(values)
        push("/login");
      })
      .catch((error) => {
        console.log("Registration error", error.response.data.message);
        console.log(values)
        setFormErrors();
        push("/login");
      });
  };

  useEffect(() => {
    validationForm.isValid(values).then((valid) => setDisabled(!valid));
  }, [values]);

  return (
    <Main className="form container" onSubmit={submitRegistration}>
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
      <Form className="innerContainer">
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
              return (
                <MenuItem 
                key={country.id}
                value={country.country}
                defaultValue={country[0]}>
                  {country.country}
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
            // disabled={disabled}
            variant="contained"
            color="primary"
            size="small"
            endIcon={<Icon>send</Icon>}
          >
            submit
          </Button>
          <div className="errors">
            {/* <div>{formErrors.name}</div>
            <div>{formErrors.email}</div>
            <div>{formErrors.password}</div>
            <div>{formErrors.country}</div> */}
          </div>
        </div>
      </Form>
    </Main>
  );
}
