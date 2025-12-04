"use client";

import { useEffect, useRef } from "react";

// 텍스트 속성 배열의 구조를 정의 (원본 코드 기반)
// [x, y, width, height, fontSize, fontColor, textAlign, fontFamily]

// 일반화된 Canvas Hook
const useCanvas = (imageUrl, textValues, textAttributes, fontFamily) => {
  const canvasRef = useRef(null);
  // const resetUserInfo = useResetRecoilState(UserInfo); // 제거

  useEffect(() => {
    if (!imageUrl || textAttributes.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawCanvas = () => {
      // 캔버스 크기는 고정 (원본 코드 유지)
      canvas.width = 3277;
      canvas.height = 4096;

      const img = new Image();
      img.crossOrigin = "Anonymous"; // CORS 문제 방지를 위해 추가
      img.src = imageUrl;

      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        textAttributes.forEach((textAttr, index) => {
          // 원본 코드의 구조 분해를 인자 배열 구조에 맞게 일반화
          // [0:_, 1:_, 2:_, 3:_, 4:fontSize, 5:fontColor, 6:x, 7:y]
          // Note: 원본 배열 구조와 인덱스가 다를 경우 이 부분을 수정해야 합니다.
          const [, , , , fontSize, fontColor, x, y] = textAttr;

          // 폰트와 스타일을 외부 인자로 받은 값과 텍스트 속성을 사용하여 설정
          ctx.font = `${fontSize * 10}px ${fontFamily}`;
          ctx.textAlign = "center";
          ctx.fillStyle = fontColor;

          const text = textValues[index] || "";
          const lines = text.split("\n");
          const lineHeight = fontSize * 12;

          lines.forEach((line, i) => {
            // x, y는 textAttr에서 가져옵니다.
            ctx.fillText(line, x, y + i * lineHeight);
          });
        });
      };

      img.onerror = (err) => {
        console.error("이미지 로드 실패:", imageUrl, err);
      };
    };

    drawCanvas();
  }, [imageUrl, textValues, textAttributes, fontFamily]); // 의존성 배열 업데이트

  // -------------------------------------------------------------------
  // 서버 통신 부분 일반화:
  // 로컬 `privateAxios`나 `resetUserInfo`를 사용할 수 없으므로,
  // 캔버스 이미지를 반환하는 로직만 남기거나, 외부 함수를 인자로 받도록 수정합니다.
  // 여기서는 순수하게 캔버스 데이터를 다루는 함수만 유지하고 통신 로직은 제거합니다.

  /**
   * 캔버스 이미지를 PNG 형식의 Blob으로 변환하여 반환합니다.
   * 이 Blob을 사용하여 외부에서 서버로 업로드를 처리할 수 있습니다.
   */
  const getCanvasBlob = () => {
    const canvas = canvasRef.current;
    if (!canvas) return Promise.reject(new Error("Canvas 참조가 없습니다."));

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Blob 생성 실패"));
        }
      }, "image/png");
    });
  };

  /**
   * 캔버스 이미지를 base64 Data URL 문자열로 반환합니다.
   */
  const getCanvasDataUrl = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    return canvas.toDataURL("image/png");
  };

  // 원본 코드의 `uploadImage` 함수는 로컬 파일 업로드 통신 로직이므로 제거합니다.

  return { canvasRef, getCanvasBlob, getCanvasDataUrl };
};

export default useCanvas;
