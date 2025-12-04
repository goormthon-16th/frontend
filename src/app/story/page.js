"use client";

import { useState } from "react";
import useCanvas from "@/hooks/useCanvas";

// 테스트를 위한 더미 데이터 설정
const IMAGE_URL = "https://cdn.pixabay.com/photo/2025/09/12/16/49/dog-9830833_1280.jpg";
const TEXT_ATTRIBUTES = [
  [0, 0, 0, 0, 80, "#FFFFFF", 300, 5055, 4800, "left", "bold", 1.0],
  [0, 0, 0, 0, 32, "#FFFFFF", 300, 5895, 4800, "left", "normal", 1.5],
];
// TODO: 폰트 수정 가능성 있음
const FONT_FAMILY = "Arial, sans-serif";

function CanvasCreator() {
  const [title, setTitle] = useState("제주가 좋아서 게스트 하우스를 차렸다.");
  const [subtitle, setSubtitle] = useState(
    "“지친 맘을 치유하러 제주에 왔는데 게스트 하우스에 1주일을 살면서 제주를 힐링이 되었어요 지친 맘을 치유하러 제주에 왔는데 게스트 하우스에 1주일을 살면서 제주를 힐링이 되었어요.”"
  );

  // 1. 필요한 데이터를 준비합니다.
  const textValues = [title, subtitle];

  // 2. 훅을 호출하고 필요한 결과물 (캔버스 참조, 데이터 함수)을 받습니다.
  const { canvasRef, getCanvasBlob, getCanvasDataUrl } = useCanvas(
    IMAGE_URL,
    textValues,
    TEXT_ATTRIBUTES,
    FONT_FAMILY
  );

  // 3. 'Blob'을 다운로드하는 핸들러 함수
  const handleDownload = async () => {
    try {
      const blob = await getCanvasBlob();

      // Blob을 파일로 다운로드합니다. (순수 JS 환경에서 파일 다운로드)
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "combined_image.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      alert("이미지 다운로드 성공!");
    } catch (error) {
      console.error("다운로드 실패:", error);
      alert("이미지 생성 또는 다운로드에 실패했습니다.");
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: "500px",
          height: "auto",
          display: "block",
          margin: "0 auto",
          border: "1px solid #ccc", // 캔버스 영역 확인용
        }}
      />

      <button onClick={handleDownload}>이미지 다운로드</button>
    </div>
  );
}

export default CanvasCreator;
