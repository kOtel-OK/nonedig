import UserListItem from './UserListItem';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const UserList = function (props) {
  if (props.users) {
    return (
      <Form>
        <Row>
          {props.users.map((el, idx) => {
            const randomKey = Date.now() + Math.trunc(Math.random() * 1000 + 1);
            return (
              <UserListItem
                onRoleClick={props.onRoleClick}
                id={el.id}
                name={el.name}
                age={el.age}
                email={el.email}
                phone={el.phone}
                role={el.role}
                key={randomKey}
              />
            );
          })}
        </Row>
      </Form>
    );
  }
};

export default UserList;
