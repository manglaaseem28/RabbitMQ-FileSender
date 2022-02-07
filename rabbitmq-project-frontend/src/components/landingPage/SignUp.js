import React, { useState } from "react";
import { Alert, Card, CardBody, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
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

  const responseView = <>
  {
    response.isLoading ? 
    <Spinner />:
    response.isRegistered?
    <Alert>Successfully Registered</Alert>:
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
    setshowmsg(true)
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
            errMsg: result.data.detail
          })
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
              Register
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
      {showmsg && <div>{responseView}</div>}
    </div>
  );
}

export default SignUp;
