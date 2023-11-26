import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between bg-gray-900 min-h-screen">
      <Navbar />

      <div className=" px-4 md:px-10 min-h-[85vh]">{children}</div>

      {/* Footer */}
      <div className="flex min-h-[5vh] items-center justify-center bg-gray-800 text-white font-semibold">
        <p>FreeChat &copy; 2023</p>
      </div>
    </div>
  );
};

export default Layout;
