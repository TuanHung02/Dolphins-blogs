import React, { useState } from "react";
import styles from "./CreatePost.module.scss";
import MultipleSelect from "../../MutipleSelect";
import { tagItems } from "../../constants/constant";

const CreatePost = () => {
  const [markdownText, setMarkdownText] = useState("");
  const handleInputChange = (e) => {
    setMarkdownText(e.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles["header"]}>
          <h5>Create Post</h5>
          <div>
            <button type="btn" className="btn">
              Edit
            </button>
            <button type="btn" className="btn">
              Preview
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={`${styles["content-title"]} ${styles.wrapper}`}>
            <div className={styles["btn-img"]}>Add a cover image</div>

            <input
              className={styles["input-title"]}
              placeholder="New post title here..."
            ></input>

            <MultipleSelect items={tagItems} />
          </div>

          <div className={styles["toolbar-bg"]}>
            <div className={`${styles["toolbar"]}`}>
              <button type="btn" className="btn btn-outline-secondary">
                <i class="fa-solid fa-bold"></i>
              </button>
              <button type="btn" className="btn btn-outline-secondary">
                <i class="fa-solid fa-italic"></i>
              </button>
              <button type="btn" className="btn btn-outline-secondary">
                <i class="fa-solid fa-italic"></i>
              </button>
              <button type="btn" className="btn btn-outline-secondary">
                <i class="fa-solid fa-list-ol"></i>
              </button>
              <button type="btn" className="btn btn-outline-secondary">
                <i class="fa-solid fa-list-ul"></i>
              </button>
              <button type="btn" className="btn btn-outline-secondary">
                <i class="fa-solid fa-heading"></i>
              </button>
            </div>
          </div>

          <textarea
            className={styles["content-markdown"]}
            value={markdownText}
            onChange={handleInputChange}
            placeholder="Write your post content here..."
          />
        </div>
        <div className={styles["bottom"]}>
          <button
            style={{ backgroundColor: "rgb(59, 73, 223)", color: "white" }}
            type="btn"
            className="btn"
          >
            Save
          </button>
          <button type="btn" className="btn">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
