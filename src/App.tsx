import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import { Toaster } from 'react-hot-toast';


import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Draft from "./pages/Draft";
import Tag from "./pages/Tag";
import Blog from "./pages/Blog";

function App() {

  return (
    <>
  <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/tag" element={<Tag />} />
          <Route path="/draft" element={<Draft />} />
          <Route path="/setting" element={<Login />} />
          
        </Routes>
      </Layout>
    </Router>
          <Toaster />

    </>
  )
}

export default App
