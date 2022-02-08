import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
/**
 * Landing page component containing sign in and sign up
 * @param {object} props 
 * @returns {JSX} If user is already logged in then gets redirected otherwise sign in page is opened
 */
function LandingPage(props) {
  const history = useNavigate();
  const isAuthenticated = props.isAuthenticated;

  useEffect(() => {
    console.log('hey',isAuthenticated)
    if (isAuthenticated){ 
    history('/dashboard')}
  });
  const [isRegistered, setisRegistered] = useState(true);

  const changeLoggingState = () => {
    console.log("Changing State");
    setisRegistered(!isRegistered);
    console.log(isRegistered);
  };

  return (
    <div style={{background:'lightblue'}}>
      <div className="d-flex align-items-center justify-content-center">
      <h1>RabbitMQ-File Sender</h1>
      </div>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          {isRegistered ? (
            <SignIn register={changeLoggingState} history={history} />
          ) : (
            <SignUp logIn={changeLoggingState} />
          )}
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
