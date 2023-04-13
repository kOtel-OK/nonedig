import { Outlet } from 'react-router-dom';

import MainNav from '../components/main-nav/MainNav';
import Footer from '../components/footer/Footer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Layout = function () {
  return (
    <>
      <MainNav />
      <Container as="main" className="main">
        <Outlet />
      </Container>
      <Row as="footer" className="footer">
        <Footer />
      </Row>
    </>
  );
};

export default Layout;
