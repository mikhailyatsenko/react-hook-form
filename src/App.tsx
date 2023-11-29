import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Uncontrolled from './components/Uncontrolled';
import Controlled from './components/Controlled';
import Error from './components/Error';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/controlled" element={<Controlled />} />
      <Route path="/uncontrolled" element={<Uncontrolled />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}

export default App;
