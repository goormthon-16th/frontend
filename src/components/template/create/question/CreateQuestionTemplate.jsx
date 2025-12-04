"use client";

import React, { useState } from "react";
import { Step, useFunnel } from "@/components/Funnel";
import { Flex, Text, VStack } from "@vapor-ui/core";
import { QuestionForm } from "./QuestionForm";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/navigation";

// 1. AI 스토리 생성 훅 임포트
import { useGenerateStory } from "@/hooks/useGenerateStory";
// 2. ★★★ 최종 장소 생성/저장 훅 임포트 (경로 반영) ★★★
import { useCreateSpot } from "@/hooks/usePostSpot";

// 질문 생성 단계 정의 📝
const STEPS = ["first", "second", "third"];

// 임시 데이터 (실제 데이터는 Funnel을 통해 취합되어야 합니다)
const MOCK_PAYLOAD_DATA = {
  ownerName: "홍길동",
  spotName: "제주 맛집",
  address: "제주 어딘가",
  thumbnailUrl: "https://example.com/thumb.jpg",
  text1: "어떤 계기나 이유로 제주도에서 가게를 시작하셨나요?",
  imageUrl1: "https://example.com/img1.jpg",
  text2: "제주도에서 가게를 운영하면서 좋았던 기억을 공유해주세요.",
  imageUrl2: "https://example.com/img2.jpg",
  text3: "손님들에게 어떻게 기억되고 싶나요? 하는 것은 무엇인가요?",
  imageUrl3: "https://example.com/img3.jpg",
};

export const CreateQuestionTemplate = () => {
  // Funnel 훅 사용 - 단계 관리 🎣
  const [FunnelComponent, setStep] = useFunnel(STEPS, "first");

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("first");

  // 1. 스토리 생성 훅 (AI 호출)
  const {
    data: generatedStoryData,
    isLoading: isGenerating,
    isError: generateError,
    generateStory,
  } = useGenerateStory();

  // 2. 장소 생성 훅 (최종 저장)
  const {
    data: createdSpotData,
    isLoading: isCreating,
    isError: createError,
    createSpot,
  } = useCreateSpot();

  // 통합 로딩 상태
  const isLoading = isGenerating || isCreating;

  // 최종 제출 핸들러 (스토리 생성 -> 장소 저장) ✨
  const handleFinalSubmit = async () => {
    // 1. 최종 폼 데이터 (실제 프로젝트에서는 state에서 가져와야 함)
    const storyPayload = MOCK_PAYLOAD_DATA;

    try {
      // 1단계: 스토리 생성 API 호출
      const generatedResult = await generateStory(storyPayload);
      console.log("스토리 생성 성공:", generatedResult.story);

      if (!generatedResult.story) {
        throw new Error("AI 스토리 생성 결과가 비어 있습니다.");
      }

      // 2단계: 장소 생성 Payload 구성
      const createPayload = {
        spotName: storyPayload.spotName,
        address: storyPayload.address,
        // AI가 생성한 스토리를 본문으로 사용
        storyTitle: storyPayload.spotName + "의 이야기", // 적절한 제목 생성 로직 필요
        storyContent: generatedResult.story,
        imageUrls: [
          storyPayload.thumbnailUrl,
          storyPayload.imageUrl1,
          storyPayload.imageUrl2,
          storyPayload.imageUrl3,
        ].filter((url) => url),
      };

      // 3단계: 장소 생성 API 호출 (DB 저장)
      const createdResult = await createSpot(createPayload);

      // 4단계: 성공 후 로직 (결과 페이지로 이동)
      console.log("장소 생성 및 저장 성공. ID:", createdResult.spotId);
      // router.push(`/spot/${createdResult.spotId}`);
    } catch (e) {
      console.error("최종 제출 프로세스 실패:", e);
      // 사용자에게 실패 메시지 표시 로직 추가
    }
  };

  // 다음 단계로 이동하는 핸들러 ⏭️
  const handleNext = () => {
    const currentIndex = STEPS.indexOf(currentStep);

    // 마지막 단계인 경우
    if (currentIndex === STEPS.length - 1) {
      handleFinalSubmit(); // ★★★ 최종 제출 함수 호출 ★★★
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

  // ★★★ 통합 로딩 상태 표시 ★★★
  if (isLoading) {
    return (
      <VStack align="center" justify="center" height="100vh">
        <Text typography="heading3">
          {isGenerating ? "AI 스토리를 생성 중입니다..." : "최종 정보를 서버에 저장 중입니다..."}
        </Text>
        <Text typography="subtitle1">잠시만 기다려주세요.</Text>
      </VStack>
    );
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
                buttonText="최종 스토리 등록" // 최종 제출 버튼 텍스트
              />
            </Step>
          </FunnelComponent>
        </Flex>
      </VStack>
      {/* (선택 사항) 최종 저장 성공 메시지 */}
      {createdSpotData && (
        <VStack padding="20px" background="lightgreen">
          <Text typography="subtitle1">장소 등록 완료!</Text>
          <Text>Spot ID: {createdSpotData.spotId}</Text>
        </VStack>
      )}
    </VStack>
  );
};
