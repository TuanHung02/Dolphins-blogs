import React, { useEffect, useRef, useState } from "react";
import styles from "./SelectDropDown.module.scss";

const SelectDropDown = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null); // To reference the dropdown container

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // Handle clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach the event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["custom-select-container"]} ref={dropdownRef}>
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
