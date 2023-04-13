import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import classes from './AuthFormContainer.module.css';

const AuthFormContainer = function () {
  const [authMode, setAuthMode] = useState('signIn');
  const [btnSignInActive, setbtnSignInActive] = useState(false);
  const [btnSignUpActive, setbtnSignUpActive] = useState(false);

  useEffect(() => {
    if (authMode === 'signIn') {
      setbtnSignInActive(true);
      setbtnSignUpActive(false);
    } else {
      setbtnSignUpActive(true);
      setbtnSignInActive(false);
    }
  }, [authMode]);

  const toggleAuth = event => {
    const authBtnText = event.target.textContent;
    event.target.setAttribute('active', '');

    if (authBtnText === 'Login') {
      setAuthMode('signIn');
    } else if (authBtnText === 'Register') {
      setAuthMode('signUp');
    }
  };

  return (
    <div className={classes['auth-form-container']}>
      <Row onClick={toggleAuth} className={classes['btn-container']}>
        <Col sm={6}>
          <Button
            active={btnSignInActive}
            size="lg"
            variant="primary"
            className={classes['btn-auth']}
          >
            Login
          </Button>
        </Col>
        <Col sm={6}>
          <Button
            active={btnSignUpActive}
            size="lg"
            variant="primary"
            className={classes['btn-auth']}
          >
            Register
          </Button>
        </Col>
      </Row>
      {authMode === 'signIn' && <SignInForm />}
      {authMode === 'signUp' && <SignUpForm />}
    </div>
  );
};

export default AuthFormContainer;
