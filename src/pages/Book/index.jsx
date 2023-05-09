import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { request } from "../../api/axios";

function Book() {
  //   const { books } = useSelector((state) => state.books);
  const [book, setBook] = useState([]);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const navigate = useNavigate();

  const handleRemoveBook = async (e) => {
    try {
      const res = await request.delete(`/books/${path}`);
      navigate("/books");
    } catch (err) {
      console.log(err);
    }
  };
  //   useEffect(() => {
  //     const filteredBook = books.filter((book) => book._id === path);
  //     setBook(filteredBook[0]);
  //   }, []);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await request.get(`/books/${path}`);
        setBook(res.data);
      } catch (err) {
        if (err.response.data === "Book Not Found") {
          navigate("/books");
        }
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div>{book.name}</div>
      <div>Volume : {book.volume}</div>
      <div>Category : {book.category}</div>
      <div>Status : {book.status}</div>
      <button onClick={handleRemoveBook}>Remove Book</button>
    </>
  );
}

export default Book;
