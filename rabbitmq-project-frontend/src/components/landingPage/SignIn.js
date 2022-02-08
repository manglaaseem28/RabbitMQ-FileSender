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
import { logIn } from "../../service/auth.service";
/**
 * Used for signing in
 * @param {object} props 
 * @returns 
 */
function SignIn(props) {
  const [initialState, setState] = useState({
    email: "",
    password: "",
  });

  const [response, setresponse] = useState({
    isLoading: true,
    errMsg: "",
    isAuthenticated: false,
  });

  const [showmsg, setshowmsg] = useState(false);
  const [errors, seterrors] = useState({
    email: "",
    password: "",
  });
  const [shouldSubmit, setshouldSubmit] = useState(false);

  useEffect(() => {
    console.log("Use Effect Called");
    validateErrors();
  }, [initialState]);

  const validateErrors = () => {
    const { email, password } = initialState;
    const reg_password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var errors = { email: "", password: "" };

    if (email && email.split("").filter((x) => x === "@").length !== 1)
      errors.email = "Invalid Email Syntax";
    if (password && !reg_password.test(password))
      errors.password =
        "Password must be a minimum of 8 characters including number, Upper, Lower And one special character.";

    seterrors(errors);
    setshouldSubmit(errors.email || errors.password ? true : false);
  };
/**
 * client side validation
 */
  const responseView = (
    <>
      {response.isLoading ? (
        <Spinner />
      ) : response.isAuthenticated ? (
        <Alert color="success">Successfully Authenticated!</Alert>
      ) : (
        <Alert color="danger">{response.errMsg}</Alert>
      )}
    </>
  );
/**
 * Event Handler function for sign in form 
 * @param {} event 
 */
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({
      ...initialState,
      [name]: value,
    });
  };
/**
 * Event handler function for submit button 
 * @param {*} event 
 */
  const handleSubmit = async (event) => {
    // if (!shouldSubmit) return;
    setshowmsg(true);
    event.preventDefault();
    console.log(initialState);

    await logIn(initialState).then(
      (result) => {
        // console.log('Authentication Result', result);

        if (result.status === 200) {
          setresponse({
            isLoading: false,
            isAuthenticated: true,
          });
          setState({ email: "", password: "" });
          props.history("/dashboard");
          console.log("After Dashboard");
          window.location.reload();
        } else {
          setresponse({
            isLoading: false,
            isAuthenticated: false,
            errMsg: result.data,
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
    console.log(response);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form className="Sign-In-Form" onSubmit={handleSubmit}>
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
              color="primary"
              type="submit"
              disabled={shouldSubmit}
              className="w-100"
            >
              Sign In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Don't have an account?&nbsp;&nbsp;&nbsp;
            <Button color="info" className="regB" onClick={props.register}>
              &nbsp;Sign Up
            </Button>
          </div>
        </CardBody>
      </Card>
      {showmsg && <div>{responseView}</div>}
    </div>
  );
}

export default SignIn;
