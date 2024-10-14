import React, { useEffect, useRef, useState } from "react";
import styles from "./MarkdownEditor.module.scss";

const MarkdownEditor = ({ content, setContent }) => {
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

  const setBold = (e, markdown) => {
    e.preventDefault(); // Ngăn sự kiện mặc định của nút bấm

    const { start, end, selectedText } = getSelectedText();
    const before = content.substring(0, start);
    const after = content.substring(end, content.length);

    let formattedText;
    let newCaretPositionStart;
    let newCaretPositionEnd;

    if (selectedText) {
      // Khi có văn bản được chọn
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

    // Đặt lại vị trí con trỏ hoặc vùng bôi đen
    setCaretPosition({
      start: newCaretPositionStart,
      end: newCaretPositionEnd,
    });
  };
  const setList = (e, markdown) => {
    e.preventDefault(); // Ngăn sự kiện mặc định của nút bấm

    const { start, end, selectedText } = getSelectedText();
    const before = content.substring(0, start);
    const after = content.substring(end, content.length);

    let formattedText;
    let newCaretPositionStart;
    let newCaretPositionEnd;
    if (selectedText) {
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
    } else {
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
    }
    // Đặt lại vị trí con trỏ hoặc vùng bôi đen
    setCaretPosition({
      start: newCaretPositionStart,
      end: newCaretPositionEnd,
    });
  };

  const setHeading = (e) => {
    e.preventDefault(); // Ngăn sự kiện mặc định của nút bấm

    const { start, end, selectedText } = getSelectedText();
    const before = content.substring(0, start);
    const after = content.substring(end, content.length);

    let formattedText;
    let newCaretPositionStart;
    let newCaretPositionEnd;

    if (selectedText) {
      // Xử lý khi có văn bản được chọn
      const currentHeadingLevel = selectedText.match(/^#+/)?.[0]?.length || 0;

      if (currentHeadingLevel < 4) {
        const newHeadingLevel = currentHeadingLevel + 1;
        formattedText =
          "#".repeat(newHeadingLevel) +
          " " +
          selectedText.replace(/^#+\s*/, "");
      } else {
        formattedText = selectedText.replace(/^#+\s*/, ""); // Quay lại trạng thái ban đầu khi có 4 dấu #
      }

      newCaretPositionStart = start; // Giữ vị trí con trỏ ban đầu
      newCaretPositionEnd = start + formattedText.length; // Di chuyển con trỏ tới cuối đoạn văn bản mới
      setContent(before + formattedText + after);
    } else {
      // Xử lý khi không có văn bản được chọn
      let newLineNeeded = false;

      // Kiểm tra xem con trỏ có phải ở đầu dòng hay không
      if (start > 0 && before[start - 1] !== "\n") {
        newLineNeeded = true;
      }

      const currentHeadingLevel = selectedText.match(/^#+/)?.[0]?.length || 0;
      let formattedText;

      if (currentHeadingLevel < 4) {
        const newHeadingLevel = currentHeadingLevel + 1;
        formattedText =
          "#".repeat(newHeadingLevel) +
          " " +
          selectedText.replace(/^#+\s*/, "");
      } else {
        formattedText = selectedText.replace(/^#+\s*/, ""); // Quay lại trạng thái ban đầu khi có 4 dấu #
      }

      // Nếu cần thêm dòng mới, thêm ký tự xuống dòng trước khi thêm heading
      if (newLineNeeded) {
        formattedText = "\n" + formattedText;
      }

      newCaretPositionStart = start + (newLineNeeded ? 1 : 0); // Giữ vị trí con trỏ ban đầu (có điều chỉnh nếu thêm dòng mới)
      newCaretPositionEnd = newCaretPositionStart + formattedText.length; // Di chuyển con trỏ tới cuối đoạn văn bản mới

      setContent(before + formattedText + after);
    }

    // Cập nhật vị trí con trỏ chuột
    setCaretPosition({
      start: newCaretPositionStart,
      end: newCaretPositionEnd,
    });
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <button
          onClick={(e) => setBold(e, "**")}
          type="button"
          className="btn btn-outline-secondary"
        >
          <i className="fa-solid fa-bold"></i>
        </button>
        <button
          onClick={(e) => setBold(e, "_")}
          type="button"
          className="btn btn-outline-secondary"
        >
          <i className=" fa-solid fa-italic"></i>
        </button>

        <button
          onClick={(e) => setList(e, "1. ")}
          type="button"
          className="btn btn-outline-secondary"
        >
          <i className="fa-solid fa-list-ol"></i>
        </button>
        <button
          onClick={(e) => setList(e, "- ")}
          type="button"
          className="btn btn-outline-secondary"
        >
          <i className="fa-solid fa-list-ul"></i>
        </button>
        <button
          onClick={(e) => setHeading(e, "#")}
          type="button"
          className="btn btn-outline-secondary"
        >
          <i className="fa-solid fa-heading"></i>
        </button>
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

export default MarkdownEditor;
