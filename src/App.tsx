import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Draft from "./pages/Draft";
import Tag from "./pages/Tag";
import Blog from "./pages/Blog";
import AddBlog from "./pages/AddBlog";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tag" element={<Tag />} />
            <Route path="/draft" element={<Draft />} />
            <Route path="/setting" element={<Login />} />

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
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
