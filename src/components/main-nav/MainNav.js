import { useSelector } from 'react-redux';
import LogOutBtn from './LogOutBtn';
import UserMenu from './UserMenu';
import MenuContent from './MenuContent';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
const MainNav = function () {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Navbar bg="light">
      <Container>
        {isLoggedIn && <UserMenu />}
        {/* <UserMenu /> */}
        {/* <MenuContent /> */}
        {/* </UserMenu> */}
        <Navbar.Brand as="div">PassagePro</Navbar.Brand>
        {isLoggedIn && <LogOutBtn />}
        {/* <LogOutBtn /> */}
      </Container>
    </Navbar>
  );
};

export default MainNav;
