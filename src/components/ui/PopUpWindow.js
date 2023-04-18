import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PopUpWindow = function (props) {
  const isModalOpen = useSelector(state => state.auth.isModalOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    props.onPopUpWindowClose();
    dispatch(authActions.closeModal());
  };

  return (
    <>
      <Modal
        show={isModalOpen}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header className="justify-content-center">
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {props.btnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopUpWindow;
