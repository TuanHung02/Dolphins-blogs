import styles from "./TrendingSlider.module.scss";
import React from "react";
import Slider from "react-slick";
import { channels } from "../../constants/constant";
import ConvertNumberComponent from "../ConvertNumberComponent";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={styles["handle-click-slide"]}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        boxShadow: "5px 10px 18px #f1f1f1",
        width: "32px",
        height: "32px",
        position: "absolute",
        left: " calc(100% - 35px)",
        bottom: "100px",
      }}
      onClick={onClick}
    >
      <i
        className="fa-solid fa-angle-right"
        style={{ fontSize: "12px", fontWeight: "600" }}
      ></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={styles["handle-click-slide"]}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        boxShadow: "5px 10px 18px #f1f1f1",
        width: "32px",
        height: "32px",
        position: "absolute",
        left: "calc(100% - 70px)",
        top: "-76px",
      }}
      onClick={onClick}
    >
      <i
        className="fa-solid fa-angle-left"
        style={{ fontSize: "12px", fontWeight: "600" }}
      ></i>
    </div>
  );
}

export default function SimpleSlider() {
  let settings = {
    dots: false,
    infinite: true, // lặp vô hạn
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrow: true,
    swipeToSlide: true, // di chuyển trực tiếp tới slide được kéo
    focusOnSelect: true, //  chọn item bằng cách click
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={styles["channels-slider"]}>
      <div className={styles["handle-slider"]}>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "600",
            lineHeight: "24px",
          }}
        >
          Trending Channels
        </p>
      </div>
      <Slider className={styles["show-slider"]} {...settings}>
        {channels.map((channel) => (
          <div className={styles["channels-profile"]} key={channel.id}>
            <img
              style={{ borderRadius: "50%" }}
              src={channel.avt}
              alt="avt"
              width={56}
              height={56}
            ></img>
            <div className={styles["channels-info"]}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  lineHeight: "15px",
                }}
              >
                {channel.name}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(128, 129, 145, 1)",
                  paddingBottom: "3px",
                }}
              >
                {channel.status}
              </p>
              <div className="d-flex gap-2 align-items-center">
                <div className="custom-dot">•</div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(128, 129, 145, 1)",
                  }}
                >
                  <ConvertNumberComponent num={channel.viewers} /> viewers
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
