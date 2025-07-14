import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

import "./styles.css";
import { Button } from "../../components/Button/Button";
import { authAPI } from "../../features/Auth/authAPI";
import { useDispatch } from "react-redux";
import { login } from "../../features/Auth/authSlice";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    const isEmpty = Object.values(account).findIndex((it) => !it);
    if (isEmpty !== -1) {
      return toast.error("Please fill all fields");
    }

    authAPI
      .loginAPI({
        ...account,
      })
      .then((response) => {
        toast.success("Login successfully. Welcome to Hotel Booking.", {
          theme: "colored",
        });
        dispatch(login(response?.data.details));
        localStorage.setItem("user", JSON.stringify(response?.data.details));
        setTimeout(() => {
          navigate(location.state?.lastUrl || "/");
        }, 1000);
      })
      .catch((error) => {
        toast.error("Login failed! Please check your username or password", {
          theme: "colored",
        });
      });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Login | HotelBooking</title>
      </Helmet>
      <div className="auth-layout">
        <div className="auth-contain col-4">
          <div className="auth-title">Login</div>
          <Form.Group className="auth-item">
            <div className="auth-property">
              Username:
              <Form.Control
                className="auth-text"
                type="text"
                autoComplete="off"
                placeholder="Username"
                onChange={(e) =>
                  setAccount({ ...account, username: e.target.value })
                }
                required
              />
            </div>
          </Form.Group>
          <Form.Group className="auth-item">
            <div className="auth-property">
              Password:
              <Form.Control
                className="auth-text"
                type="password"
                autoComplete="off"
                placeholder="Password"
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
                required
              />
            </div>
          </Form.Group>
          <Button name="Login" onClick={handleLogin} />
          <div className="auth-navigate-signup">
            Not a member?&nbsp;
            <Link to="/register" className="navigate-signup">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
