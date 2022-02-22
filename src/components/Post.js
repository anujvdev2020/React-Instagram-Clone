import React from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
export const Post = ({ username, imageUrl, caption,postUrl }) => {
  return (
    <div className="post">
      <div className="post-header">
        <Avatar className="post-avatar" alt={username} src={imageUrl} />

        <h3>{username}</h3>
      </div>

      <img
        className="post-image"
        src={postUrl}
        alt=""
      />
      <h4 className="post-text">
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
};
