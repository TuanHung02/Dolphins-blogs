import React, { useEffect, useRef, useState } from "react";
import styles from "./Toolbar.module.scss";

const MarkdownToolbar = ({ content, toolbarItems, setContent }) => {
  const textareaRef = useRef(null);
  const [caretPosition, setCaretPosition] = useState(null);
  const [headingClicks, setHeadingClicks] = useState(0); // Lưu số lần nhấn vào heading

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
          // Trường hợp xử lý khi không có wrap (ví dụ markdown kiểu heading với #)
          if (selectedText.startsWith(markdown)) {
            // Nếu văn bản đã được bọc bởi markdown (ví dụ: # Heading), thì loại bỏ markdown
            formattedText = selectedText.slice(markdown.length); // Loại bỏ markdown ở đầu
            newCaretPositionStart = start; // Giữ nguyên vị trí con trỏ bắt đầu
            newCaretPositionEnd = start + formattedText.length; // Điều chỉnh vị trí con trỏ kết thúc
          } else {
            // Nếu chưa được bọc, thêm markdown vào trước đoạn văn bản đã chọn
            formattedText = markdown + selectedText; // Thêm markdown ở đầu
            newCaretPositionStart = start; // Di chuyển con trỏ đến trước dấu markdown
            newCaretPositionEnd = start + formattedText.length; // Điều chỉnh vị trí con trỏ kết thúc để bôi đen cả markdown
          }

          // Cập nhật nội dung và vị trí con trỏ
          setContent(before + formattedText + after);
        }
      } else {
        // Khi không có văn bản được chọn
        if (["1. ", "- ", "# ", "## ","### ","#### "].includes(markdown)) {
          const isToggling =
            content.substring(start - markdown.length, start) === markdown;

          if (isToggling) {
            // Nếu đã có markdown, xóa đi và di chuyển con trỏ về vị trí ban đầu
            setContent(
              before.slice(0, start - markdown.length) +
                after.slice(markdown.length)
            );
            newCaretPositionStart = start - markdown.length;
            newCaretPositionEnd = start - markdown.length;
          } else {
            // Kiểm tra nếu có bất kỳ ký tự nào trước con trỏ
            if (before.length > 0 && before[before.length - 1] !== "\n") {
              // Nếu có ký tự, thêm xuống dòng trước markdown
              formattedText = "\n" + markdown; // thêm xuống dòng trước và sau markdown
            } else {
              // Nếu không có ký tự, chỉ cần thêm markdown và một dòng xuống
              formattedText = markdown; // thêm markdown và xuống dòng
            }

            newCaretPositionStart = start + formattedText.length; // di chuyển con trỏ xuống dòng
            newCaretPositionEnd = newCaretPositionStart;
            setContent(before + formattedText + after);
          }
        } else {
          // Trường hợp bọc văn bản khác (ví dụ: **bold**)
          const isToggling =
            content.substring(start - markdown.length, start) === markdown &&
            content.substring(end, end + markdown.length) === markdown;

          if (isToggling) {
            // Nếu đã có markdown, xóa đi và di chuyển con trỏ về vị trí ban đầu
            setContent(
              before.slice(0, start - markdown.length) +
                after.slice(markdown.length)
            );
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
        placeholder="Write your post content here..."
      />
    </div>
  );
};

export default MarkdownToolbar;
