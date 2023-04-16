import { useSelector } from 'react-redux';
import AuthFormContainer from '../auth/AuthFormContainer';
import User from './User';
import Admin from './Admin';
// import PopUpWindow from '../auth/PopUpWindow';

// const heading = 'Congrats! You have been registered!';
// const text = 'Check your mail to verify account, and welcome aboard :)';

const Main = function () {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  return (
    <>
      {/* <PopUpWindow heading={heading} text={text} /> */}
      {isLoggedIn && !isAdmin && <User />}
      {isLoggedIn && isAdmin && <Admin />}
      {!isLoggedIn && <AuthFormContainer />}
    </>
  );
};

export default Main;
