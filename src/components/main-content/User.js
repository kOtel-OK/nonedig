import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
const User = function () {
  const pages = useSelector(state => state.admin.pages);

  return (
    <>
      {/* {pages.trips && <Trips />} */}
      {pages.main && (
        <Row>
          <Col className="text-center" xs="12">
            Welcome to your personal page!
          </Col>
        </Row>
      )}
    </>
  );
};

export default User;
