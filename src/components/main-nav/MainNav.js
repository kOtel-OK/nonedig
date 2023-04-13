import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
const MainNav = function () {
  return (
    <Navbar bg="light">
      <Container>
        <Link to="/">
          <Navbar.Brand>PassagePro</Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
};

export default MainNav;
