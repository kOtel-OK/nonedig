import { useDispatch } from 'react-redux';
import { getAllUsersThunk } from '../../store/admin-slice';

import Nav from 'react-bootstrap/Nav';

const MenuContent = function (props) {
  const dispatch = useDispatch();

  const onMenuClick = event => {
    if (event === 'edit-users') {
      dispatch(getAllUsersThunk());
    }

    // Close menu
    props.onMenuItemClick();
  };

  return (
    <Nav onSelect={onMenuClick} className="flex-column">
      <Nav.Link eventKey="edit-profile">Edit profile</Nav.Link>
      <Nav.Link eventKey="edit-users">Edit users</Nav.Link>
      <Nav.Link eventKey="create-trip">Create trip</Nav.Link>
    </Nav>
  );
};

export default MenuContent;
