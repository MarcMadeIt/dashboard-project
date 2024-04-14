import React from "react";
import Navbar from "@/app/ui/dashboard/navbar/navbar.jsx";
import Sidebar from "@/app/ui/dashboard/sidebar/sidebar.jsx";
import styles from "@/app/ui/dashboard/dashboard.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
