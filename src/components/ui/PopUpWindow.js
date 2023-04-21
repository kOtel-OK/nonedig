import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import Modal from 'react-bootstrap/Modal';

const PopUpWindow = function (props) {
  const isModalOpen = useSelector(state => state.auth.isModalOpen);
  const dispatch = useDispatch();

  // Clone children to pass function in it
  const renderChildren = () => {
    return React.Children.map(props.children, child => {
      return React.cloneElement(child, {
        handleClose: handleClose,
      });
    });
  };

  const handleClose = () => {
    dispatch(authActions.closeModal());
  };

  return (
    <>
      <Modal show={isModalOpen} keyboard={false} onHide={handleClose}>
        <Modal.Header className="justify-content-center">
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">{renderChildren()}</Modal.Body>
      </Modal>
    </>
  );
};

export default PopUpWindow;
