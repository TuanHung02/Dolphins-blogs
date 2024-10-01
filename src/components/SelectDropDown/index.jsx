import React from "react";
import styles from "./SelectDropDown.module.scss";

const SelectDropDown = () => {
  return (
    <div style={{ position: "relative" }}>
      <div className={styles["custom-select"]}>
        <select>
          <option>1 Week</option>
          <option>1 Month</option>
          <option>3 Months</option>
          <option>6 Months</option>
        </select>
      </div>
      <div className={styles["custom-icon"]}>
        <i className="fa-solid fa-angle-down"></i>
      </div>
    </div>
  );
};

export default SelectDropDown;
