import { Nav } from 'react-bootstrap';

const SideBarAdmin = function () {
  return (
    <>
      <Nav.Link eventKey="main">Main</Nav.Link>
      <Nav.Link eventKey="users">Users</Nav.Link>
      <Nav.Link eventKey="trips">Trips</Nav.Link>
    </>
  );
};

export default SideBarAdmin;
