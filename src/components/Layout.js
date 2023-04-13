import MainNav from '../components/main-nav/MainNav';
import Main from './main-content/Main';
import Footer from '../components/footer/Footer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Layout = function () {
  return (
    <>
      <MainNav />
      <Container as="main" className="main">
        <Main />
      </Container>
      <Row as="footer" className="footer">
        <Footer />
      </Row>
    </>
  );
};

export default Layout;
