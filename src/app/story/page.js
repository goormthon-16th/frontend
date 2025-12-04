"use client";

import React, { useState } from "react";
import useCanvas from "@/hooks/useCanvas";

// 테스트를 위한 더미 데이터 설정
const IMAGE_URL = "https://picsum.photos/3277/4096"; // 큰 테스트 이미지
const TEXT_ATTRIBUTES = [
  // [_, _, _, _, fontSize(40), fontColor('#FFFFFF'), x(1638), y(500)]
  [0, 0, 0, 0, 40, "#FFFFFF", 1638, 500],
];
const FONT_FAMILY = "Arial, sans-serif";

function CanvasCreator() {
  const [title, setTitle] = useState("땡귤베리마치");

  // 1. 필요한 데이터를 준비합니다.
  const textValues = [title];

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
      <div>
        <label>내용: </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleDownload}>이미지 다운로드</button>
      </div>

      <canvas
        ref={canvasRef}
        style={{
          maxWidth: "500px",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
  );
}

export default CanvasCreator;
