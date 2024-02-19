import { Link } from "react-router-dom";
import { useUser } from "./Token";

const Navbar: React.FC = () => {
  const User = useUser();
  return (
    <nav className="navbar navbar-expand-md border-bottom border-dark">
      <div className="container-xxl">
        <a href="#" className="navbar-brand">
          <h1 className="fw-bold text-secondary">Blog</h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-nav"
          aria-expanded="false"
          aria-label="toggle"
        >
          {" "}
          <span className="navbar-toggler-icon"></span>{" "}
        </button>

        <div
          id="main-nav"
          className="collapse navbar-collapse justify-content-end align-center"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <p className="fs-4 fw-bold">Home</p>
              </Link>
            </li>
            {User ? (
              <li className="nav-item">
                <Link to="about" className="nav-link">
                  <p className="fs-4 fw-bold">About</p>
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="login" className="nav-link">
                    <p className="fs-4 fw-bold">Log-in</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="signup" className="nav-link">
                    <p className="fs-4 fw-bold">Sign-up</p>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
