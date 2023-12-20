import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <nav className={isMenuActive ? ' active-nav' : ''}>
      <div
        onClick={() => setIsMenuActive((prewState) => !prewState)}
        className={`hamburger-lines${isMenuActive ? ' active' : ''}`}
      >
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      <div className="menu-items">
        <Link
          onClick={() => setIsMenuActive(false)}
          className="link-menu"
          to="/"
        >
          Main Page
        </Link>
        <Link
          onClick={() => setIsMenuActive(false)}
          className="link-menu"
          to="/controlled"
        >
          React Hook Form
        </Link>
        <Link
          onClick={() => setIsMenuActive(false)}
          className="link-menu"
          to="/uncontrolled"
        >
          Uncontrolled form
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
