import React from "react";

function Navbar() {
  return (
    <nav className="px-5 py-3 d-flex justify-content-between bg-primary align-items-center border-bottom border-primary-subtle">
      <div id="logo">
        <h3 className="fw-bold fs-5 m-0 text-white">Do-Task</h3>
      </div>
      <ul className="d-flex list-unstyled m-0 gap-4 text-white">
        <li>Home</li>
        <li>Your  Tasks</li>
      </ul>
    </nav>
  );
}

export default Navbar;
