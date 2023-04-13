import { useSelector } from 'react-redux';
import LogOutBtn from './LogOutBtn';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
const MainNav = function () {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>PassagePro</Navbar.Brand>
        {isLoggedIn && <LogOutBtn />}
      </Container>
    </Navbar>
  );
};

export default MainNav;
