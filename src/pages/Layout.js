import { Outlet } from 'react-router-dom';
import MainNav from '../components/main-nav/MainNav';
import Footer from '../components/footer/Footer';

const Layout = function () {
  return (
    <>
      <MainNav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
