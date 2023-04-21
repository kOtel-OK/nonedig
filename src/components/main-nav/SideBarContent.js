import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersThunk } from '../../store/admin-slice';
import { getAllTripsThunk } from '../../store/admin-slice';
import { adminActions } from '../../store/admin-slice';
import SideBarAdmin from './SideBarAdmin';
import SideBarUser from './SideBarUser';
import Nav from 'react-bootstrap/Nav';

const MenuContent = function (props) {
  const isAdmin = useSelector(state => state.auth.isAdmin);
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
      {isAdmin ? <SideBarAdmin /> : <SideBarUser />}
    </Nav>
  );
};

export default MenuContent;
