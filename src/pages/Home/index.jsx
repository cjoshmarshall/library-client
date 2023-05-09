import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      Home
      <Link to="/users">
        <button>Users</button>
      </Link>
      <Link to="/books">
        <button>Books</button>
      </Link>
    </div>
  );
}

export default Home;
