"use client";

/**
 * 📊 프로그레스바 컴포넌트 (게이지 바 형태)
 * 현재 진행 단계를 간단한 막대 형태로 표시합니다
 */
const ProgressBar = ({ currentStep, totalSteps = 4 }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#e5e7eb",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#f97316",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
