import { useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';

const MenuContent = function (props) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  const onMenuClick = event => {
    console.log(event);
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
