import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';

import { Facebook } from 'react-bootstrap-icons';
import { Google } from 'react-bootstrap-icons';

import classes from './SignInForm.module.css';

import { signUpWithEmailThunk } from '../../store/auth-slice';

const SignUpForm = function () {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passRef = useRef();
  const roleRef = useRef();

  const onFormSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === true) {
      dispatch(
        signUpWithEmailThunk(
          nameRef.current.value,
          emailRef.current.value,
          passRef.current.value,
          phoneRef.current.value,
          ageRef.current.value,
          roleRef.current.value
        )
      );
    }

    setValidated(true);
  };

  return (
    <>
      <div className={classes['form-text']}>Sign up with:</div>
      <Row className={classes['icon-container']}>
        <Col>
          <Facebook size={48} />
        </Col>
        <Col>
          <Google size={48} />
        </Col>
      </Row>
      <div className={classes['form-text']}>OR</div>

      <Form
        noValidate
        validated={validated}
        onSubmit={onFormSubmit}
        className={classes.form}
      >
        <Form.Group className="mb-3">
          <Form.Control required ref={nameRef} type="text" placeholder="Name" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control required ref={ageRef} type="text" placeholder="Age" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>You register as:</Form.Label>
          <Form.Select ref={roleRef} aria-label="Select role">
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
            <option value="dispatcher">Dispatcher</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            required
            ref={emailRef}
            type="email"
            placeholder="E-mail"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            required
            ref={phoneRef}
            type="tel"
            placeholder="Phone"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            required
            ref={passRef}
            type="password"
            placeholder="Password"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            required
            type="checkbox"
            label="Check me out"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Row>
          <Button variant="primary" type="submit" size="lg">
            Submit
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default SignUpForm;
