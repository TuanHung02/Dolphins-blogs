import React, { useState } from "react";
import styles from "./TagTrending.module.scss";
import { TAG } from "../../constants/constant";
import ConvertNumberComponent from "../ConvertNumberComponent";

const TagTrending = ({ tag }) => {
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = () => {
    setIsCheck((prevState) => !prevState);
  };
  return (
    <div className={styles.tag}>
      <div className={styles["tag-info"]}>
        <img
          style={{ borderRadius: "16px" }}
          height={64}
          width={64}
          src={tag.img}
          alt=""
        />
        <div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "20px",
            }}
          >
            {TAG[tag.label].label}
          </p>
          <div className="d-flex gap-2 align-items-center">
            <div className="custom-dot">•</div>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(128, 129, 145, 1)",
                padding: "5px 0 ",
                fontWeight: "600",
              }}
            >
            <ConvertNumberComponent num={tag.articles}/> Articles this week
            </p>
          </div>
        </div>
      </div>
      <div>
        {isCheck === true ? (
          <i
            style={{
              fontSize: "24px",
              color: "rgba(127, 186, 122, 1)",
              cursor: "pointer",
            }}
            onClick={handleCheck}
            className="fa-solid fa-circle-check"
          ></i>
        ) : (
          <i
            style={{
              fontSize: "24px",
              color: "rgba(108, 93, 211, 1)",
              cursor: "pointer",
            }}
            onClick={handleCheck}
            className="fa-solid fa-circle-plus"
          ></i>
        )}
      </div>
    </div>
  );
};

export default TagTrending;
