import React from "react";
import styles from "./MySavedPost.module.scss";
import { marked } from "marked";

const MySavedPost = ({ post }) => {
  const convertMarkdownToHtml = (markdownContent) => {
    return { __html: marked(markdownContent) };
  };

  return (
    <div className={styles["post-container"]}>
      <header className={styles["post-header"]}>
        <div className={styles["avatar"]}>
          <img src="https://via.placeholder.com/50" alt="User Avatar" />
          <span>Tuấn Hùng Bùi</span>
        </div>
        <div className={styles["post-actions"]}>
          <button className={styles["edit-btn"]}>Edit</button>
          <button className={styles["stats-btn"]}>Stats</button>
        </div>
      </header>

      <div className={styles["post-content"]}>
        <h1 className={styles["post-title"]}>{post.postTitle}</h1>
        <Hashtags tags={post.tagsSelected} />
        <div
          className={styles["markdown-content"]}
          dangerouslySetInnerHTML={convertMarkdownToHtml(post.markdownContent)}
        />
      </div>
    <hr/>
      <div className={styles["comments-section"]}>
        <div className={styles["comment-box"]}>
          <h3>Top comments (0)</h3>
          <button>Unsubscribe</button>
        </div>
        <div className={styles["comment-box"]}>
          <input type="text" placeholder="Add to the discussion" />
        </div>
        <div className={styles["footer"]}></div>
      </div>
    </div>
  );
};

// Component Hashtags
const Hashtags = ({ tags }) => {
  return (
    <div className={styles["hashtags"]}>
      {tags.map((tag, index) => (
        <span key={index} className={styles["hashtag"]}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export default MySavedPost;
