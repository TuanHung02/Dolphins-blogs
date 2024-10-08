import React, { useEffect, useRef, useState } from "react";
import styles from "./Toolbar.module.scss";

const MarkdownToolbar = ({ content, toolbarItems, setContent }) => {
  const textareaRef = useRef(null);
  const [caretPosition, setCaretPosition] = useState(null);

  const getSelectedText = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    return { start, end, selectedText: textarea.value.substring(start, end) };
  };

  useEffect(() => {
    if (caretPosition !== null) {
      textareaRef.current.setSelectionRange(
        caretPosition.start,
        caretPosition.end
      );
      textareaRef.current.focus();
    }
  }, [caretPosition]);

  const isFormattedWith = (selectedText, markdown) => {
    // Kiểm tra nếu đoạn văn bản đã có định dạng Markdown ở đầu và cuối
    return selectedText.startsWith(markdown) && selectedText.endsWith(markdown);
  };

  const toggleMarkdownAtLineStart = (line, markdown) => {
    if (line.startsWith(markdown)) {
      // Nếu dòng đã có ký tự Markdown, loại bỏ chúng
      return line.slice(markdown.length);
    } else {
      // Nếu không có, thêm ký tự Markdown
      return markdown + line;
    }
  };

  const applyMarkdown = (e, markdown, wrap) => {
    e.preventDefault(); // Ngăn sự kiện mặc định của nút bấm
  
    const { start, end, selectedText } = getSelectedText();
    const before = content.substring(0, start);
    const after = content.substring(end, content.length);
  
    let formattedText;
    let newCaretPositionStart;
    let newCaretPositionEnd;
  
    if (selectedText) {
      // Khi có văn bản được chọn
      if (wrap) {
        formattedText = isFormattedWith(selectedText, markdown)
          ? selectedText.slice(
              markdown.length,
              selectedText.length - markdown.length
            )
          : markdown + selectedText + markdown;
  
        newCaretPositionStart = start;
        newCaretPositionEnd = start + formattedText.length;
        setContent(before + formattedText + after);
      } else {
        formattedText = markdown + selectedText;
        newCaretPositionStart = start + markdown.length;
        newCaretPositionEnd = end + markdown.length;
        setContent(before + formattedText + after);
      }
    } else {
      // Khi không có văn bản được chọn
      if (["1. ", "- ", "# "].includes(markdown)) {
        const currentLineStart = before.lastIndexOf("\n") + 1;
        const currentLine = content.substring(currentLineStart, start);
  
        const updatedLine = toggleMarkdownAtLineStart(currentLine, markdown);
        newCaretPositionStart = currentLineStart + markdown.length;
        newCaretPositionEnd = start + updatedLine.length - currentLine.length;
  
        setContent(before.substring(0, currentLineStart) + updatedLine + after);
      } else {
        // Trường hợp bọc văn bản khác (ví dụ: **bold**)
        const isToggling = content.substring(start - markdown.length, start) === markdown &&
                           content.substring(end, end + markdown.length) === markdown;
  
        if (isToggling) {
          // Nếu đã có markdown, xóa đi và di chuyển con trỏ về vị trí ban đầu
          setContent(before.slice(0, start - markdown.length) + after.slice(markdown.length));
          newCaretPositionStart = start - markdown.length;
          newCaretPositionEnd = start - markdown.length;
        } else {
          // Thêm markdown mới và đặt con trỏ giữa
          formattedText = markdown + markdown;
          newCaretPositionStart = start + markdown.length;
          newCaretPositionEnd = newCaretPositionStart;
          setContent(before + formattedText + after);
        }
      }
    }
  
    // Đặt lại vị trí con trỏ hoặc vùng bôi đen
    setCaretPosition({
      start: newCaretPositionStart,
      end: newCaretPositionEnd,
    });
  };
  

  return (
    <div>
      <div className={styles.toolbar}>
        {toolbarItems.map((item) => (
          <button
            key={item.id}
            onClick={(e) => applyMarkdown(e, item.markdown, item.wrap)}
            type="button"
            className="btn btn-outline-secondary"
          >
            <i className={item.icon}></i>
          </button>
        ))}
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
