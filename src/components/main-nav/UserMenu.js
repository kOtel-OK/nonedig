import { useState } from 'react';
import MenuContent from './MenuContent';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { List } from 'react-bootstrap-icons';
import classes from './MainNav.module.css';

const UserMenu = function () {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className={classes['menu-btn']}>
        <List size={28} onClick={handleShow} />
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <MenuContent onMenuItemClick={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserMenu;
