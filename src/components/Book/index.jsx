import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

function Book({ data }) {
  return (
    <div className="book-container">
      <Link to={`/books/${data._id}`}>
        <div className="book-subcontainer">
          <div className="book-category">
            <span>{data.category}</span>
          </div>
          <div className="book-name">{data.name}</div>
          <div className="book-volume">Volume : {data.volume}</div>
          <div className="book-status">Status : {data.status}</div>
        </div>
      </Link>
    </div>
  );
}

export default Book;
