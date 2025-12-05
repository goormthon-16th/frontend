"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Text } from "@vapor-ui/core";

const slides = [
  {
    id: 1,
    title: "홍보 고민되시나요?",
    subtitle: `"사장님만의 이야기"를\n제가 따뜻하게 녹여드릴게요`,
    img: "https://images.unsplash.com/photo-1518562593247-cc26c241becd?q=80&w=1066&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "걱정마세요!",
    subtitle: `"사장님의 이야기를\n제가 대신 홍보해드릴게요`,
    img: "https://images.unsplash.com/photo-1683669639055-83621f1bc1ff?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "질문 3개로 손쉽게.",
    subtitle: `"사장님 가게의 진짜 매력"을\n제가 대신 알려드릴게요`,
    img: "https://images.unsplash.com/photo-1688545134131-060868a3c306?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const styles = {
  root: {
    width: "100%",
    maxWidth: "480px", // 모바일 카드 느낌
    margin: "0 auto",
    height: "463px", // 화면 꽉 채우기 (원하면 520px 등으로 조정)
    backgroundColor: "#e5e5e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  swiper: {
    width: "100%",
    height: "100%",
  },
  slide: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0) 100%)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "32px 24px",
    boxSizing: "border-box",
  },
  topRightLogo: {
    alignSelf: "flex-end",
    fontSize: "16px",
    lineHeight: 1.4,
    textAlign: "right",
    whiteSpace: "pre-line",
    fontFamily: "KCC Sonkeechung",
    fontSize: "20px",
    fontWeight: "600",
    color: "white",
  },
  title: {
    fontSize: "30px",
    fontWeight: 700,
    marginBottom: "12px",
  },
  subtitle: {
    fontSize: "16px",
    lineHeight: 1.6,
    whiteSpace: "pre-line",

    fontFamily: "KCC Sonkeechung",
    fontSize: "24px",
    fontWeight: "400",
    color: "white",
    marginTop: "14px",
  },
  bottomArea: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    height: "32px",
  },
  progressTrack: {
    flex: 1,
    height: "2px",
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressBar: (ratio) => ({
    width: `${ratio * 100}%`,
    height: "100%",
    backgroundColor: "#ffffff",
    transition: "width 0.3s ease",
  }),
  pageTextWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
  },
};

export default function MainSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = slides.length;
  const progressRatio = (activeIndex + 1) / total; // 0~1

  return (
    <div style={styles.root}>
      <Swiper
        modules={[Navigation]}
        style={styles.swiper}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id} style={styles.slide}>
            <img src={s.img} alt={s.title} style={styles.bgImage} />

            <div style={styles.overlay}>
              <div style={styles.topRightLogo}>{"탐나는\n사장님"}</div>

              <div style={{ marginTop: "170px" }}>
                <Text
                  style={{
                    fontFamily: "KCC Sonkeechung",
                    fontSize: "48px",
                    fontWeight: "600",
                    marginTop: "100px",
                    color: "white",
                  }}
                >
                  {s.title}
                </Text>

                <div style={styles.subtitle}>{s.subtitle}</div>
              </div>

              <div style={styles.bottomArea}>
                {/* progress bar */}
                <div style={styles.progressTrack}>
                  <div style={styles.progressBar(progressRatio)} />
                </div>

                {/* 페이지 번호 */}
                <div style={styles.pageTextWrap}>
                  <span />
                  <span>
                    {String(activeIndex + 1).padStart(2, "0")}/
                    {String(total).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
