import React from "react";
import SidebarComponent from "../../components/SidebarComponent";
import HeaderComponent from "../../components/HeaderComponent";
import styles from "./MainLayout.module.scss";
import HomePage from "../HomePage";

const MainLayout = () => {
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
          <HomePage />{" "}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
