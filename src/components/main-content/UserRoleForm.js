import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserRoleForm = function (props) {
  const [userRole, setUserRole] = useState(null);

  const userRoleHandler = event => {
    const role = event.target.value;

    if (event.target.value !== 'option-title') {
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  };

  const passUserRole = () => {
    props.onGetRole(userRole);
    props.handleClose();
  };

  return (
    <>
      <Form.Select
        aria-label="Default select example"
        onChange={userRoleHandler}
      >
        <option value="option-title">Select a user role</option>
        <option value="passenger">Passenger</option>
        <option value="driver">Driver</option>
        <option value="dispatcher">Dispatcher</option>
      </Form.Select>
      <Button variant="primary" className="w-100 mt-3" onClick={passUserRole}>
        Submit
      </Button>
    </>
  );
};

export default UserRoleForm;
