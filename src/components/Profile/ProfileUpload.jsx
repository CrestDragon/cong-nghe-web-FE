import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import "./ProfileUpload.css";
import { Button } from "../Button/Button";
import { authAPI } from "../../features/Auth/authAPI";

export const ProfileUpload = (props) => {
  const [file, setFile] = useState();

  const handlePick = (f) => {
    const formData = new FormData();
    formData.append("img", f);
    setFile(formData);
  };

  const handleUpload = () => {
    props.onHide();
    //put Api
    authAPI
      .changeAvatarAPI(file, props.data?._id)
      .then((response) => {
        toast.success("Upload successfully!", { theme: "colored" });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...props.data, img: response.data?.url })
        );
        props.upload(response.data?.url);
      })
      .catch((error) => {
        toast.error("Can not update avatar", { theme: "colored" });
      });
  };

  return (
    <React.Fragment>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-warning">
            Choose your avatar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            name="img"
            className="upload"
            onChange={(e) => handlePick(e.target.files[0])}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            name="Agree"
            onClick={() => {
              handleUpload();
            }}
          />
          <Button name="Cancel" onClick={props.onHide} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
