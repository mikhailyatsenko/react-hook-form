import App from '../App';
import Controlled from '../components/Controlled';
import Uncontrolled from '../components/Uncontrolled';
import Main from '../components/Main';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'uncontrolled',
        element: <Uncontrolled />,
      },
      {
        path: 'controlled',
        element: <Controlled />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
