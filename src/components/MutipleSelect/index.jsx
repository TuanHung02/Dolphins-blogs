import React, { useState, useEffect, useRef } from "react";
import styles from "./MutipleSelect.module.scss";

const MultipleSelect = ({tagsSelected, items, onChange }) => {
  const [selectedItems, setSelectedItems] = useState(tagsSelected);
  const [filterText, setFilterText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMaxItemsMessage, setShowMaxItemsMessage] = useState(false);
  const dropdownRef = useRef(null);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(filterText.toLowerCase())
  );

  const toggleSelectItem = (item) => {
    let newSelectedItems;

    if (selectedItems.includes(item)) {
      newSelectedItems = selectedItems.filter((i) => i !== item);
      setShowMaxItemsMessage(false);
    } else if (selectedItems.length < 4) {
      newSelectedItems = [...selectedItems, item];
      if (newSelectedItems.length === 4) {
        setDropdownOpen(false);
      }
    }

    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);  // Pass the selected items to the parent
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
    if (selectedItems.length < 4) {
      setDropdownOpen(true);
      setShowMaxItemsMessage(false);
    } else {
      setShowMaxItemsMessage(true);
    }
  };

  const removeSelectedItem = (item) => {
    const newSelectedItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(newSelectedItems);
    setShowMaxItemsMessage(false);

    if (newSelectedItems.length < 4) {
      setDropdownOpen(true);
    }
    onChange(newSelectedItems);  // Pass the updated selected items to the parent
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setShowMaxItemsMessage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (tagsSelected && tagsSelected.length > 0) {
      setSelectedItems(tagsSelected);
    }
  }, [tagsSelected]);

  return (
    <div className={styles["multiple-select"]} ref={dropdownRef}>
      <div className={styles["input-container"]}>
        <div className={styles["selected-items"]}>
          {selectedItems.map((item) => (
            <div key={item} className={styles["selected-item"]}>
              {item}
              <span
                className={styles["remove-item"]}
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedItem(item);
                }}
              >
                <i style={{ fontSize: "12px" }} className="fa-solid fa-x"></i>
              </span>
            </div>
          ))}
          <input
            type="text"
            placeholder={`${selectedItems.length >= 4 ? "" : "Add another..."}`}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onClick={handleInputClick}
          />
        </div>
      </div>

      {dropdownOpen && (
        <div className={styles["dropdown-body"]}>
          <h6>Top Tags</h6>
          <hr />
          <ul>
            {filteredItems.map((item) => (
              <li
                key={item}
                className={selectedItems.includes(item) ? styles.selected : ""}
                onClick={() => toggleSelectItem(item)}
                style={{
                  cursor:
                    selectedItems.length >= 4 && !selectedItems.includes(item)
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    selectedItems.length >= 4 && !selectedItems.includes(item)
                      ? 0.6
                      : 1,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showMaxItemsMessage && (
        <div className="max-items-message">Only 4 selections allowed.</div>
      )}
    </div>
  );
};

export default MultipleSelect;  // Wrap the component with memo
