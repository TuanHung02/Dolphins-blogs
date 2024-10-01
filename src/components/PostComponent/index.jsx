import React, { useState } from "react";
import styles from "./PostComponent.module.scss";
import { TAG } from "../../constants/constant";

const PostComponent = ({ post, author }) => {
  const [bookMarkPost, setBookMarkPost] = useState(false);

  const toggleBookMark = () => {
    setBookMarkPost((prevState) => !prevState);
  };

  return (
    <div key={post.id} className={styles.post}>
      <div className={styles["author-profile"]}>
        <img
          style={{ borderRadius: "50%" }}
          src={author.avt}
          alt="avt"
          width={48}
          height={48}
        ></img>
        <div className={styles["channels-info"]}>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {author.name}
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(128, 129, 145, 1)",
            }}
          >
            {post.timeAgo} minues ago
          </p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles["post-content"]}>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            {post.title}
          </p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "rgba(128, 129, 145, 1)",
              paddingTop: "10px",
              cursor: "pointer",
            }}
          >
            {post.description}
          </p>
          <div className={styles["post-tags"]}>
            {post.tags.slice(0, 3).map((tag) => {
              return (
                <div key={tag} className={styles["post-tag-item"]}>
                  {TAG[tag].label}
                </div>
              );
            })}

            {post.tags.slice(0, 1).map((tag) => {
              const remainingTagsCount = post.tags.length - 3;
              return remainingTagsCount > 0 ? (
                <div key={`${tag}+`} className={styles["post-tag-item"]}>
                  <div
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="VueJS NextJS"
                    key={tag}
                  >
                    +{remainingTagsCount}{" "}
                  </div>
                </div>
              ) : (
                <div key={`${tag}+`}></div>
              );
            })}
          </div>
        </div>
        <div className={styles["post-img"]}>
          {post.img && (
            <img
              style={{
                borderRadius: "16px",
                margin: " 0 24px 0 42px",
                cursor: "pointer",
              }}
              src={post.img}
              alt="post img"
              width={255}
              height={140}
            ></img>
          )}
        </div>
      </div>

      <div className={styles["post-reactions"]}>
        <div className={styles["post-reaction-item"]}>
          <i className="fa-regular fa-eye"></i>
          <p>{post.view}</p>
        </div>
        <div className={styles["post-reaction-item"]}>
          <i className="fa-solid fa-star"></i> <p>{post.star}</p>
        </div>
        <div className={styles["post-reaction-item"]}>
          <i className="fa-solid fa-comment"></i> <p>{post.comment}</p>
        </div>
      </div>

      <div className={styles["btn-archive"]}>
        {bookMarkPost ? (
          <i
            style={{ color: "rgba(251, 204, 19, 1)" }}
            onClick={toggleBookMark}
            className="fa-solid fa-bookmark"
          ></i>
        ) : (
          <i
            style={{ color: "rgba(128, 129, 145, 1)" }}
            onClick={toggleBookMark}
            className="fa-regular fa-bookmark"
          ></i>
        )}
      </div>
    </div>
  );
};

export default PostComponent;
