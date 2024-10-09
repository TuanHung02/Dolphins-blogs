import React, { useState } from 'react';

const MarkdownEditor = () => {
  const [text, setText] = useState("");

  const handleButtonClick = () => {
    const textarea = document.getElementById("myTextarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const prefix = "**"; // Ký tự bạn muốn thêm
    const suffix = "**";

    // Nếu có đoạn văn bản được bôi đen
    if (start !== end) {
      const selectedText = text.slice(start, end);
      const isWrapped = text.slice(start - prefix.length, start) === prefix && text.slice(end, end + suffix.length) === suffix;

      let newText;
      if (isWrapped) {
        // Xóa ký tự nếu đã tồn tại
        newText = text.slice(0, start - prefix.length) + selectedText + text.slice(end + suffix.length);
        textarea.setSelectionRange(start - prefix.length, end - prefix.length); // Cập nhật vị trí con trỏ
      } else {
        // Thêm ký tự nếu chưa có
        newText = text.slice(0, start) + prefix + selectedText + suffix + text.slice(end);
        textarea.setSelectionRange(start + prefix.length, end + suffix.length); // Cập nhật vị trí con trỏ
      }

      setText(newText);
    } else {
      // Nếu không có gì được bôi đen (chỉ thêm ký tự)
      const isAfterPrefix = text.slice(start - prefix.length, start) === prefix;
      const isAfterSuffix = text.slice(start, start + suffix.length) === suffix;

      let newText;
      if (isAfterPrefix && isAfterSuffix) {
        // Xóa ký tự nếu đã tồn tại
        newText = text.slice(0, start - prefix.length) + text.slice(start + suffix.length);
        textarea.setSelectionRange(start - prefix.length, start - prefix.length); // Đặt lại con trỏ
      } else {
        // Thêm ký tự vào vị trí con trỏ
        newText = text.slice(0, start) + prefix + suffix + text.slice(start);
        textarea.setSelectionRange(start + prefix.length, start + prefix.length); // Đặt con trỏ giữa hai ký tự
      }

      setText(newText);
    }
  };

  return (
    <div>
      <textarea
        id="myTextarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        cols={50}
      />
      <button onClick={handleButtonClick}>Thêm ký tự</button>
    </div>
  );
}

export default MarkdownEditor;