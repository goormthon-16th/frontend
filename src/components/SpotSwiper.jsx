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
      "https://menu.moneys.co.kr/moneyweek/thumb/2014/05/20/06/2014052017098044203_1.jpg/dims/optimize/",
  },
  {
    id: 2,
    title: "제주 로컬 카페",
    tags: ["로컬", "디저트", "바다뷰"],
    imgUrl:
      "https://mblogthumb-phinf.pstatic.net/MjAyNTAyMDZfMjkz/MDAxNzM4ODQ0NDUwNjgx.dEF-cc3oUN7cim-FeOtaahSI3p2sJ5Go6g3ePZ-v1Lkg.oJZF-oWoFrjyV7NMZbUGooPuePkpLJ3SY62T7C6OVOkg.JPEG/image.JPEG?type=w800",
  },
  {
    id: 3,
    title: "골목 포차",
    tags: ["야간", "분위기", "소규모"],
    imgUrl:
      "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/9f0fabab-7a06-45a0-96ff-62f80f2c7b3e.jpeg",
  },
];

const styles = {
  wrapper: {
    width: "100%",
    boxSizing: "border-box",
    padding: "20px 24px", // 🎨 그림자를 위한 상하 여백 + 좌우 여백
    overflow: "hidden", // 🚫 부모 밖으로 넘치는 것 방지
  },
  swiper: {
    overflow: "visible", // ✨ 그림자가 잘리지 않도록 visible 설정
    margin: "0 -24px", // 🔄 wrapper의 좌우 padding을 상쇄하여 슬라이드가 화면 끝까지 가도록
    padding: "0 24px", // 📏 실제 슬라이드 시작 위치 조정
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
