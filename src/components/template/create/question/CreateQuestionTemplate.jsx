"use client";

import React, { useState } from "react";
import { Step, useFunnel } from "@/components/Funnel";
import { Flex, Text, VStack } from "@vapor-ui/core";
import { QuestionForm } from "./QuestionForm";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/navigation";

// ★★★ useGenerateStory 훅 임포트 (경로 수정 필요) ★★★
import { useGenerateStory } from "@/hooks/useGenerateStory";

// 질문 생성 단계 정의 📝
const STEPS = ["first", "second", "third"];

// 임시 데이터 (실제 데이터는 QuestionForm에서 받아와야 합니다)
const MOCK_PAYLOAD_DATA = {
  ownerName: "홍길동",
  spotName: "제주 맛집",
  address: "제주 어딘가",
  thumbnailUrl: "https://example.com/thumb.jpg",
  text1: "첫 번째 질문 응답",
  imageUrl1: "https://example.com/img1.jpg",
  text2: "두 번째 질문 응답",
  imageUrl2: "https://example.com/img2.jpg",
  text3: "세 번째 질문 응답",
  imageUrl3: "https://example.com/img3.jpg",
};

export const CreateQuestionTemplate = () => {
  // Funnel 훅 사용 - 단계 관리 🎣
  const [FunnelComponent, setStep] = useFunnel(STEPS, "first");

  // ★★★ useGenerateStory 훅 사용 ★★★
  const {
    data: storyData,
    isLoading: isGenerating,
    isError: generationError,
    generateStory,
  } = useGenerateStory();

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("first");

  // TODO: 실제 폼 데이터를 저장할 상태 (이 예시에서는 MOCK_PAYLOAD_DATA를 사용)
  // const [formData, setFormData] = useState({});

  // 스토리 생성 핸들러 (마지막 단계에서 호출됨) ✨
  const handleGenerateStory = async () => {
    // 1. 여기서 Funnel을 통해 취합된 최종 폼 데이터를 사용하여 payload를 구성해야 합니다.
    const payload = MOCK_PAYLOAD_DATA; // 임시 데이터 사용

    try {
      // 2. 스토리 생성 API 호출
      const result = await generateStory(payload);

      // 3. 성공 후 로직 (예: 결과 페이지로 이동 또는 모달 표시)
      console.log("스토리 생성 성공:", result.story);
      // router.push(`/story/result?id=${result.storyId}`); // 예시
    } catch (e) {
      // 4. 오류 처리 (useGenerateStory 훅에서 이미 콘솔 출력함)
      console.error("스토리 생성 실패:", e);
      // 사용자에게 실패 메시지 표시 로직 추가
    }
  };

  // 다음 단계로 이동하는 핸들러 ⏭️
  const handleNext = () => {
    const currentIndex = STEPS.indexOf(currentStep);

    // 마지막 단계인 경우
    if (currentIndex === STEPS.length - 1) {
      handleGenerateStory(); // ★★★ 마지막 단계에서는 스토리 생성 함수 호출 ★★★
    } else {
      // 다음 단계로 이동
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

  // ★★★ 로딩 및 에러 표시 로직 추가 ★★★
  if (isGenerating) {
    return (
      <VStack align="center" justify="center" height="100vh">
        <Text typography="heading3">스토리를 생성 중입니다...</Text>
        <Text typography="subtitle1">잠시만 기다려주세요.</Text>
      </VStack>
    );
  }

  // 스토리 생성 중 에러가 발생했지만, 폼은 계속 보여줘야 하는 경우
  if (generationError) {
    console.error("스토리 생성 중 에러 발생:", generationError);
    // UI에 에러 메시지 표시
  }

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
