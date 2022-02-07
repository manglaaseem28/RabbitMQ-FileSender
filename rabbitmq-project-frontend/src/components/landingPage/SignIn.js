import React, { useState } from "react";
import {
  Alert,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { logIn } from "../../service/auth.service";

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

  const responseView = <>
  {
    response.isLoading ? 
    <Spinner />:
    response.isAuthenticated?
    <Alert>Successfully Authenticated!</Alert>:
    <Alert>{response.errMsg}</Alert>
  }
  </>;

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({
      ...initialState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
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
    console.log(response)
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
                type="email"
              />
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
                type="password"
              />
            </FormGroup>
            <button type="submit" className="w-100 c-blue btn btn-secondary">
              Sign In
            </button>
          </Form>
          <div className="w-100 text-center mt-2">
            Don't have an account?&nbsp;&nbsp;&nbsp;
            <button className="regB" onClick={props.register}>
              &nbsp;Sign Up
            </button>
          </div>
        </CardBody>
      </Card>
      {showmsg && <div>{responseView}</div>}
    </div>
  );
}

export default SignIn;
