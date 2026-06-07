import React from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";

import "./ProfileDisplay.css";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { collapse, expand } from "../../features/Profile/profileSlice";
import { Button } from "../Button/Button";
import { authAPI } from "../../features/Auth/authAPI";
import { profileAPI } from "../../features/Profile/profileApi";
import { ProfileUpload } from "./ProfileUpload";

const ProfileDisplay = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {
      username: "",
      email: "",
      address: "",
      img: "",
      city: "",
      phone: "",
    }
  );
  const [isEdit, setIsEdit] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);
  const isExpand = useSelector((state) => state.profile.isExpand);
  const dispatch = useDispatch();

  const handleSubmitEdit = () => {
    if (!user.address || !user.phone) {
      return toast.error("Please fill all fields");
    }

    profileAPI
      .updateUserAPI(
        {
          ...user,
        },
        user._id
      )
      .then((response) => {
        toast.success("Save changes", { theme: "colored" });
        localStorage.setItem("user", JSON.stringify(response?.data.details));
        setIsEdit(false);
        setIsSubmit(true);
      })
      .catch((error) => {
        console.log(error);
        error?.response?.data.errors.map((it) =>
          toast.error(it, { theme: "colored" })
        );
      });
  };

  const handleLogout = () => {
    authAPI
      .logoutAPI()
      .then((response) => {
        console.log(response);
        toast.success("You has been logged out!", { theme: "colored" });
        localStorage.removeItem("user");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Can not Log out", { theme: "colored" });
      });
  };

  const handleUploadAvatar = () => {
    setIsUpload(true);
  };

  return (
    <React.Fragment>
      <div className="container profile">
        <div className="row">
          <p className="titleProfile col-6">
            Profile
            <p className="textUser">Welcome&nbsp;{user?.username}</p>
          </p>
          <div className="buttonBox col-6">
            {!isEdit && (
              <Button
                name="Edit"
                type="button"
                onClick={() => {
                  setIsEdit(true);
                  setIsSubmit(false);
                }}
              />
            )}
            <Button name="Logout" onClick={handleLogout} />
          </div>
        </div>

        <div className="row accountInformation" style={{ marginTop: "3%" }}>
          <div className="avatar col-4">
            {user?.img ? (
              <div className="row">
                <img src={user?.img} alt="" className="avatarIcon col-11" />
                <AiOutlineEdit
                  className="uploadAvatarIcon col-1"
                  onClick={handleUploadAvatar}
                />
              </div>
            ) : (
              <div className="row">
                <FaUserCircle className="avatarIcon col-11" />
                <AiOutlineEdit
                  className="uploadAvatarIcon col-1"
                  onClick={handleUploadAvatar}
                />
              </div>
            )}
          </div>
          <div className="textBox col-6">
            <Form.Group className="row">
              <div className="textTitleProfile">Account:</div>
              <Form.Control
                className="textDetail"
                value={user.username}
                disabled
              />
            </Form.Group>
            <div className="textTitleProfile">Email:</div>
            <Form.Group className="row">
              <Form.Control
                className="textDetail"
                value={user?.email}
                disabled
              />
            </Form.Group>
          </div>
          <div className="col-2" />
        </div>

        <h1 className="titleLineProfile">Personal Information</h1>
        <div className="textPersonalContain">
          <Form.Group className="">
            <div className="textTitleProfile">Address:</div>
            {isEdit ? (
              <Form.Control
                className="textDetail"
                type="text"
                value={user?.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                required
                isInvalid={!user.address}
              />
            ) : (
              <Form.Control
                className="textDetail col"
                value={user?.address}
                required
                disabled
              />
            )}
            <Form.Control.Feedback type="invalid">
              This field is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="">
            <div className="textTitleProfile">Phone number:</div>
            {isEdit ? (
              <Form.Control
                className="textDetail"
                value={user?.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                required
                isInvalid={!user.phone}
              />
            ) : (
              <Form.Control
                className="textDetail"
                value={user?.phone}
                required
                disabled
              />
            )}
            <Form.Control.Feedback type="invalid">
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
          {!isSubmit && (
            <Button
              className="submitButton"
              name="Save"
              onClick={() => {
                handleSubmitEdit();
              }}
            />
          )}
        </div>
        <h1 className="titleLineProfile">Change Password</h1>
        {!isExpand ? (
          <div
            className="changePassword"
            onClick={() => {
              dispatch(expand());
              navigate("/profile/password");
            }}
          >
            Expand
          </div>
        ) : (
          <div
            className="changePassword"
            onClick={() => {
              dispatch(collapse());
              navigate("/profile");
            }}
          >
            Collapse
          </div>
        )}
        <Outlet />
      </div>

      <ProfileUpload
        show={isUpload}
        upload={(url) => setUser({ ...user, img: url })}
        onHide={() => setIsUpload(false)}
        data={user}
      />
      <ToastContainer />
    </React.Fragment>
  );
};

export default ProfileDisplay;
