import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';

import PopUpWindow from '../ui/PopUpWindow';
import PhoneSignInForm from './PhoneSignInForm';

import { Facebook } from 'react-bootstrap-icons';
import { Google } from 'react-bootstrap-icons';
import { PhoneFill } from 'react-bootstrap-icons';

import { signInWithEmailThunk } from '../../store/auth-slice';
import { signInWithGoogleThunk } from '../../store/auth-slice';
import { signInWithFacebookThunk } from '../../store/auth-slice';
import { enableCaptchaThunk } from '../../store/auth-slice';

import classes from './Auth.module.css';

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
  };

  const onGoogleSignIn = () => {
    dispatch(signInWithGoogleThunk());
  };
  const onFacebookSignIn = () => {
    dispatch(signInWithFacebookThunk());
  };
  const onPhoneSignIn = event => {
    dispatch(authActions.openModal());
    dispatch(enableCaptchaThunk());
  };

  return (
    <>
      <PopUpWindow heading="Confirm your phone number">
        <PhoneSignInForm />
      </PopUpWindow>
      <div className={classes['form-text']}>Sign in with:</div>
      <Row className={classes['icon-container']}>
        <Col>
          <Facebook onClick={onFacebookSignIn} size={48} />
        </Col>
        <Col>
          <PhoneFill onClick={onPhoneSignIn} size={48} />
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
            placeholder="Email"
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
