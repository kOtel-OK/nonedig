import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const UserItem = function (props) {
  const getEditedUserData = event => {
    const node = event.target;

    if (node.readOnly) return;

    const userID = event.target.id;
    const role = event.target.value || null;
    props.onRoleClick(node, userID, role);
  };
  return (
    <Form.Group as={Row} controlId={props.id}>
      <Form.Label column xs="3">
        {props.name}
      </Form.Label>
      <Col xs="9">
        <Form.Control
          plaintext={props.plain ?? true}
          readOnly={props.readonly ?? true}
          defaultValue={props.value}
          onFocus={getEditedUserData}
        />
      </Col>
    </Form.Group>
  );
};

export default UserItem;
