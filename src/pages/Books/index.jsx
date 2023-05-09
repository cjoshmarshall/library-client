import React, { useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { SET_BOOKS } from "./slice";
import Book from "../../components/Book";
import { Link } from "react-router-dom";
import { request } from "../../api/axios";
import { TbTrashXFilled } from "react-icons/tb";
import Loader from "../../components/Loader";

function Books() {
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleAddBook = () => {};

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await request.get("/books");
        dispatch(SET_BOOKS(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    getBooks();
  }, [dispatch]);

  return (
    <>
      {books ? (
        <div className="books-container">
          <div className="books-button-container">
            <button className="books-button" onClick={handleAddBook}>
              Add Book
            </button>
          </div>
          <div className="books-subcontainer">
            {books && books.map((book) => <Book data={book} key={book._id} />)}
          </div>
        </div>
      ) : (
        <div>
          No Books Available <TbTrashXFilled />
        </div>
      )}
    </>
  );
}

export default Books;
