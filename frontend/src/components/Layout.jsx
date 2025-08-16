import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="p-5 flex-grow">
        <Outlet />
      </main>
      <Footer className="" />
    </div>
  );
};

export default Layout;