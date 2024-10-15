import React from "react";
import styles from "./MySavedPost.module.scss";
import { marked } from "marked";
import { useNavigate } from "react-router-dom";

const MySavedPost = ({ post }) => {
  // const [posts, setPosts] = useState([]);

  // // Lấy dữ liệu từ localStorage khi component mount
  // useEffect(() => {
  //   const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  //   setPosts(savedPosts);
  // }, []);

  const convertMarkdownToHtml = (markdownContent) => {
    return { __html: marked(markdownContent) };
  };

  const navigate = useNavigate();

  const handleEditPost = (id) => {
    navigate(`/myposts/edit/${id}`);
  };

  // const handleDeletePost = (id) => {
  //   const isConfirmed = window.confirm(
  //     "Bạn có chắc chắn muốn xóa bài post này không?"
  //   );

  //   if (isConfirmed) {
  //     const updatedPosts = posts.filter((post) => post.id !== id);
  //     localStorage.setItem("posts", JSON.stringify(updatedPosts));
  //     setPosts(updatedPosts); // Cập nhật lại state để rerender component
  //   }
  // };

  // const date = new Date(post.date);
  return (
    <div className={styles["post-container"]}>
      {post.image !== "null" && post.image !== null ? (
        <img src={post.image} alt="Cover" className={styles["img-markdown"]} />
      ) : (
        <div></div>
      )}
    

      <header className={styles["post-header"]}>
        <div className={styles["avatar"]}>
          <img src="https://via.placeholder.com/50" alt="User Avatar" />
          <div>
            <p style={{ fontWeight: "bold" }}>Tuấn Hùng Bùi - {post.id}</p>
            <p>...</p>
            {/* <p>{`${date.getHours()}:${date.getMinutes()} - ${date.getUTCDate()}/${
              date.getUTCMonth() + 1
            }/${date.getUTCFullYear()}`}</p> */}
          </div>
        </div>
        <div className={styles["post-actions"]}>
          <button
            type="btn"
            className="btn"
            onClick={() => handleEditPost(post.id)}
          >
            Edit
          </button>
          {/* <button
            type="btn"
            className="btn"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => handleDeletePost(post.id)}
          >
            Delete
          </button> */}
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
      <hr />
      <div className={styles["comments-section"]}>
        <div className={styles["comment-box"]}>
          <h4 style={{ fontWeight: "bold" }}>Top comments (0)</h4>
          {/* <button>Unsubscribe</button> */}
        </div>
        <div className={styles["comment-box"]}>
          <input type="text" placeholder="Add to the discussion" />
        </div>
        <div className={styles["footer"]}></div>
      </div>
    </div>
  );
};

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
