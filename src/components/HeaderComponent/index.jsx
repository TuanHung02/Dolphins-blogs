import React from "react";
import styles from "./HeaderComponent.module.scss";

const HeaderComponent = () => {
  return (
    <div className={styles}>
      <div className={styles.wrapper}>
        <div className={styles.searching}>
          <i className="fa fa-search"></i>
          <div>
            <input
              style={{
                width: "400px",
                background: "#E4E4E4",
                borderRadius: "0px 12px 12px 0px",
              }}
              className=" border-0 "
              type="search"
              placeholder="Enter here"
            />
            <span className="input-group-append"></span>
          </div>
        </div>
        <div className={styles.notify}>
          <div>
            <i
              style={{ fontSize: "20px", cursor: "pointer" }}
              className="fa-regular fa-bell"
            ></i>
          </div>
          <div>
            <img
              style={{
                borderRadius: "50%",
                height: "45px",
                width: "45px",
                cursor: "pointer",
              }}
              src="https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg"
              alt="profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
