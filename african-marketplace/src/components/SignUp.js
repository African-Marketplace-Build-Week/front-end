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
    color: white;
    background-color: #441052;
  }
  .navtitle {
    flex-grow: 1;
  }

  @keyframes move_wave {
    0% {
      transform: translateX(0) translateZ(0) scaleY(1);
    }
    50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.55);
    }
    100% {
      transform: translateX(-50%) translateZ(0) scaleY(1);
    }
  }
  .waveWrapper {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }
  .waveWrapperInner {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    bottom: -1px;
    background-image: linear-gradient(to top, #86377b 20%, #27273c 80%);
  }
  .bgTop {
    z-index: 15;
    opacity: 0.5;
  }
  .bgMiddle {
    z-index: 10;
    opacity: 0.75;
  }
  .bgBottom {
    z-index: 5;
  }
  .wave {
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
  }
  .waveTop {
    background-image: url("http://front-end-noobs.com/jecko/img/wave-top.png");
    background-size: 50% 100px;
  }
  .waveAnimation .waveTop {
    animation: move-wave 3s;
    -webkit-animation: move-wave 3s;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }
  .waveMiddle {
    background-size: 50% 120px;
    background-image: url("http://front-end-noobs.com/jecko/img/wave-mid.png");
  }
  .waveAnimation .waveMiddle {
    animation: move_wave 10s linear infinite;
  }
  .waveBottom {
    background-size: 50% 100px;
    background-image: url("http://front-end-noobs.com/jecko/img/wave-bot.png");
  }
  .waveAnimation .waveBottom {
    animation: move_wave 15s linear infinite;
  }
`;

const Form = styled.form`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 300;
  color: #2b2b2b;
  background: rgba(0, 0, 0, 0);
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
  z-index: 100;
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

  const submitForm = () => {
    push("/login");
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
    // event.preventDefault();
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

  useEffect(() => {
    validationForm.isValid(values).then((valid) => setDisabled(!valid));
  }, [values]);

  return (
    <Main className="main">
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Typography variant="h6" className="navtitle">
            African Market Place
          </Typography>
          <Button color="inherit">
            <a href="/">Home</a>
          </Button>
        </Toolbar>
      </AppBar>
      <Form className="form container" onSubmit={submitForm}>
        <h1>Sign Up Now It's Free!</h1>
        <TextField
          className="formchild"
          type="name"
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
            <div className="errors">
              <div>{formErrors.name}</div>
              <div>{formErrors.email}</div>
              <div>{formErrors.password}</div>
              <div>{formErrors.country}</div>
            </div>
          </div>
        </div>
      </Form>
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div className="wave waveTop"></div>
        </div>
        <div className="waveWrapperInner bgMiddle">
          <div className="wave waveMiddle"></div>
        </div>
        <div className="waveWrapperInner bgBottom">
          <div className="wave waveBottom"></div>
        </div>
      </div>
    </Main>
  );
}
