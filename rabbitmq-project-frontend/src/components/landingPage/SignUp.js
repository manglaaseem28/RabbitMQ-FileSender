import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { registerUser } from "../../service/auth.service";

function SignUp(props) {
  const [initialState, setState] = useState({
    email: "",
    password: "",
    name: "",
    designation: "",
  });

  const [response, setresponse] = useState({
    isLoading: true,
    isRegistered: false,
    errMsg: "",
  });

  const [showmsg, setshowmsg] = useState(false);
  const [errors, seterrors] = useState({
    email: "",
    password: "",
    name: "",
    designation: "",
  });
  const [shouldSubmit, setshouldSubmit] = useState(false);

  useEffect(() => {
    console.log("Use Effect Called");
    validateErrors();
  }, [initialState]);

  const validateErrors = () => {
    const { email, password, name, designation } = initialState;
    const reg_password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var errors = { email: "", password: "", name: "", designation: "" };

    if (email && email.split("").filter((x) => x === "@").length !== 1)
      errors.email = "Invalid Email Syntax";
    if (password && !reg_password.test(password))
      errors.password =
        "Password must be a minimum of 8 characters including number, Upper, Lower And one special character.";
    if (name && name.length < 2)
      errors.name = "Name should be greater than 2 characters";

    seterrors(errors);
    setshouldSubmit(
      errors.designation || errors.email || errors.name || errors.password
    );
  };

  const responseView = (
    <>
      {response.isLoading ? (
        <Spinner />
      ) : response.isRegistered ? (
        <Alert color="success">Successfully Registered</Alert>
      ) : (
        <Alert color="danger">{response.errMsg}</Alert>
      )}
    </>
  );

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({
      ...initialState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    if (!shouldSubmit) return;
    setshowmsg(true);
    event.preventDefault();
    console.log(initialState);
    await registerUser(initialState)
      .then((result) => {
        console.log(result);

        if (result.status === 200) {
          setresponse({
            isLoading: false,
            isRegistered: true,
          });
          // setState({email:'', password: '', name: '', designation: ''});
        } else {
          setresponse({
            isLoading: false,
            isRegistered: false,
            errMsg: result.data.detail,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form className="Sign-Up-Form mb-3" onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name" className="form-label">
                Name
              </Label>
              <Input
                name="name"
                id="userName"
                placeholder="Enter Your Name"
                value={initialState.name}
                onChange={handleInputChange}
                required
                invalid={errors.name}
                valid={!errors.name}
                type="text"
              />
              <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email" className="form-label">
                Email
              </Label>
              <Input
                name="email"
                id="userEmail"
                placeholder="Enter Your Email"
                value={initialState.email}
                onChange={handleInputChange}
                required
                invalid={errors.email}
                valid={!errors.email}
                type="email"
              />
              <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="designation" className="form-label">
                Designation
              </Label>
              <Input
                name="designation"
                id="userDesignation"
                placeholder="Enter Your Designation"
                value={initialState.designation}
                onChange={handleInputChange}
                required
                invalid={errors.designation}
                valid={!errors.designation}
                type="text"
              />
              <FormFeedback>{errors.designation}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <label htmlFor="userPassword" className="form-label">
                Password
              </label>
              <Input
                name="password"
                id="userPassword"
                placeholder="Enter Password"
                value={initialState.password}
                onChange={handleInputChange}
                required
                invalid={errors.password}
                valid={!errors.password}
                type="password"
              />
              <FormFeedback>{errors.password}</FormFeedback>
            </FormGroup>
            <Button
              color="danger"
              type="submit"
              disabled={shouldSubmit}
              className="w-100"
            >
              Register
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Don't have an account?&nbsp;&nbsp;&nbsp;
            <Button color="info" className="regB" onClick={props.logIn}>
              &nbsp;Sign In
            </Button>
          </div>
        </CardBody>
      </Card>
      {showmsg && <div>{responseView}</div>}
    </div>
  );
}

export default SignUp;
