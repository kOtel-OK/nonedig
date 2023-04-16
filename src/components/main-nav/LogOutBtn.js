import { useDispatch } from 'react-redux';
import { signOutThunk } from '../../store/auth-slice';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const LogOutBtn = function () {
  const dispatch = useDispatch();
  const onLogOutClick = () => {
    console.log('Logout');
    dispatch(signOutThunk());
  };
  return (
    <>
      {/* <Navbar.Toggle /> */}
      {/* <Navbar.Collapse className="justify-content-end"> */}
      <div className="justify-content-end flex-grow-1 d-flex">
        <Button onClick={onLogOutClick}>Log Out</Button>
      </div>
      {/* </Navbar.Collapse> */}
    </>
  );
};

export default LogOutBtn;
