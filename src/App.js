import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';

import Layout from './pages/Layout';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: 'profile',
            element: <UserPage />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: 'admin',
            element: <AdminPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
