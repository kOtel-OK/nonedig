import { useSelector } from 'react-redux';
import AuthFormContainer from '../auth/AuthFormContainer';
import User from './User';
import Admin from './Admin';

const Main = function () {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  return (
    <>
      {isLoggedIn && !isAdmin && <User />}
      {isLoggedIn && isAdmin && <Admin />}
      {!isLoggedIn && <AuthFormContainer />}
    </>
  );
};

export default Main;
