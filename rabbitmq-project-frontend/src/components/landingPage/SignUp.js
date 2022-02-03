import React from "react";
import { Card, CardBody, Form, FormGroup, Label } from "reactstrap";

function SignUp(props) {
  return (
    <div>
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form className="Sign-Up-Form mb-3">
          <FormGroup>
              <Label htmlFor="name" className="form-label">
                Name
              </Label>
              <input
                name="name"
                id="userName"
                placeholder="Enter Your Name"
                required
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email" className="form-label">
                Email
              </Label>
              <input
                name="email"
                id="userEmail"
                placeholder="Enter Your Email"
                required
                type="email"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="designation" className="form-label">
                Designation
              </Label>
              <input
                name="designation"
                id="userDesignation"
                placeholder="Enter Your Designation"
                required
                type="text"
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
              <button className="regB" onClick={props.logIn}>
                &nbsp;Sign In
              </button>
            </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignUp;
