"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// 기본 스타일 (필수)
import "swiper/css";
import { Badge, HStack, Text } from "@vapor-ui/core";

const cardData = [
  {
    id: 1,
    title: "김씨네 칵테일바",
    tags: ["감성", "이주민", "귤 칵테일"],
    imgUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "제주 로컬 카페",
    tags: ["로컬", "디저트", "바다뷰"],
    imgUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "골목 포차",
    tags: ["야간", "분위기", "소규모"],
    imgUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80",
  },
];

const styles = {
  wrapper: {
    width: "100%",
    boxSizing: "border-box",
  },
  swiper: {
    padding: "0 24px", // 양 옆 여백
    overflow: "visible",
  },
  slide: {
    width: "340px", // 카드 한 장 너비 (slidesPerView: "auto"라서 직접 지정)
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "-4px 4px 15px 0 rgba(0, 0, 0, 0.15)",
    boxSizing: "border-box",
    padding: "20px",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#333333",
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  imageWrapper: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    overflow: "hidden",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
};

export default function SpotSwiper() {
  return (
    <div style={styles.wrapper}>
      <Swiper
        style={styles.swiper}
        spaceBetween={10}
        slidesPerView={1}
        grabCursor={true} // 마우스 커서 손 모양
      >
        {cardData.map((card) => (
          <SwiperSlide key={card.id} style={styles.slide}>
            <div style={styles.card}>
              {/* 왼쪽: 타이틀 + 태그 */}
              <div style={styles.left}>
                <Text typography="heading6" fontWeight="semibold">
                  {card.title}
                </Text>
                <HStack gap="6px">
                  {card.tags.map((tag) => (
                    <Badge shape="pill" key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </HStack>
              </div>

              {/* 오른쪽: 이미지 */}
              <div style={styles.imageWrapper}>
                <img src={card.imgUrl} alt={card.title} style={styles.image} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
