import styles from "./TrendingSlider.module.scss";
// const TrendingSlider = ({ channels }) => {
// const [currentIndex, setCurrentIndex] = useState(0);
// const itemsPerSlide = 5;

// const nextSlide = () => {
//   setCurrentIndex((prevIndex) => (prevIndex + 1) % channels.length);
// };

// const prevSlide = () => {
//   setCurrentIndex(
//     (prevIndex) => (prevIndex - 1 + channels.length) % channels.length
//   );
// };

// const currentItems = channels.slice(
//   currentIndex,
//   currentIndex + itemsPerSlide
// );

// if (currentItems.length < itemsPerSlide) {
//   currentItems.push(
//     ...channels.slice(0, itemsPerSlide - currentItems.length)
//   );
// }

//   return (
//     <div className={styles["channels-slider"]}>
//       <div className={styles["handle-slider"]}>
//         <p
//           style={{
//             fontSize: "18px",
//             fontWeight: "600",
//             lineHeight: "24px",
//           }}
//         >
//           Trending Channels
//         </p>
//         <div style={{ display: "flex", gap: "10px" }}>
//           <div className={styles["handle-click-slide"]} onClick={prevSlide}>
//             <i
//               className="fa-solid fa-angle-left"
//               style={{ fontSize: "12px", fontWeight: "600" }}
//             ></i>
//           </div>
//           <div className={styles["handle-click-slide"]} onClick={nextSlide}>
//             <i
//               className="fa-solid fa-angle-right"
//               style={{ fontSize: "12px", fontWeight: "600" }}
//             ></i>
//           </div>
//         </div>
//       </div>
//       <div
//         className={styles["show-slider"]}
//       >
//         {currentItems.map((channel) => (
//           <div className={styles["channels-profile"]} key={channel.id}>
//             <img
//               style={{ borderRadius: "50%" }}
//               src={channel.avatar}
//               alt="avt"
//               width={56}
//               height={56}
//             ></img>
//             <div className={styles["channels-info"]}>
//               <p
//                 style={{
//                   fontSize: "13px",
//                   fontWeight: "600",
//                   lineHeight: "15px",
//                 }}
//               >
//                 {channel.name}
//               </p>
//               <p
//                 style={{
//                   fontSize: "12px",
//                   color: "rgba(128, 129, 145, 1)",
//                   paddingBottom: "3px",
//                 }}
//               >
//                 {channel.status}
//               </p>
//               <div className="d-flex gap-2 align-items-center">
//                 <div className="custom-dot">•</div>
//                 <p
//                   style={{
//                     fontSize: "12px",
//                     color: "rgba(128, 129, 145, 1)",
//                   }}
//                 >
//                   {channel.viewers} viewers
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrendingSlider;

import React from "react";
import Slider from "react-slick";
import { channels } from "../../constants/constant";

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
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const itemsPerSlide = 5;

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % channels.length);
  // };

  // const prevSlide = () => {
  //   setCurrentIndex(
  //     (prevIndex) => (prevIndex - 1 + channels.length) % channels.length
  //   );
  // };

  // const currentItems = channels;

  // if (currentItems.length < itemsPerSlide) {
  //   currentItems.push(
  //     ...channels.slice(0, itemsPerSlide - currentItems.length)
  //   );
  // }
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrow: true,
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
                  {channel.viewers} viewers
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
