import { useSelector } from 'react-redux';
import LogOutBtn from './LogOutBtn';
import UserMenu from './SideBarMenu';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const MainNav = function () {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Navbar bg="none">
      <Container>
        {isLoggedIn && <UserMenu />}
        <Navbar.Brand as="div" className="fs-2 text-white">
          PassagePro
        </Navbar.Brand>
        {isLoggedIn && <LogOutBtn />}
      </Container>
    </Navbar>
  );
};

export default MainNav;
