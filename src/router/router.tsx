import App from '../App';
import Controlled from '../containers/Controlled';
import Uncontrolled from '../containers/Uncontrolled';
import Main from '../containers/Main';
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
