import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';

import './App.scss';

function App() {
  return (
    <>
      <Navigation />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
