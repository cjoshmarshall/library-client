import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import PersistRoute from "../PersistRoute";
// import Home from "../../pages/Home";
// import Signin from "../../pages/Signin";
// import Books from "../../pages/Books";
// import Users from "../../pages/Users";
// import Book from "../../pages/Book";
// import Error from "../../pages/Error";

const Home = lazy(() => import("../../pages/Home"));
const Signin = lazy(() => import("../../pages/Signin"));
const Books = lazy(() => import("../../pages/Books"));
const Users = lazy(() => import("../../pages/Users"));
const Book = lazy(() => import("../../pages/Book"));
const Error = lazy(() => import("../../pages/Error"));

function Router() {
  return (
    <Suspense fallback={"Loading..."}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route element={<PersistRoute />}>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/users" element={<Users />} />
              <Route path="/books/:id" element={<Book />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;
