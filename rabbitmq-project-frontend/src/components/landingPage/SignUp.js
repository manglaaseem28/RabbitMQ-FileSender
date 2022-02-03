import React, { useState } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { registerUser } from "../../service/auth.service";


function SignUp(props) {
  const [initialState, setState] = useState(
    {
        email:'',
        password: '',
        name: '',
        designation: ''
    }
);

const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setState({
        ...initialState,
        [name]: value
    })
}

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(initialState)
    registerUser(initialState)
    setState({email:'', password: '', name: '', designation: ''});
}

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
                type="text"
              />
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
                type="email"
              />
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
                type="text"
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
