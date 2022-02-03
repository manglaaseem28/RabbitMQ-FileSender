import React from "react";
import { Card, CardBody, Form, FormGroup, Label } from "reactstrap";

function SignIn(props) {
  return (
    // <div>
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form className="Sign-In-Form">
            <FormGroup>
              <Label htmlFor="email" className="form-label">
                Email
              </Label>
              <input
                name="Email"
                id="userEmail"
                placeholder="Enter Your Email"
                required
                type="email"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="userPassword" className="form-label">
                Password
              </label>
              <input
                name="password"
                id="userPassword"
                placeholder="Enter Password"
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
    // </div>
  );
}

export default SignIn;
