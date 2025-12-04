"use client";

import React, { useState } from "react";
import { Step, useFunnel } from "@/components/Funnel";
import { Flex, Text, VStack } from "@vapor-ui/core";
import { QuestionForm } from "./QuestionForm";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/navigation";

// 질문 생성 단계 정의 📝
const STEPS = ["first", "second", "third"];

export const CreateQuestionTemplate = () => {
  // Funnel 훅 사용 - 단계 관리 🎣
  const [FunnelComponent, setStep] = useFunnel(STEPS, "first");

  const router = useRouter();
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
    } else {
      router.back();
    }
  };

  const getCurrentStepNumber = () => {
    const stepIndex = STEPS.indexOf(currentStep);
    return stepIndex + 2;
  };

  return (
    <VStack>
      <ProgressBar currentStep={getCurrentStepNumber()} totalSteps={4} />
      <VStack padding="20px">
        <Text typography="heading6" color="$primary-100" marginTop={"59px"}>
          {getCurrentStepNumber()}/4
        </Text>

        <Flex height="100%" marginTop={"6px"}>
          <FunnelComponent>
            <Step name="first">
              <QuestionForm
                onClickPrev={handlePrev}
                onClickNext={handleNext}
                text1="어떤 계기나 이유로"
                text2="제주도에서 가게를 시작하셨나요?"
              />
            </Step>

            <Step name="second">
              <QuestionForm
                onClickPrev={handlePrev}
                onClickNext={handleNext}
                text1="제주도에서 가게를 운영하면서"
                text2="좋았던 기억을 공유해주세요."
              />
            </Step>
            <Step name="third">
              <QuestionForm
                key={"form" + getCurrentStepNumber()}
                onClickPrev={handlePrev}
                onClickNext={handleNext}
                text1="손님들에게 어떻게 기억되고 싶나요?"
                text2="하는 것은 무엇인가요?"
                index={4}
              />
            </Step>
          </FunnelComponent>
        </Flex>
      </VStack>
    </VStack>
  );
};
