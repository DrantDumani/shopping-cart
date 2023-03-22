import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="homepage">
      <h1 className="page-title">Grizzco Industries</h1>
      <span className="homepage-desc">
        Changing the world and creating the future
      </span>
      <Link className="link-btn" to="/shop">
        Ready to become a part of something bigger than yourself?
      </Link>
    </div>
  );
}

export default Homepage;
