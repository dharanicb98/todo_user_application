import React from "react";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
