import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "./ProfileChangePassword.css";
import Form from "react-bootstrap/Form";
import { expand } from "../../features/Profile/profileSlice";
import { profileAPI } from "../../features/Profile/profileApi";
import { Button } from "../Button/Button";

const initialState = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const ProfileChangePassword = (props) => {
  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  const [passwordObj, setPasswordObj] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(expand());
  }, [dispatch]);

  const handleSubmitEdit = () => {
    const isEmpty = Object.values(passwordObj).findIndex((it) => !it);
    if (isEmpty !== -1) {
      return toast.error("Please fill all fields");
    }

    profileAPI
      .changePasswordAPI({
        ...passwordObj,
        userId: userId,
      })
      .then((response) => {
        toast.success("Change password successfully!", { theme: "colored" });
        setPasswordObj(initialState);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data.errors, { theme: "colored" });
      });
  };

  return (
    <React.Fragment>
      <div className="changePasswordContainer">
        <Form.Group className="col-6">
          <div className="textTitlePassword">Current Password:</div>
          <Form.Control
            className="textDetail"
            type="password"
            autoComplete="off"
            value={passwordObj.oldPassword}
            onChange={(e) =>
              setPasswordObj({ ...passwordObj, oldPassword: e.target.value })
            }
            required
          />
        </Form.Group>
        <Form.Group className="col-6">
          <div className="textTitlePassword">New Password:</div>
          <Form.Control
            className="textDetail"
            type="password"
            value={passwordObj.password}
            onChange={(e) =>
              setPasswordObj({ ...passwordObj, password: e.target.value })
            }
            required
          />
        </Form.Group>
        <Form.Group className="col-6">
          <div className="textTitlePassword">Confirm Password:</div>
          <Form.Control
            className="textDetail"
            type="password"
            value={passwordObj.confirmPassword}
            onChange={(e) =>
              setPasswordObj({
                ...passwordObj,
                confirmPassword: e.target.value,
              })
            }
            required
          />
        </Form.Group>
        <Button
          name="Submit"
          onClick={() => {
            handleSubmitEdit();
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default ProfileChangePassword;
