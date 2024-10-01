import React from "react";
import styles from "./PostTrending.module.scss";

const PostTrending = ({ post, author, TAG }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["post-img"]}>
        {post.img && (
          <img
            style={{
              borderRadius: "16px 16px 0 0",
              width: "100%",
              cursor: "pointer",
            }}
            src={post.img}
            alt="post img"
            height={140}
          ></img>
        )}
      </div>
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
        <div className={styles["post-tags"]}>
          {post.tags.slice(0, 1).map((tag) => {
            return (
              <div key={tag} className={styles["post-tag-item"]}>
                {TAG[tag].label}
              </div>
            );
          })}

          {post.tags.slice(0, 1).map((tag) => {
            const remainingTagsCount = post.tags.length - 1;
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

        <div className={styles["author-profile"]}>
          <img
            style={{ borderRadius: "50%" }}
            src={author.avt}
            alt="avt"
            width={32}
            height={32}
          ></img>
          <div className={styles["channels-info"]}>
            <p
              style={{
                fontSize: "13px",
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
      </div>
    </div>
  );
};

export default PostTrending;
