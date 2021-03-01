import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";

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
      terms: values.terms,
    };
    postNewUser(newUser);
  };

  const postNewUser = (newUser) => {
    // axios
    //   .post("https://reqres.in/api/users", newUser)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setValues(initialValues);
  };

  return (
    <form className="form container" onSubmit={submitForm}>
      <TextField
        className="textField"
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
        className="textField"
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
        className="textField"
        type="password"
        value={values.password}
        onChange={handleChange}
        maxLength="40"
        label="Password"
        variant="outlined"
        size="small"
      />

      <FormControl className="formControl">
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
    </form>
  );
}
