import React, { useEffect, useState } from "react";
import styles from "./EditPost.module.scss";
import { tagItems } from "../../constants/constant";
import { marked } from "marked";
import MultipleSelect from "../MutipleSelect";
// import MarkdownToolbar from "../Toolbar";
import { useNavigate, useParams } from "react-router-dom";
import MarkdownEditor from "./../MarkdownEditor/index";

const EditPost = () => {
  const { id } = useParams(); // Lấy id từ URL

  const posts = JSON.parse(localStorage.getItem("posts")); 
  const post = posts.find((post) => post.id === parseInt(id));

  const [markdownContent, setMarkdownContent] = useState(post.markdownContent);
  const [postTitle, setPostTitle] = useState(post.postTitle);
  const [tagsSelected, setTagsSelected] = useState(post.tagsSelected);
  const [isEditStatus, setIsEditStatus] = useState(true);
  const [image, setImage] = useState(post.image);

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

  const handleSave = () => {
    if (!markdownContent && !postTitle && tagsSelected.length === 0) {
      alert("Post is empty!");
      return;
    } else {
      localStorage.setItem("markdownContent", markdownContent);
      localStorage.setItem("postTitle", postTitle);
      localStorage.setItem("tagsSelected", tagsSelected);
      localStorage.setItem("image", image);
      alert("Saved");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Lưu URL ảnh để hiển thị
      };
      reader.readAsDataURL(file); // Đọc file ảnh
    }
  };

  const handleRemoveImage = () => {
    setImage("null"); 
  };

  const handleSaveDraft = () => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

    const updatedPosts = savedPosts.map((savedPost) => {
      if (savedPost.id === post.id) {
        return {
          ...savedPost,
          postTitle,
          markdownContent,
          tagsSelected,
          date: new Date().toLocaleString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          image,
        };
      }
      return savedPost;
    });

    if (!postTitle || !markdownContent || tagsSelected.length === 0) {
      alert("Post is missing some required information!");
      return;
    } else {
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      navigate("/myposts");
      alert("Post updated successfully!");
    }
  };

  useEffect(() => {
    const savedMarkdown = localStorage.getItem("markdownContent");
    const savedTitle = localStorage.getItem("postTitle");
    const savedTags = localStorage.getItem("tagsSelected");
    const image = localStorage.getItem("image");

    if (savedMarkdown) {
      setMarkdownContent(savedMarkdown);
    }
    if (savedTitle) {
      setPostTitle(savedTitle);
    }
    if (savedTags) {
      setTagsSelected(savedTags.split(","));
    }
    if (image) {
      setImage(image);
    }
  }, []);

  const convertMarkdownToHtml = () => {
    return { __html: marked(markdownContent) };
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles["header"]}>
          <h5>Edit Post</h5>
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
              <div>
                {image === "null" || !image ? (
                  <label htmlFor="upload-input" className={styles["btn-img"]}>
                    Add a cover image
                  </label>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={image}
                      alt="cover"
                      style={{
                        width: "250px",
                        height: "105px",
                        margin: "0 20px",
                        objectFit: "contain",
                      }}
                    />
                    <div style={{ marginTop: "10px" }}>
                      <label
                        htmlFor="upload-input"
                        className={styles["btn-img"]}
                      >
                        Change
                      </label>
                      <button
                        onClick={handleRemoveImage}
                        className={styles["btn-img-remove"]}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
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
            <MarkdownEditor
              content={markdownContent}
              setContent={setMarkdownContent}
            />
            {/* <MarkdownToolbar
              toolbarItems={toolbarItems}
              content={markdownContent}
              setContent={setMarkdownContent}
            /> */}
          </div>
        ) : (
          <div className={styles.content}>
            {image !== "null" ? (
              <img src={image} alt="Cover" className={styles["img-markdown"]} />
            ) : (
              <div></div>
            )}
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

export default EditPost;
