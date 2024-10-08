import React, { useEffect, useState } from "react";
import styles from "./CreatePost.module.scss";
import { tagItems } from "../../constants/constant";
import { toolbarItems } from "../../constants/constant";
import { marked } from "marked";
import MultipleSelect from "../MutipleSelect";
import MarkdownToolbar from "../Toolbar";

const CreatePost = () => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [tagsSelected, setTagsSelected] = useState([]);
  const [isEditStatus, setIsEditStatus] = useState(true);



  const handleInputTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const handleSelectTags = (tags) => {
    setTagsSelected(tags);
  };

  const toggleEdit = () => {
    setIsEditStatus(true);
  };

  const togglePreview = () => {
    setIsEditStatus(false);
  };
  useEffect(() => {
    const savedMarkdown = localStorage.getItem("markdownContent");
    if (savedMarkdown) {
      setMarkdownContent(savedMarkdown);
    }
  }, []);

  const handleSaveDraft = () => {
    localStorage.setItem("markdownContent", markdownContent);
    localStorage.setItem("postTitle", postTitle);
    localStorage.setItem("tagsSelected", tagsSelected);
    alert("Saved to localStorage!");
  };

  const handleSave = () => {
    alert("Can't Save because this function does not working");
  };

  const convertMarkdownToHtml = () => {
    return { __html: marked(markdownContent) };
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles["header"]}>
          <h5>Create Post</h5>
          <div>
            <button onClick={toggleEdit} type="btn" className="btn">
              Edit
            </button>
            <button onClick={togglePreview} type="btn" className="btn">
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

              <MultipleSelect tagsSelected={tagsSelected} items={tagItems} onChange={handleSelectTags} />
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
