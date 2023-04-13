import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';

import { Facebook } from 'react-bootstrap-icons';
import { Google } from 'react-bootstrap-icons';

import { signInWithEmailThunk } from '../../store/auth-slice';
import { signInWithGoogleThunk } from '../../store/auth-slice';

import classes from './SignInForm.module.css';

const SignInForm = function () {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passRef = useRef();

  const onFormSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === true) {
      dispatch(
        signInWithEmailThunk(emailRef.current.value, passRef.current.value)
      );
    }

    setValidated(true);
    // event.preventDefault();

    // dispatch(
    //   signInWithEmailThunk(emailRef.current.value, passRef.current.value)
    // );
  };

  const onGoogleSignIn = event => {
    console.log('Google');
    dispatch(signInWithGoogleThunk());
  };
  return (
    <>
      <div className={classes['form-text']}>Sign in with:</div>
      <Row className={classes['icon-container']}>
        <Col>
          <Facebook size={48} />
        </Col>
        <Col>
          <Google onClick={onGoogleSignIn} size={48} />
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
          <Form.Control
            required
            ref={emailRef}
            type="email"
            placeholder="Enter email or phone"
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

export default SignInForm;
