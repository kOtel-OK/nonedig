import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { Button } from 'react-bootstrap';

const VerifyEmailWindow = function (props) {
  console.log(props);
  const dispatch = useDispatch();

  const closeVerifyEmailWindowHandler = () => {
    props.handleClose();
    dispatch(authActions.changeAuthMode('signIn'));
  };

  return (
    <>
      <div>Check your mail to verify account, and welcome aboard :)</div>
      <Button
        variant="primary"
        className="w-100 mt-3"
        onClick={closeVerifyEmailWindowHandler}
      >
        Got It
      </Button>
    </>
  );
};

export default VerifyEmailWindow;
