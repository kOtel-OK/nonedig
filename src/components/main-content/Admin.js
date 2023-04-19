import { useState } from 'react';
import { editUserRoleThunk } from '../../store/admin-slice';
import { authActions } from '../../store/auth-slice';
import { useSelector, useDispatch } from 'react-redux';
import UserList from './UserList';
import PopUpWindow from '../ui/PopUpWindow';
import UserRoleForm from './UserRoleForm';
import Trips from './trips/Trips';
import { Row, Col } from 'react-bootstrap';

const Admin = function (props) {
  const [userRole, setUserRole] = useState(null);
  const [UID, setUID] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector(state => state.admin.users);
  const pages = useSelector(state => state.admin.pages);

  const getUserData = (node, id, role) => {
    setUserRole(role);
    setUID(id);

    node.blur();
    dispatch(authActions.openModal());
  };

  const getRole = role => {
    editUserData(role);
  };

  const editUserData = role => {
    console.log('Edit role', userRole);
    if (role === null) return;

    dispatch(editUserRoleThunk(UID, role));
  };

  return (
    <>
      <PopUpWindow heading="Edit user role!">
        <UserRoleForm onGetRole={getRole} />
      </PopUpWindow>

      {pages.users && <UserList onRoleClick={getUserData} users={users} />}
      {pages.trips && <Trips />}
      {pages.main && (
        <Row>
          <Col className="text-center" xs="12">
            Welcome to admin page!
          </Col>
        </Row>
      )}
    </>
  );
};

export default Admin;
