import React from "react";
import styles from "./RecommendChannels.module.scss";
import ConvertNumberComponent from "./../ConvertNumberComponent/index";
import { TAG } from "../../constants/constant";

const RecommendChannels = ({ channel }) => {
  return (
    <div className={styles["wrapper"]}>
      <img
        src={channel.avt}
        alt="channelimg"
        width={120}
        height={163}
        style={{ borderRadius: "25px", marginLeft: "10px" }}
      ></img>
      <div className={styles["channel-info"]}>
        <div className={styles["channel-item"]}>
          <p className={styles["channel-name"]}>{channel.name}</p>
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
          <p style={{ fontSize: "13px", fontWeight: "600" }}>
            <ConvertNumberComponent num={channel.followers} /> followers
          </p>
          <p style={{ fontSize: "13px", fontWeight: "600" }}>
            <ConvertNumberComponent num={channel.videos} /> videos
          </p>
        </div>
        <div className={styles["post-tags"]}>
          {channel.tags.slice(0, 3).map((tag) => {
            return (
              <div key={tag} className={styles["post-tag-item"]}>
                {TAG[tag].label}
              </div>
            );
          })}

          {channel.tags.slice(0, 1).map((tag) => {
            const remainingTagsCount = channel.tags.length - 3;
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
        <button type="button" className={styles["btn-follow"]}>
          Follow
        </button>
      </div>
    </div>
  );
};

export default RecommendChannels;
