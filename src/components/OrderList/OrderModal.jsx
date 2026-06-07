import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import './OrderModal.css';
import { deleteOrderList } from '../../features/OrderList/orderListSlice';
import { Button } from '../Button/Button';
import { orderAPI } from '../../features/Order/orderApi';

export const OrderModal = (props) => {
    const order = props.data;
    const dispatch = useDispatch();

    const handleAgree = () => {
        props.onHide();
        //delete Api
        orderAPI
            .deleteOrderAPI(order?._id)
            .then((response) => {
                dispatch(deleteOrderList(order.pos));
                return toast.success('This order has been deleted!');
            })
            .catch((error) => {
                console.log(error)
                return toast.error('Can not delete or this order has been deleted!');
            })
    }

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
                        Warning
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='warning-title'>
                        Are you sure to delete or cancel this order?
                    </div>
                    <div className='warning-text'>
                        This action cannot be undone. You will not see this order in the future!
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        name='Agree'
                        onClick={() => {
                            handleAgree();
                        }}
                    />
                    <Button
                        name='Cancel'
                        onClick={props.onHide}
                    />
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
