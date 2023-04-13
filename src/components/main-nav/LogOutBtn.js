import { useDispatch } from 'react-redux';
import { signOutThunk } from '../../store/auth-slice';
import Navbar from 'react-bootstrap/Navbar';

const LogOutBtn = function () {
  const dispatch = useDispatch();
  const onLogOutClick = () => {
    console.log('Logout');
    dispatch(signOutThunk());
  };
  return (
    <>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text onClick={onLogOutClick}>Log Out</Navbar.Text>
      </Navbar.Collapse>
    </>
  );
};

export default LogOutBtn;
