import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MySavedPost from "../MySavedPost";

const MyPostsPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    setSavedPosts(posts);
  }, []);

  return (
    <div style={{ height: "100%", marginTop: "10px" }}>
      <div style={{display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>
        <h1>This is My Posts Page</h1>
        <Link to={`./create`}>
          <button type="btn" className="btn btn-outline-dark">
            Create new post
          </button>
        </Link>
      </div>

      {savedPosts.length > 0 ? (
        savedPosts.map((post, index) => (
          <div key={index}>
            <MySavedPost post={post} />
          </div>
        ))
      ) : (
        <p style={{height: 'calc(100vh - 156px)'}} >No saved posts.</p>
      )}
    </div>
  );
};

export default MyPostsPage;
