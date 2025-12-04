"use client";

import MainSwiper from "@/components/MainSwiper";
import SpotSwiper from "@/components/SpotSwiper";
import { Button, Flex, HStack, IconButton, Text, VStack } from "@vapor-ui/core";
import React from "react";
import { useRouter } from "next/navigation"; // useRouter 임포트 추가

import { useGetSpotList } from "@/hooks/useGetSpotList";

export const HomeTemplate = () => {
  const router = useRouter(); // useRouter 훅 사용

  const { data: spotList, isLoading, isError } = useGetSpotList();

  const handleMoreClick = () => {
    router.push("/story");
  };

  const handleCreatePromo = () => {
    // 내 홍보물 만들기 로직 추가 (예: 폼 페이지로 이동)
    // router.push("/create-promo");
    console.log("내 홍보물 만들기 버튼 클릭");
  };

  // 로딩 및 오류 상태 처리
  let content;

  if (isLoading) {
    content = (
      <Text padding="20px" typography="subtitle1">
        이야기 목록을 불러오는 중입니다...
      </Text>
    );
  } else if (isError) {
    content = (
      <Text padding="20px" typography="subtitle1" color="red">
        이야기 목록을 불러오는 데 실패했습니다.
      </Text>
    );
  } else if (!spotList || spotList.length === 0) {
    content = (
      <Text padding="20px" typography="subtitle1">
        아직 등록된 이야기가 없습니다.
      </Text>
    );
  } else {
    // ★★★ 데이터가 있을 경우 SpotSwiper에 전달 ★★★
    content = <SpotSwiper spotList={spotList} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <MainSwiper />

      {/* 사장님 이야기 헤더 */}
      <HStack padding={"20px 24px 10px 24px"}>
        <VStack justifyContent="center">
          <Text typography="heading6" style={{ color: "#393939" }}>
            다른 사장님들의 이야기에요
          </Text>
        </VStack>
        <VStack justifyContent="center" marginLeft="auto">
          <IconButton
            aria-label="더보기"
            variant="ghost"
            onClick={handleMoreClick} // 함수로 연결
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.23505 13.8629C6.91775 14.1802 6.91775 14.6947 7.23505 15.012C7.55235 15.3293 8.06679 15.3293 8.38409 15.012L12.725 10.671C13.0957 10.3004 13.0957 9.6994 12.725 9.32873L8.3841 4.98779C8.06679 4.67049 7.55235 4.67049 7.23505 4.98779C6.91775 5.30509 6.91775 5.81954 7.23505 6.13684L11.0981 9.99988L7.23505 13.8629Z"
                fill="#767676"
              />
            </svg>
          </IconButton>
        </VStack>
      </HStack>

      {/* ★★★ SpotSwiper 대신 로딩/데이터/에러 콘텐츠 출력 ★★★ */}
      <Flex direction="column" flexGrow={1}>
        {content}
      </Flex>

      <Button
        size="lg"
        width="calc(100% - 40px)"
        color="white"
        backgroundColor="$primary-200"
        height="48px"
        marginTop={"auto"}
        marginBottom="20px"
        marginX="20px"
        onClick={handleCreatePromo}
      >
        내 홍보물 만들기
      </Button>
    </div>
  );
};
