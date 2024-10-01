import React from "react";
import styles from "./RecommendChannels.module.scss";

const RecommendChannels = ({ channel }) => {
  return (
    <div className={styles["wrapper"]}>
      <img
        src={channel.avt}
        alt="channelimg"
        width={120}
        height={163}
        style={{ borderRadius: "25px" }}
      ></img>
      <div className={styles["channel-info"]}>
        <div className={styles["channel-item"]}>
          <p>{channel.name}</p>
          <div className={styles["post-reactions"]}>
            <div className={styles["post-reaction-item"]}>
              <i className="fa-regular fa-eye"></i>
              <p>{channel.views}</p>
            </div>
            <div className={styles["post-reaction-item"]}>
              <i className="fa-solid fa-star"></i> <p>{channel.stars}</p>
            </div>
          </div>
        </div>
        <div className={styles["channel-item"]}>
          <p> {channel.followers} followers</p>
          <p> {channel.videos} videos</p>
        </div>
        <div></div>
        <button type="button" className={styles['btn-follow']}>Follow</button>
      </div>
    </div>
  );
};

export default RecommendChannels;
