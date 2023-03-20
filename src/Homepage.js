import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <h1>Grizzco Industries</h1>
      <Link to="/shop">
        Ready to become a part of something bigger than yourself?
      </Link>
    </div>
  );
}

export default Homepage;
