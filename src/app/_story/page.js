"use client";

import useCanvas from "@/hooks/useCanvas";

const y_position = 1000;

const TEXT_ATTRIBUTE = [
  // [_, _, _, _, fontSize, fontColor, x, y, maxWidth, textAlign, fontWeight, lineHeightFactor]
  [0, 0, 0, 0, 80, "#FFFFFF", 300, y_position - 150, 4800, "left", "bold", 1.2],
  [0, 0, 0, 0, 32, "#FFFFFF", 300, y_position, 4800, "left", "normal", 1.5],
];

const MOCK_DATA = {
  IMAGE_URL: "https://cdn.pixabay.com/photo/2025/09/12/16/49/dog-9830833_1280.jpg",
  FONT_FAMILY: "Arial, sans-serif",
  TEXT: [
    "제주가 좋아서 게스트 하우스를 차렸다.",
    "“지친 맘을 치유하러 제주에 왔는데 게스트 하우스에 1주일을 살면서 제주를 힐링이 되었어요 지친 맘을 치유하러 되었어요.”",
  ],
};
// -------------------------------------------------------------

function CanvasCreator() {
  // 1. 필요한 데이터를 목 데이터에서 추출
  const IMAGE_URL = MOCK_DATA.IMAGE_URL;
  const FONT_FAMILY = MOCK_DATA.FONT_FAMILY;

  // 텍스트 값 배열: 훅에 전달할 텍스트 내용만 추출
  const textValues = MOCK_DATA.TEXT.map((c) => c);

  // 텍스트 속성 배열: 훅에 전달할 12개 인자의 배열 구조만 추출

  // 2. 훅을 호출하고 필요한 결과물 (캔버스 참조, 데이터 함수)을 받습니다.
  const { canvasRef, getCanvasBlob } = useCanvas(
    IMAGE_URL,
    textValues,
    TEXT_ATTRIBUTE,
    FONT_FAMILY
  );

  // 3. 'Blob'을 다운로드하는 핸들러 함수 (변경 없음)
  const handleDownload = async () => {
    try {
      const blob = await getCanvasBlob();

      // Blob을 파일로 다운로드합니다.
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "combined_image.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("다운로드 실패:", error);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: "80%",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />

      <button
        onClick={handleDownload}
        style={{ display: "block", margin: "20px auto", padding: "10px 20px" }}
      >
        ⬇️ 최종 이미지 다운로드
      </button>
    </div>
  );
}

export default CanvasCreator;
