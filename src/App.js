import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import ContactUs from "./components/ContactUs/ContactUs";
import Admin from "./components/Admin/Admin";
import SideNav from "./components/SideNav/SideNav";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./App.css";

function Layout(props) {
  const { isOpen, toggleNav } = props;

  return (
    <div className="App">
      <Header isOpen={isOpen} toggleNav={toggleNav} />
      <SideNav isOpen={isOpen} toggleNav={toggleNav} />
      {props.children}
      <Footer />
    </div>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Layout isOpen={isOpen} toggleNav={toggleNav}>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout isOpen={isOpen} toggleNav={toggleNav}>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout isOpen={isOpen} toggleNav={toggleNav}>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <Layout isOpen={isOpen} toggleNav={toggleNav}>
              <Admin />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}
