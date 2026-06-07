import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

import "./styles.css";
import { Button } from "../../components/Button/Button";
import { authAPI } from "../../features/Auth/authAPI";

const initialState = {
  username: "",
  email: "",
  country: "",
  address: "",
  city: "",
  phone: "",
  password: "",
};

const Register = () => {
  const [user, setUser] = useState(initialState);
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    console.log(user);
    const isEmpty = Object.values(user).findIndex((it) => !it);
    if (isEmpty !== -1) {
      return toast.error("Please fill all fields");
    } else {
      authAPI
        .registerAPI({
          ...user,
          confirmPassword: confirm,
        })
        .then((response) => {
          toast.success("Sign up successfully!", { theme: "colored" });
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          error?.response?.data.errors.length ?
          error?.response?.data.errors.map((it) =>
            toast.error(it, { theme: "colored" })
          ) : toast.error("Sign up error", { theme: "colored" });
        });
      // navigate('/login');
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Register | HotelBooking</title>
      </Helmet>
      <div className="auth-layout">
        <div className="auth-contain col-4">
          <div className="auth-title">Sign Up</div>
          <Form.Group className="auth-item">
            <div className="auth-property">
              Username:
              <Form.Control
                className="auth-text"
                type="text"
                autoComplete="off"
                placeholder="Username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>
          </Form.Group>
          <div className="row" style={{ marginTop: "1%", marginBottom: "1%" }}>
            <Form.Group className="auth-item col">
              <div className="auth-property">
                Email:
                <Form.Control
                  className="auth-text"
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="auth-item col">
              <div className="auth-property">
                Phone number:
                <Form.Control
                  className="auth-text"
                  type="phone"
                  autoComplete="off"
                  placeholder="Phone number"
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  required
                />
              </div>
            </Form.Group>
          </div>
          <div className="row" style={{ marginTop: "1%", marginBottom: "1%" }}>
            <Form.Group className="auth-item col">
              <div className="auth-property">
                Country:
                <Form.Control
                  className="auth-text"
                  type="text"
                  autoComplete="off"
                  placeholder="Country"
                  onChange={(e) =>
                    setUser({ ...user, country: e.target.value })
                  }
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="auth-item col">
              <div className="auth-property">
                City:
                <Form.Control
                  className="auth-text"
                  type="text"
                  autoComplete="off"
                  placeholder="City"
                  onChange={(e) => setUser({ ...user, city: e.target.value })}
                  required
                />
              </div>
            </Form.Group>
          </div>
          <Form.Group className="auth-item">
            <div className="auth-property">
              Address:
              <Form.Control
                className="auth-text"
                type="text"
                autoComplete="off"
                placeholder="Address"
                onChange={(e) => setUser({ ...user, address: e.target.value })}
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
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
          </Form.Group>
          <Form.Group className="auth-item">
            <div className="auth-property">
              Confirm password:
              <Form.Control
                className="auth-text"
                type="password"
                autoComplete="off"
                placeholder="Confirm Password"
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
          </Form.Group>
          <Button name="Sign Up" onClick={handleSignup} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
