import Card from 'react-bootstrap/Card';
import UserItem from './UserItem';
import classes from './MainContent.module.css';

const UserListItem = function (props) {
  return (
    <Card className={[classes.card, 'm-1', 'pb-3']}>
      <UserItem name="Name" value={props.name} />
      <UserItem
        name="E-mail"
        value={props.email}
        plain={true}
        readonly={true}
      />
      <UserItem name="Phone" value={props.phone} />
      <UserItem name="Age" value={props.age} />
      <UserItem
        onRoleClick={props.onRoleClick}
        name="Role"
        id={props.id}
        value={props.role}
        plain={false}
        readonly={false}
      />
    </Card>
  );
};

export default UserListItem;
