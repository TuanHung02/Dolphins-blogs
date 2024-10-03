import React from "react";
import SidebarComponent from "../../components/SidebarComponent";
import HeaderComponent from "../../components/HeaderComponent";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return (
    <div className={styles.container}>
      <div className={styles["sidebar"]}>
        <SidebarComponent />
      </div>
      <div className={styles["wrapper"]}>
        <div className={styles["header"]}>
          <HeaderComponent />
        </div>
        <div className={styles["content"]}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
