import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySavedPost from "../MySavedPost";
import styles from './MyPostsPage.module.scss'

const MyPostsPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    setSavedPosts(posts);
  }, []);

  return (
    <div className={styles.container}>
      <div style={{display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>
        <h1>This is My Posts Page</h1>
        <Link to={`./create`}>
          <button type="btn" className="btn btn-outline-dark">
            Create new post
          </button>
        </Link>
      </div>

      {savedPosts.length > 0 ? (
        savedPosts.map((post) => (
          <div key={post.id}>
            <MySavedPost post={post} />
          </div>
        ))
      ) : (
        <p >No saved posts.</p>
      )}
    </div>
  );
};

export default MyPostsPage;
