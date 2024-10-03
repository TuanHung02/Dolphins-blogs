import React, { useState, useEffect, useRef } from "react";
import styles from "./MutipleSelect.module.scss";

const MultipleSelect = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMaxItemsMessage, setShowMaxItemsMessage] = useState(false); // Trạng thái cho thông báo đủ 4 item
  const dropdownRef = useRef(null); // Ref để tham chiếu đến dropdown

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(filterText.toLowerCase())
  );

  const toggleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
      setShowMaxItemsMessage(false); // Ẩn thông báo khi xóa item
    } else if (selectedItems.length < 4) {
      const newSelectedItems = [...selectedItems, item];
      setSelectedItems(newSelectedItems);
      if (newSelectedItems.length === 4) {
        setDropdownOpen(false); // Tự động đóng dropdown khi chọn đủ 4 item
      }
    }
  };
  const handleInputClick = (e) => {
    e.stopPropagation(); // Ngăn sự kiện làm đóng dropdown
    if (selectedItems.length < 4) {
      setDropdownOpen(true); // Chỉ mở khi chưa chọn đủ 4 item
      setShowMaxItemsMessage(false); // Ẩn thông báo nếu dropdown mở lại
    } else {
      setShowMaxItemsMessage(true); // Hiển thị thông báo khi đã đủ 4 item
    }
  };

  const removeSelectedItem = (item) => {
    const newSelectedItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(newSelectedItems);
    setShowMaxItemsMessage(false); // Ẩn thông báo khi xóa item
    if (newSelectedItems.length < 4) {
      setDropdownOpen(true); // Mở lại dropdown khi xóa một item
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setShowMaxItemsMessage(false); // Ẩn thông báo khi click outside
      }
    };

    // Lắng nghe sự kiện click bên ngoài component
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup sự kiện khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      {/* Hiển thị thông báo nếu đã chọn đủ 4 item */}
      {showMaxItemsMessage && (
        <div className="max-items-message">Only 4 selections allowed.</div>
      )}
    </div>
  );
};

export default MultipleSelect;
