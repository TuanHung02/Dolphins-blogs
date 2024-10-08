import React, { useState, useRef } from 'react';

const MarkdownEditor = ({ onChange }) => {
  const [text, setText] = useState(''); // Quản lý nội dung của textarea
  const [selection, setSelection] = useState({ start: null, end: null }); // Lưu vị trí bôi đen
  const textareaRef = useRef(null); // Ref để lấy vị trí con trỏ trong textarea

  // Hàm xử lý khi người dùng bôi đen văn bản
  const handleSelect = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Lưu lại vị trí bôi đen
    if (start !== end) {
      setSelection({ start, end });
    }
  };

  // Hàm chèn/loại bỏ bold
  const handleBoldClick = () => {
    const textarea = textareaRef.current;
    const { start, end } = selection;

    if (start !== null && end !== null && start !== end) {
      const selectedText = text.slice(start, end);

      let newText;
      // Kiểm tra nếu text đã có ** ở đầu và cuối thì xóa chúng
      if (selectedText.startsWith('**') && selectedText.endsWith('**')) {
        newText = text.slice(0, start) + selectedText.slice(2, -2) + text.slice(end);
      } else {
        // Nếu chưa có **, thêm chúng vào đầu và cuối đoạn bôi đen
        newText = text.slice(0, start) + `**${selectedText}**` + text.slice(end);
      }

      setText(newText);
      onChange(newText);

      // Cập nhật lại vị trí con trỏ để giữ vùng bôi đen sau khi chỉnh sửa
      const newEnd = end + 4; // Thêm 4 ký tự (2 ** ở đầu và 2 ** ở cuối)
      setSelection({ start, end: newEnd });

      setTimeout(() => {
        textarea.selectionStart = start;
        textarea.selectionEnd = newEnd;
      }, 0);
    }
  };

  // Hàm để theo dõi thay đổi nội dung textarea
  const handleChange = (e) => {
    const newValue = e.target.value;
    setText(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <div className="toolbar">
        <button onClick={handleBoldClick}><strong>B</strong></button>
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onSelect={handleSelect} // Gọi hàm handleSelect khi người dùng bôi đen văn bản
        rows="10"
        cols="50"
        placeholder="Nhập markdown ở đây..."
      />
    </div>
  );
};

export default MarkdownEditor;