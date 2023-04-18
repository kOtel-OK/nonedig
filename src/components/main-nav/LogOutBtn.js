import { useDispatch } from 'react-redux';
import { signOutThunk } from '../../store/auth-slice';
import Button from 'react-bootstrap/Button';

const LogOutBtn = function () {
  const dispatch = useDispatch();
  const onLogOutClick = () => {
    console.log('Logout');
    dispatch(signOutThunk());
  };
  return (
    <>
      <div className="justify-content-end flex-grow-1 d-flex">
        <Button onClick={onLogOutClick}>Log Out</Button>
      </div>
    </>
  );
};

export default LogOutBtn;
