"use client";

import { useEffect, useRef } from "react";

// 텍스트 속성 구조:
// [0:_, 1:_, 2:_, 3:_, 4:fontSize, 5:fontColor, 6:x, 7:y_setting, 8:maxWidth, 9:textAlign, 10:fontWeight, 11:lineHeightFactor]
// y_setting의 의미:
// - 마지막 텍스트: 캔버스 하단으로부터의 거리 (Bottom Padding)
// - 그 외 텍스트: 바로 아래 텍스트 블록의 Bottom으로부터의 간격 (Spacing)
const useCanvas = (imageUrl, textValues, textAttributes, fontFamily) => {
  const canvasRef = useRef(null);

  // -------------------------------------------------------------
  // 텍스트 줄 바꿈 및 렌더링 함수
  const wrapText = (ctx, text, x, initialY, maxWidth, lineHeight, actualFontSize) => {
    if (!text) return { bottomY: initialY };

    const paragraphs = text.split("\n");
    let currentY = initialY;

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

    // 텍스트 블록의 최종 Baseline Y 좌표
    const finalBaselineY = currentY - lineHeight;

    // 텍스트 블록의 실제 Bottom Y 좌표 근사치 계산:
    const baselineToBottom = actualFontSize * 0.2;
    const bottomY = finalBaselineY + baselineToBottom;

    return { bottomY };
  };
  // -------------------------------------------------------------

  // -------------------------------------------------------------
  // 그라디언트 그리기 함수
  const drawGradientOverlay = (ctx, canvasWidth, canvasHeight) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0.0, "rgba(0, 0, 0, 0.05)");
    gradient.addColorStop(0.2, "rgba(0, 0, 0, 0.05)");
    gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.35)");
    gradient.addColorStop(0.8, "rgba(0, 0, 0, 0.85)");
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
      const canvasWidth = 5400;
      const canvasHeight = 6795;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;

      img.onload = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // 1. 이미지 크롭 및 그라디언트 로직 (생략)
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
        drawGradientOverlay(ctx, canvasWidth, canvasHeight);

        // ==========================================================
        // 2. 텍스트 Bottom-Up 렌더링
        // ==========================================================

        const TEXT_COUNT = textAttributes.length;
        let nextTextBottomY = canvasHeight; // 다음 텍스트가 배치되어야 할 Bottom Y 좌표

        // 텍스트 배열을 역순으로 순회하여 Bottom-Up 방식으로 배치합니다.
        for (let index = TEXT_COUNT - 1; index >= 0; index--) {
          const textAttr = textAttributes[index];
          const text = textValues[index] || "";

          const [
            ,
            ,
            ,
            ,
            fontSize,
            fontColor,
            x,
            ySetting,
            maxWidth,
            textAlign,
            fontWeight,
            lineHeightFactor,
          ] = textAttr;

          const actualFontSize = fontSize * 5;
          const factor = parseFloat(lineHeightFactor) || 1.2;
          const lineHeight = actualFontSize * factor;

          ctx.font = `${fontWeight} ${actualFontSize}px ${fontFamily}`;
          ctx.textAlign = textAlign || "left";
          ctx.fillStyle = fontColor;

          let targetBottomY;

          if (index === TEXT_COUNT - 1) {
            // 마지막 텍스트 (캔버스 하단 패딩 기준)
            targetBottomY = canvasHeight - ySetting;
          } else {
            // 이전 텍스트 (바로 아래 텍스트와의 간격 기준)
            targetBottomY = nextTextBottomY - ySetting;
          }

          // 텍스트의 Baseline Y 좌표를 역산합니다.
          const baselineToBottom = actualFontSize * 0.2;
          const startY = targetBottomY - baselineToBottom;

          // 텍스트 렌더링
          wrapText(ctx, text, x, startY, maxWidth, lineHeight, actualFontSize);

          // 다음 텍스트 (index-1) 계산을 위해 현재 텍스트 블록의 Target Bottom Y를 저장
          nextTextBottomY = targetBottomY;
        }
      };

      img.onerror = (err) => {
        console.error("이미지 로드 실패:", imageUrl, err);
      };
    };

    drawCanvas();
  }, [imageUrl, textValues, textAttributes, fontFamily]);

  return { canvasRef };
};

export default useCanvas;
