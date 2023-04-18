import { useState } from 'react';
import { editUserRoleThunk } from '../../store/admin-slice';
import { authActions } from '../../store/auth-slice';
import { useSelector, useDispatch } from 'react-redux';
import UserList from './UserList';
import PopUpWindow from '../ui/PopUpWindow';
import Form from 'react-bootstrap/Form';

const Admin = function () {
  const [userRole, setUserRole] = useState(null);
  const [UID, setUID] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector(state => state.admin.users);

  const getUserData = (node, id, role) => {
    setUserRole(role);
    setUID(id);

    node.blur();
    dispatch(authActions.openModal());
  };

  const editUserData = () => {
    if (userRole === null) return;

    dispatch(editUserRoleThunk(UID, userRole));
  };

  const userRoleHandler = event => {
    const role = event.target.value;

    if (event.target.value !== 'option-title') {
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  };
  return (
    <>
      <PopUpWindow
        heading="Edit user role!"
        btnText="Submit"
        onPopUpWindowClose={editUserData}
      >
        <Form.Select
          aria-label="Default select example"
          onChange={userRoleHandler}
        >
          <option value="option-title">Open this select menu</option>
          <option value="passenger">Passenger</option>
          <option value="driver">Driver</option>
          <option value="dispatcher">Dispatcher</option>
        </Form.Select>
      </PopUpWindow>
      <UserList onRoleClick={getUserData} users={users} />
    </>
  );
};

export default Admin;
