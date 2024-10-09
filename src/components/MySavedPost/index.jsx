import React from "react";
import styles from "./MySavedPost.module.scss";

const MySavedPost = ({postInfo}) => {
  return (
    <div className={styles["post-container"]}>
      <header className={styles["post-header"]}>
        <Avatar />
        <PostActions />
      </header>

      <div className={styles["post-content"]}>
        <Title text="Title" />
        <Hashtags
          tags={["#webdev", "#javascript", "#beginners", "#programming"]}
        />
        <p>Content here</p>
      </div>

      <CommentsSection />
    </div>
  );
};

// Component Avatar
const Avatar = () => {
  return (
    <div className={styles["avatar"]}>
      <img src="https://via.placeholder.com/50" alt="User Avatar" />
      <span>Tuấn Hùng Bùi</span>
    </div>
  );
};

// Component Title
const Title = ({ text }) => {
  return <h1 className={styles["post-title"]}>{text}</h1>;
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

// Component PostActions (chứa các nút Edit, Stats)
const PostActions = () => {
  return (
    <div className={styles["post-actions"]}>
      <button className={styles["edit-btn"]}>Edit</button>
      <button className={styles["stats-btn"]}>Stats</button>
    </div>
  );
};

// Component CommentsSection (phần bình luận)
const CommentsSection = () => {
  return (
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
  );
};

export default MySavedPost;
