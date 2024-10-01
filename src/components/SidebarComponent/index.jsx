import React, { useState } from "react";
import styles from "./SidebarComponent.module.scss";
import logo from "../../assets/logo.png";
import { options, trendings } from "../../constants/constant";

const SidebarComponent = () => {
  

  const [activeOptionId, setActiveOptionId] = useState(1);

  const handleActiveOption = (id) => {
    setActiveOptionId(id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <div className={styles["logo-icon"]}>
          <img src={logo} alt="logo" />
          <p>TeamDolphins</p>
        </div>
        <div style={{cursor: "pointer"}}>
          <i style={{fontSize: "25px"}} className="fa-solid fa-grip-lines"></i>
        </div>
      </div>
      <div className={styles["option"]}>
        {options.map((item) => (
          <div
            key={item.id}
            onClick={() => handleActiveOption(item.id)}
            className={`${styles["option-item"]} ${
              activeOptionId === item.id ? styles["option-item-active"] : ""
            }`}
          >
            <i className={item.icon}></i>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: "0px 20px" }}>
        <hr />
      </div>
      <div className={styles["trending"]}>
        <p style={{ fontSize: "12px", color: "black", padding: "6px 20px" }}>
          Trending tags
        </p>
        {trendings.map((item) => (
          <div key={item.id} className={styles["trending-item"]}>
            <p># {item.title}</p>
            <div className={styles.tag}>{item.tags}</div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <p>See All</p>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </div>
      </div>
      {/* <div>Dark mode</div> */}
    </div>
  );
};

export default SidebarComponent;
