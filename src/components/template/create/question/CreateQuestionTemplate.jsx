"use client";

import React, { useState } from "react";
import { Funnel, Step, useFunnel } from "@/components/Funnel";
import { Flex, Text, VStack } from "@vapor-ui/core";
import { QuestionForm } from "./QuestionForm";
import ProgressBar from "@/components/ProgressBar";

// 질문 생성 단계 정의 📝
const STEPS = ["first", "second", "third"];

export const CreateQuestionTemplate = () => {
  // Funnel 훅 사용 - 단계 관리 🎣
  const [FunnelComponent, setStep] = useFunnel(STEPS, "first");

  // 현재 단계 추적을 위한 상태 (예시용) 📊
  const [currentStep, setCurrentStep] = useState("first");

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

  const getCurrentStepNumber = () => {
    const stepIndex = STEPS.indexOf(currentStep);
    return stepIndex + 2;
  };

  return (
    <>
      <ProgressBar currentStep={getCurrentStepNumber()} totalSteps={4} />

      <Flex padding="20px" height="100%">
        <FunnelComponent>
          <Step name="first">
            <QuestionForm
              onClickPrev={handlePrev}
              onClickNext={handleNext}
              text="첫번째질문입니다"
            />
          </Step>

          <Step name="second">
            <QuestionForm
              onClickPrev={handlePrev}
              onClickNext={handleNext}
              text="두번째질문입니다"
            />
          </Step>

          <Step name="third">
            <QuestionForm
              onClickPrev={handlePrev}
              onClickNext={handleNext}
              text="세번째질문입니다"
            />
          </Step>
        </FunnelComponent>
      </Flex>
    </>
  );
};
