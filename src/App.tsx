import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './App.scss';

function App() {
  return (
    <>
      <nav>
        <Link className="link-menu" to="/">
          Main Page
        </Link>
        <Link className="link-menu" to="/controlled">
          React Hook Form
        </Link>
        <Link className="link-menu" to="/uncontrolled">
          Uncontrolled form
        </Link>
      </nav>

      <main>
        <div className="container">
          {/* <h1>Choose the form:</h1> */}

          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
