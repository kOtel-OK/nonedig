import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

import PopUpWindow from '../ui/PopUpWindow';
import VerifyEmailWindow from './VerifyEmailWindow';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import classes from './Auth.module.css';

const AuthFormContainer = function () {
  const authMode = useSelector(state => state.auth.authMode);
  const dispatch = useDispatch();

  const toggleAuth = event => {
    const authBtnText = event.target.textContent;
    const authBtns = event.currentTarget.querySelectorAll('div button');

    authBtns.forEach(el => {
      el.classList.remove('active');
    });

    event.target.classList.add('active');

    if (authBtnText === 'Login') {
      dispatch(authActions.changeAuthMode('signIn'));
    } else if (authBtnText === 'Register') {
      dispatch(authActions.changeAuthMode('signUp'));
    }
  };

  return (
    <>
      <PopUpWindow heading="Congrats! You have been registered!">
        <VerifyEmailWindow />
      </PopUpWindow>

      <div className={classes['auth-form-container']}>
        <Row onClick={toggleAuth} className={classes['btn-container']}>
          <Col sm={6}>
            <Button
              size="lg"
              variant="primary"
              className={[classes['btn-auth'], 'active']}
            >
              Login
            </Button>
          </Col>
          <Col sm={6}>
            <Button size="lg" variant="primary" className={classes['btn-auth']}>
              Register
            </Button>
          </Col>
        </Row>
        {authMode === 'signIn' && <SignInForm />}
        {authMode === 'signUp' && <SignUpForm />}
      </div>
    </>
  );
};

export default AuthFormContainer;
