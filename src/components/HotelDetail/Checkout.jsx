import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";

import "./Checkout.css";
import { orderAPI } from "../../features/Order/orderApi";

export const Checkout = (props) => {
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();

  const handleCheckout = () => {
    orderAPI
      .createOrderAPI({
        amountRoom: order?.amountRoom,
        email: order?.email,
        fullname: order?.fullname,
        userId: order?.userId,
        phone: order?.phone,
        price: order?.price,
        roomId: order?.roomId,
        state: order?.state,
        username: order?.username,
        startDate: order?.startDate,
        endDate: order?.endDate,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/order");
          return toast.success("Create order successfully!");
        } else {
          return toast.error("This room has been ordered");
        }
      })
      .catch((error) => {
        if (error.response.status === 405) {
          return toast.error("This room has been ordered");
        }
        console.log(error);
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal" centered>
      <div className="container">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Checkout Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-text">
            Before submit your order, please review your information carefully.
            Your order will be submit and we will contact to you soon when your
            order is accepted or you can see your order state in Order page.
          </div>
          <Form>
            <Form.Group className="modal-full-row">
              <Form.Label className="modal-text-field">Fullname:</Form.Label>
              <Form.Control
                className="modal-text"
                type="text"
                value={order?.fullname}
                autoFocus
                disabled
              />
            </Form.Group>
            <div className="row">
              <Form.Group className="col">
                <Form.Label className="modal-text-field">Email:</Form.Label>
                <Form.Control
                  className="modal-text"
                  type="email"
                  value={order?.email}
                  autoFocus
                  disabled
                />
              </Form.Group>
              <Form.Group className="col">
                <Form.Label className="modal-text-field">Phone:</Form.Label>
                <Form.Control
                  className="modal-text"
                  type="phone"
                  value={order?.phone}
                  autoFocus
                  disabled
                />
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="col">
                <Form.Label className="modal-text-field">Checkin: </Form.Label>
                <Form.Control
                  className="modal-text"
                  type="text"
                  value={format(order?.startDate, "dd/MM/yyyy")}
                  autoFocus
                  disabled
                />
              </Form.Group>
              <Form.Group className="col">
                <Form.Label className="modal-text-field">Checkout: </Form.Label>
                <Form.Control
                  className="modal-text"
                  type="text"
                  value={format(order?.endDate, "dd/MM/yyyy")}
                  autoFocus
                  disabled
                />
              </Form.Group>
            </div>
            <Form.Group className="modal-full-row">
              <Form.Label className="modal-text-field">Hotel:</Form.Label>
              <Form.Control
                className="modal-text"
                type="text"
                value={props.hotel.name}
                autoFocus
                disabled
              />
            </Form.Group>
            <div className="row">
              <Form.Group className="col">
                <Form.Label className="modal-text-field">
                  Room type:{" "}
                </Form.Label>
                <Form.Control
                  className="modal-text"
                  type="text"
                  value={order?.room}
                  autoFocus
                  disabled
                />
              </Form.Group>
              <Form.Group className="col">
                <Form.Label className="modal-text-field">Amount: </Form.Label>
                <Form.Control
                  className="modal-text"
                  type="Phone"
                  value={order?.amountRoom}
                  autoFocus
                  disabled
                />
              </Form.Group>
            </div>
          </Form>
          <div className="order-cost">
            {`Total: ${Intl.NumberFormat("vn-VN").format(order?.price)} VND`}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="button-checkout">
            <button
              className="submit-checkout"
              type="submit"
              onClick={() => {
                handleCheckout();
              }}
            >
              Checkout
            </button>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};
