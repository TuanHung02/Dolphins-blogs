import React from "react";
import { Link } from "react-router-dom";
import MySavedPost from "../MySavedPost";

const MyPostsPage = () => {

  
  return (
    <div style={{ height: "818px", marginTop: "10px" }}>
      <h1>This is My Posts Page</h1>
      <MySavedPost/>
      <Link to={`./create`}>
        <button type="btn" className="btn btn-outline-dark">
          {" "}
          Create new post
        </button>
      </Link>
    </div>
  );
};

export default MyPostsPage;
