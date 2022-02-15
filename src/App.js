import "./styles.css";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { Post } from "./components/Post";
import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
export default function App() {
  const [posts, setPosts] = useState([
    {
      username: "_gold_smith",
      caption: "Hello Welcome To React",
      imageUrl:
        "https://yt3.ggpht.com/ytc/AKedOLRbdv3Di8paQyrgMF_VwFXPkhwVzcW59Vgo8dTsyw=s48-c-k-c0x00ffffff-no-rj"
    },
    {
      username: "BBBBB",
      caption: "Hello Welcome",
      imageUrl: "https://mui.com/static/images/avatar/1.jpg"
    }
  ]);
  useEffect(() => {
    onSnapshot(doc(db, "posts", "SF"), (doc) => {
      console.log("Current data: ", doc.data());
    });
  }, [posts]);
  return (
    <div className="App">
      <div className="app-header">
        <img
          className="app-headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      {posts.length
        ? posts.map((post) => (
            <Post
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))
        : ""}
    </div>
  );
}
