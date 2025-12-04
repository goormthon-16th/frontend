"use client";
import React, { useState } from "react";
import { Funnel, Step, useFunnel } from "@/components/Funnel";

// 질문 생성 단계 정의 📝
const STEPS = ["question", "answer", "preview"];

export const CreateQuestionTemplate = () => {
  // Funnel 훅 사용 - 단계 관리 🎣
  const [FunnelComponent, setStep] = useFunnel(STEPS, "question");

  // 현재 단계 추적을 위한 상태 (예시용) 📊
  const [currentStep, setCurrentStep] = useState("question");

  // 다음 단계로 이동하는 핸들러 ⏭️
  const handleNext = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentIndex + 1];
      setStep(nextStep);
      setCurrentStep(nextStep);
    }
  };

  // 이전 단계로 이동하는 핸들러 ⏮️
  const handlePrev = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStep = STEPS[currentIndex - 1];
      setStep(prevStep);
      setCurrentStep(prevStep);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Funnel 컴포넌트로 단계별 렌더링 🎯 */}
      <FunnelComponent>
        <Step name="question">
          <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">질문 입력</h2>
            <input
              type="text"
              placeholder="질문을 입력하세요"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleNext}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              다음
            </button>
          </div>
        </Step>

        <Step name="answer">
          <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">답변 입력</h2>
            <textarea
              placeholder="답변을 입력하세요"
              className="w-full p-2 border rounded"
              rows={4}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                이전
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                다음
              </button>
            </div>
          </div>
        </Step>

        <Step name="preview">
          <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">미리보기</h2>
            <div className="space-y-2">
              <p className="text-gray-600">질문과 답변을 확인하세요</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                이전
              </button>
              <button
                onClick={() => alert("저장되었습니다!")}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                저장
              </button>
            </div>
          </div>
        </Step>
      </FunnelComponent>
    </div>
  );
};
