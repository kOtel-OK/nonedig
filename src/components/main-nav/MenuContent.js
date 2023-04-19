import { useDispatch } from 'react-redux';
import { getAllUsersThunk } from '../../store/admin-slice';
import { getAllTripsThunk } from '../../store/admin-slice';
import { adminActions } from '../../store/admin-slice';
import Nav from 'react-bootstrap/Nav';

const MenuContent = function (props) {
  const dispatch = useDispatch();

  const onMenuClick = event => {
    if (event === 'main') {
      dispatch(
        adminActions.changePages({
          main: true,
          users: false,
          trips: false,
        })
      );
    }
    if (event === 'users') {
      dispatch(getAllUsersThunk());
    }
    if (event === 'trips') {
      dispatch(getAllTripsThunk());
    }

    // Close menu
    props.onMenuItemClick();
  };

  return (
    <Nav onSelect={onMenuClick} className="flex-column">
      <Nav.Link eventKey="main">Main</Nav.Link>
      <Nav.Link eventKey="users">Users</Nav.Link>
      <Nav.Link eventKey="trips">Trips</Nav.Link>
    </Nav>
  );
};

export default MenuContent;
