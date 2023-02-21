import React from "react";
import Sidebar from "./Sidebar";
function Layout({ children }) {
  return (
    // <div className="flex flex-col justify-center items-center h-[100vh]">
    // <div className="flex w-full h-[100vh] m-0 my-5 md:m-auto md:h-[90vh] md:w-[75vw] shadow-lg ">
    <div className="flex w-full h-[100vh]">
      <Sidebar />
      {children}
    </div>
    // </div>
    // </div>
  );
}

export default Layout;
