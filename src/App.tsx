import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Layout from "./components/layout/Layout";
import { Toaster } from "react-hot-toast";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Login = React.lazy(() => import("./pages/Login"));
const Draft = React.lazy(() => import("./pages/Draft"));
const Tag = React.lazy(() => import("./pages/Tag"));
const Blog = React.lazy(() => import("./pages/Blog"));
const AddBlog = React.lazy(() => import("./pages/AddBlog"));
const BlogDetails = React.lazy(() => import("./pages/BlogDetails"));
const EditBlog = React.lazy(() => import("./pages/EditBlog"));

import ProtectedRoute from "./routes/ProtectedRoutes";
import NotFound from "./pages/NotFound";
const Loading = React.lazy(() => import("./components/common/Loading"));
const Search = React.lazy(() => import("./pages/Search"));

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              {" "}
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tag" element={<Tag />} />
              <Route path="/draft" element={<Draft />} />
              <Route path="/setting" element={<Login />} />
              <Route path="/search" element={<Search />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route
                path="/blog/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditBlog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/addblog"
                element={
                  <ProtectedRoute>
                    <AddBlog />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
