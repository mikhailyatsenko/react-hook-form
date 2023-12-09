import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <main>
      {/* <h1>Choose the form:</h1> */}
      <nav>
        <Link to="/">Main</Link>
        <Link to="/controlled">Controlled</Link>
        <Link to="/uncontrolled">Uncontrolled form</Link>
      </nav>
      <Outlet />
    </main>
  );
}

export default App;
