import React from "react";
import styles from "./HomePage.module.scss";
import { channels, posts, authors, TAG, tags } from "../../constants/constant";
import PostComponent from "../../components/PostComponent";
import TagTrending from "../../components/TagTrending";
import PostTrending from "../../components/PostTrending";
import SelectDropDown from "../../components/SelectDropDown";
import TrendingSlider from "../../components/TrendingSlider";
import RecommendChannels from "../../components/RecommendChannels";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <TrendingSlider channels={channels} />

      <div className={styles["wrapper-posts"]}>
        <div className={styles["list-posts"]}>
          {posts.map((post) => {
            const author = authors.find((au) => au.id === post.authorId);
            return (
              <div key={post.id}>
                <PostComponent post={post} author={author} TAG={TAG} />
              </div>
            );
          })}
          <p
            style={{
              padding: "30px 0px 15px 0px",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            Trending Tags
          </p>
          <div className={styles["list-tags"]}>
            {tags.map((tag) => {
              return (
                <div key={tag.id}>
                  <TagTrending tag={tag} />
                </div>
              );
            })}
          </div>
          <p
            style={{
              padding: "30px 0px 15px 0px",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            Recommend for you
          </p>
          <div className={styles["list-tags"]}>
            {channels.slice(0,3).map((channel) => {
              return (
                <div key={channel.id}>
                  <RecommendChannels channel={channel}/>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles["trending-posts"]}>
          <div>
            <SelectDropDown />{" "}
          </div>
          <p
            style={{
              padding: "15px 0px 12px 0px",
              fontSize: "18px",
              lineHeight: "24px",
              fontWeight: "600",
            }}
          >
            Top Trending Now
          </p>

          <div className={styles["trending-posts-list"]}>
            {posts.map((post) => {
              const author = authors.find((au) => au.id === post.authorId);
              return (
                <div key={post.id}>
                  <PostTrending post={post} author={author} TAG={TAG} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
