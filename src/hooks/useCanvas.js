"use client";

import { useEffect, useRef } from "react";

// 새로운 텍스트 속성 구조:
// [0:_, 1:_, 2:_, 3:_, 4:fontSize, 5:fontColor, 6:x, 7:y, 8:maxWidth, 9:textAlign, 10:fontWeight, 11:lineHeightFactor]
const useCanvas = (imageUrl, textValues, textAttributes, fontFamily) => {
  const canvasRef = useRef(null);

  // -------------------------------------------------------------
  // 텍스트를 주어진 최대 너비(maxWidth)에 맞춰 자동으로 줄 바꿈하고 렌더링하는 함수 (변경 없음)
  const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
    if (!text) return;

    const paragraphs = text.split("\n");
    let currentY = y;

    paragraphs.forEach((paragraph) => {
      const words = paragraph.split(" ");
      let line = "";

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line.trim(), x, currentY);
          line = words[n] + " ";
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), x, currentY);
      currentY += lineHeight;
    });
  };
  // -------------------------------------------------------------

  // -------------------------------------------------------------
  // 그라디언트 그리기 함수 (변경 없음)
  const drawGradientOverlay = (ctx, canvasWidth, canvasHeight) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0.0, "rgba(0, 0, 0, 0.05)");
    gradient.addColorStop(0.2, "rgba(0, 0, 0, 0.05)");
    gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.35)");
    gradient.addColorStop(0.9, "rgba(0, 0, 0, 0.85)");
    gradient.addColorStop(1.0, "rgba(0, 0, 0, 0.95)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };
  // -------------------------------------------------------------

  useEffect(() => {
    if (!imageUrl || textAttributes.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawCanvas = () => {
      // 캔버스 크기 설정 (고정)
      const canvasWidth = 5400;
      const canvasHeight = 6795;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;

      img.onload = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // 1. 이미지 중앙 크롭 로직 (변경 없음)
        const imgWidth = img.width;
        const imgHeight = img.height;
        const canvasRatio = canvasWidth / canvasHeight;
        const imageRatio = imgWidth / imgHeight;

        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = imgWidth;
        let sourceHeight = imgHeight;

        if (imageRatio > canvasRatio) {
          sourceHeight = imgHeight;
          sourceWidth = imgHeight * canvasRatio;
          sourceX = (imgWidth - sourceWidth) / 2;
        } else {
          sourceWidth = imgWidth;
          sourceHeight = imgWidth / canvasRatio;
          sourceY = (imgHeight - sourceHeight) / 2;
        }

        ctx.drawImage(
          img,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          canvasWidth,
          canvasHeight
        );

        // 2. 그라디언트 오버레이 추가 (변경 없음)
        drawGradientOverlay(ctx, canvasWidth, canvasHeight);

        // 3. 텍스트 렌더링
        textAttributes.forEach((textAttr, index) => {
          // [0:_, 1:_, 2:_, 3:_, 4:fontSize, 5:fontColor, 6:x, 7:y, 8:maxWidth, 9:textAlign, 10:fontWeight, 11:lineHeightFactor]
          // ✨ 11번째 인덱스에 lineHeightFactor 추가
          const [
            ,
            ,
            ,
            ,
            fontSize,
            fontColor,
            x,
            y,
            maxWidth,
            textAlign,
            fontWeight,
            lineHeightFactor,
          ] = textAttr;

          // 폰트 스타일 설정
          const actualFontSize = fontSize * 5;

          // ✨ 줄 간격 계산 로직 수정: 제공된 factor를 사용하고, 없을 경우 1.2를 기본값으로 사용
          const factor = parseFloat(lineHeightFactor) || 1.2;
          const lineHeight = actualFontSize * factor;

          ctx.font = `${fontWeight} ${actualFontSize}px ${fontFamily}`;
          ctx.textAlign = textAlign || "left";
          ctx.fillStyle = fontColor;

          const text = textValues[index] || "";

          wrapText(ctx, text, x, y, maxWidth, lineHeight);
        });
      };

      img.onerror = (err) => {
        console.error("이미지 로드 실패:", imageUrl, err);
      };
    };

    drawCanvas();
  }, [imageUrl, textValues, textAttributes, fontFamily]);

  // -------------------------------------------------------------------
  // ... (Blob, Data URL 반환 함수는 변경 없음)
  // -------------------------------------------------------------------
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

  const getCanvasDataUrl = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    return canvas.toDataURL("image/png");
  };

  return { canvasRef, getCanvasBlob, getCanvasDataUrl };
};

export default useCanvas;
