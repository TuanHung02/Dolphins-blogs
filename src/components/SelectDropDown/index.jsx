import React, { useState } from "react";
import styles from "./SelectDropDown.module.scss";

const SelectDropDown = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles["custom-select-container"]}>
      <div className={styles["custom-select-header"]} onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : options[0].label}
        <span
          className={` ${styles.arrow} ${isOpen ? styles.open : ""}`}
        ></span>
      </div>

      {isOpen && (
        <ul className={styles["custom-select-options"]}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles["custom-select-option"]} ${
                selectedOption && selectedOption.value === option.value
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropDown;
