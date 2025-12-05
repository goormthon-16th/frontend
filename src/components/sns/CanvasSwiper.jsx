"use client";

import React, { useRef } from "react";
// Swiper 모듈 import 및 스타일 추가
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; // Pagination 모듈 import
import useCanvas from "@/hooks/useCanvas";
import { mockCanvasSlides } from "./mockCanvasData";
import { Flex, Button } from "@vapor-ui/core";
import "swiper/css";
import "swiper/css/pagination"; // Pagination 스타일 import
import { useRouter } from "next/navigation";

const DISPLAY_WIDTH = "340px";
const DISPLAY_HEIGHT = "428px";

// -------------------------------------------------------------
// 파일 저장 유틸리티 함수
// -------------------------------------------------------------
const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// -------------------------------------------------------------
// 개별 캔버스 슬라이드 컴포넌트
// -------------------------------------------------------------
const CanvasSlide = React.forwardRef(({ data, onCanvasReady }, ref) => {
  const { IMAGE_URL, FONT_FAMILY, TEXT, TEXT_ATTRIBUTE } = data;
  const textValues = TEXT.map((c) => c);

  // 훅을 호출하여 캔버스를 렌더링하고 참조를 받습니다.
  const { canvasRef, getCanvasBlob, getCanvasDataUrl } = useCanvas(
    IMAGE_URL,
    textValues,
    TEXT_ATTRIBUTE,
    FONT_FAMILY
  );

  // 캔버스 훅이 준비되면 getCanvasBlob 함수를 부모에게 전달합니다.
  React.useEffect(() => {
    if (onCanvasReady) {
      onCanvasReady(getCanvasBlob);
    }
  }, [getCanvasBlob, onCanvasReady]);

  return (
    <div style={{ padding: "0 10px", textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        // 캔버스 스타일: 고해상도 출력을 작은 크기로 표시
        style={{
          width: DISPLAY_WIDTH,
          height: DISPLAY_HEIGHT,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
  );
});
CanvasSlide.displayName = "CanvasSlide"; // linting 경고 방지

// -------------------------------------------------------------
// 메인 캐러셀 컴포넌트
// -------------------------------------------------------------
const CanvasSwiper = () => {
  // getCanvasBlob 함수들을 저장할 배열을 관리하는 ref
  const blobCreatorsRef = useRef([]);
  const router = useRouter();

  // 각 슬라이드가 준비될 때 getCanvasBlob 함수를 저장하는 핸들러
  const handleCanvasReady = (id) => (getCanvasBlob) => {
    // 이미 ID가 존재하는 경우 업데이트하고, 없는 경우 추가합니다.
    const existingIndex = blobCreatorsRef.current.findIndex((item) => item.id === id);
    if (existingIndex > -1) {
      blobCreatorsRef.current[existingIndex].getBlob = getCanvasBlob;
    } else {
      blobCreatorsRef.current.push({ id, getBlob: getCanvasBlob });
    }
    // ID 순서대로 정렬 (선택 사항이지만 좋은 습관입니다)
    blobCreatorsRef.current.sort((a, b) => a.id - b.id);
  };

  // 모든 캔버스 이미지를 저장하는 함수
  const handleSaveAll = async () => {
    if (blobCreatorsRef.current.length === 0) {
      alert("렌더링된 캔버스가 없습니다.");
      return;
    }

    // 모든 getBlob 함수를 순회하며 비동기적으로 Blob을 생성합니다.
    const savePromises = blobCreatorsRef.current.map(async (item, index) => {
      // getCanvasBlob은 Promise를 반환해야 합니다. (Blob 생성은 비동기 작업)
      const blob = await item.getBlob("image/png", 1.0);
      const filename = `canvas_slide_${index + 1}.png`;
      downloadBlob(blob, filename);
    });

    try {
      await Promise.all(savePromises);
      alert(`${blobCreatorsRef.current.length}개의 이미지가 성공적으로 저장되었습니다.`);
    } catch (error) {
      console.error("이미지 저장 중 오류 발생:", error);
      alert("이미지 저장 중 오류가 발생했습니다. 콘솔을 확인하세요.");
    }
  };

  return (
    <div style={{ width: "100%", padding: "20px 0" }}>
      <Swiper
        className="custom-swiper-pagination"
        modules={[Pagination]} // Pagination 모듈 사용
        pagination={{ clickable: true }} // 페이지네이션 활성화 및 클릭 가능 설정
        spaceBetween={20}
        slidesPerView={"auto"}
        centeredSlides={true}
        grabCursor={true}
        style={{ padding: "0 10px", height: "480px" }}
      >
        {mockCanvasSlides.map((data) => (
          <SwiperSlide key={data.id} style={{ width: DISPLAY_WIDTH, height: "auto" }}>
            <CanvasSlide data={data} onCanvasReady={handleCanvasReady(data.id)} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Flex
        style={{
          gap: "12px",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px",
          backgroundColor: "white",
          zIndex: 10,
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => {
            router.push(`/`);
          }}
          width="50%"
          stretch="true"
          size="xl"
          colorPalette="secondary"
          flex={1}
        >
          홈으로
        </Button>
        <Button onClick={handleSaveAll} color="white" width="50%" stretch="true" size="xl" flex={1}>
          다운받기
        </Button>
      </Flex>
    </div>
  );
};

export default CanvasSwiper;
