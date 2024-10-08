import React, { useEffect, useRef, useState } from "react";
import styles from "./Toolbar.module.scss";

const MarkdownToolbar = ({ content, toolbarItems, setContent }) => {
  const textareaRef = useRef(null);
  const [caretPosition, setCaretPosition] = useState(null); // Trạng thái để lưu vị trí con trỏ

  
  // Hàm để lấy phần văn bản đang được bôi đen
  const getSelectedText = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    return { start, end, selectedText: textarea.value.substring(start, end) };
  };

  // Hàm để đặt lại vị trí con trỏ sau khi render
  useEffect(() => {
    if (caretPosition !== null) {
      textareaRef.current.setSelectionRange(caretPosition, caretPosition);
      textareaRef.current.focus();
    }
  }, [caretPosition]); // Chỉ chạy khi caretPosition thay đổi

  // Hàm để kiểm tra xem một đoạn văn bản đã có định dạng markdown chưa
  const isFormattedWith = (selectedText, markdown) => {
    const startMarkdown = markdown;
    const endMarkdown = markdown;
    return (
      selectedText.startsWith(startMarkdown) &&
      selectedText.endsWith(endMarkdown)
    );
  };

  // Hàm để thêm hoặc gỡ bỏ định dạng markdown
  const applyMarkdown = (e, markdown, wrap) => {
    e.preventDefault()
    const { start, end, selectedText } = getSelectedText();
    const before = content.substring(0, start);
    const after = content.substring(end, content.length);
    if (selectedText) {
      // Nếu có văn bản đang được bôi đen
      if (wrap) {
        const formattedText = isFormattedWith(selectedText, markdown)
          ? selectedText.slice(
              markdown.length,
              selectedText.length - markdown.length
            )
          : markdown + selectedText + markdown;
        setContent(before + formattedText + after);
        setCaretPosition(start + markdown.length); // Đặt lại con trỏ
      } else {
        setContent(before + markdown + selectedText + after);
      }
    } else {
      // Nếu không có văn bản nào được bôi đen
      if (markdown === "1. " || markdown === "- " || markdown === "# ") {
        // Đối với danh sách thì chỉ thêm một lần
        setContent(before + markdown + after);
        setCaretPosition(start + markdown.length);
      } else {
        const insertText = markdown + markdown;
        setContent(before + insertText + after);
        setCaretPosition(start + markdown.length);
      }
    }
  };

  return (
    <div>
      <div className={styles.toolbar}>
        {toolbarItems.map((item) => {
          return (
            <button
              key={item.id}
              onMouseDown={(e) => applyMarkdown(e, item.markdown, item.wrap)}
              type="btn"
              className="btn btn-outline-secondary"
            >
              <i className={item.icon}></i>
            </button>
          );
        })}
      </div>

      <textarea
        className={styles["content-markdown"]}
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default MarkdownToolbar;
