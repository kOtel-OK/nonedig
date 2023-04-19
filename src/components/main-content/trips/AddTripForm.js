import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTripThunk } from '../../../store/admin-slice';
import { Form, Button, Row } from 'react-bootstrap';

import classes from './Trips.module.css';

const AddTripForm = function (props) {
  const [validated, setValidated] = useState(false);
  const drivers = useSelector(state => state.admin.drivers);
  const dispatch = useDispatch();

  const fromRef = useRef();
  const toRef = useRef();
  const plateRef = useRef();
  const passengersRef = useRef();
  const driverRef = useRef();

  const onFormSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === true) {
      const [id, name] = driverHandler();

      const trip = {
        from: fromRef.current.value,
        to: toRef.current.value,
        plate: plateRef.current.value,
        driver: {
          name,
          id,
        },
        passengers: passengersRef.current.value,
      };

      dispatch(createTripThunk(trip));
      props.handleClose();
    }
    setValidated(true);
  };

  const driverHandler = () => {
    const target = driverRef.current.options;
    const idx = target.selectedIndex;

    const driverId = driverRef.current.value;
    const driverName = target[idx].textContent;

    return [driverId, driverName];
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={onFormSubmit}
      className={classes['form-signout']}
    >
      <Form.Group className="mb-3">
        <Form.Control required ref={fromRef} type="text" placeholder="From" />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control required ref={toRef} type="text" placeholder="To" />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          required
          ref={plateRef}
          type="text"
          placeholder="license plate"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          {drivers.length === 0
            ? 'No drivers available :( Add drivers on the "Users" page'
            : 'Choose an available driver:'}
        </Form.Label>
        <Form.Select ref={driverRef} aria-label="Select role">
          {drivers.map(el => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          required
          ref={passengersRef}
          type="number"
          placeholder="Passengers"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Button
          disabled={drivers.length === 0 ? true : false}
          variant="primary"
          type="submit"
        >
          Create trip
        </Button>
      </Row>
    </Form>
  );
};

export default AddTripForm;
