import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const handleLogoClick = () => {
    window.location.href = "https://aits-tpt.edu.in";
  };

  const cardStyle = {
    width: '50px',
    height: '50px',
    marginRight: '10px',
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={handleLogoClick}>
            <div className="d-flex align-items-center">
              <div className="card p-1 bg-light" style={cardStyle}>
                <img
                  src={`${process.env.PUBLIC_URL}/aitsclglogo1.png`}
                  alt="College Logo"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <span className="ms-2">Student Application</span>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <Link className="btn btn-outline-light" to="/adduser">
                Add User
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
