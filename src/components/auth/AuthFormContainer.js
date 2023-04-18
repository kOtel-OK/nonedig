import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

import PopUpWindow from '../ui/PopUpWindow';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import classes from './Auth.module.css';

const heading = 'Congrats! You have been registered!';
const text = 'Check your mail to verify account, and welcome aboard :)';

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

  const skipAuthWindowToSignIn = () => {
    dispatch(authActions.changeAuthMode('signIn'));
  };

  return (
    <>
      <PopUpWindow
        heading={heading}
        btnText="Got It!"
        onPopUpWindowClose={skipAuthWindowToSignIn}
      >
        {text}
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
