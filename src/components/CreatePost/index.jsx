import React, { useEffect, useState } from "react";
import styles from "./CreatePost.module.scss";
import { tagItems } from "../../constants/constant";
import { toolbarItems } from "../../constants/constant";
import { marked } from "marked";
import MultipleSelect from "../MutipleSelect";
import MarkdownToolbar from "../Toolbar";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [tagsSelected, setTagsSelected] = useState([]);
  const [isEditStatus, setIsEditStatus] = useState(true);

  const navigate = useNavigate();

  const handleInputTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const handleSelectTags = (tags) => {
    setTagsSelected(tags);
  };

  const togglePostStatus = (stt) => {
    setIsEditStatus(stt === "edit");
  };

  const handleSaveDraft = () => {
    localStorage.setItem("markdownContent", markdownContent);
    localStorage.setItem("postTitle", postTitle);
    localStorage.setItem("tagsSelected", tagsSelected);
    alert("Saved to localStorage!");
  };

  const handleSave = () => {
    const post = {
      postTitle,
      markdownContent,
      tagsSelected,
      date: new Date().toISOString(), // Bạn có thể thêm thời gian tạo bài viết
    };
    if (
      !post.postTitle ||
      !post.markdownContent ||
      post.tagsSelected.length === 0
    ) {
      alert("Post is missing some required information!");
      return;
    } else {
      // Lấy mảng bài viết đã lưu từ localStorage
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

      // Thêm bài viết mới vào mảng
      savedPosts.push(post);

      // Lưu lại mảng vào localStorage
      localStorage.setItem("posts", JSON.stringify(savedPosts));
      navigate("/myposts");
      alert("Post saved successfully!");
    }
  };

  useEffect(() => {
    const savedMarkdown = localStorage.getItem("markdownContent");
    const savedTitle = localStorage.getItem("postTitle");
    const savedTags = localStorage.getItem("tagsSelected");

    if (savedMarkdown) {
      setMarkdownContent(savedMarkdown);
    }
    if (savedTitle) {
      setPostTitle(savedTitle);
    }
    if (savedTags) {
      setTagsSelected(savedTags.split(","));
    }
  }, []);

  const convertMarkdownToHtml = () => {
    return { __html: marked(markdownContent) };
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles["header"]}>
          <h5>Create Post</h5>
          <div>
            <button
              onClick={() => togglePostStatus("edit")}
              type="btn"
              className={`btn ${isEditStatus ? styles.activebtn : ""}`}
            >
              Edit
            </button>
            <button
              onClick={() => togglePostStatus("preview")}
              type="btn"
              className={`btn ${!isEditStatus ? styles.activebtn : ""}`}
            >
              Preview
            </button>
          </div>
        </div>
        {isEditStatus ? (
          <div className={styles.content}>
            <div className={`${styles["content-title"]} ${styles.wrapper}`}>
              <div className={styles["btn-img"]}>Add a cover image</div>

              <input
                value={postTitle}
                className={styles["input-title"]}
                placeholder="New post title here..."
                onChange={handleInputTitle}
              ></input>

              <MultipleSelect
                tagsSelected={tagsSelected}
                items={tagItems}
                onChange={handleSelectTags}
              />
            </div>
            {/* <MarkdownEditor onChange={handleMarkdownChange} /> */}
            <MarkdownToolbar
              toolbarItems={toolbarItems}
              content={markdownContent}
              setContent={setMarkdownContent}
            />
          </div>
        ) : (
          <div className={styles.content}>
            <div className={`${styles["content-title"]} ${styles.wrapper}`}>
              <div className={styles["input-title"]}>{postTitle}</div>
              <div>{tagsSelected.join(", ")}</div>
              <div
                className={styles["markdown-content"]}
                dangerouslySetInnerHTML={convertMarkdownToHtml()}
              />
            </div>
          </div>
        )}

        <div className={styles["bottom"]}>
          <button
            style={{ backgroundColor: "rgb(59, 73, 223)", color: "white" }}
            type="btn"
            className="btn"
            onClick={handleSave}
          >
            Save
          </button>
          <button onClick={handleSaveDraft} type="btn" className="btn">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
