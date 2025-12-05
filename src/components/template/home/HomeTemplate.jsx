"use client";

import MainSwiper from "@/components/MainSwiper";
import SpotSwiper from "@/components/SpotSwiper";
import { Button, Flex, HStack, Text, VStack } from "@vapor-ui/core";
import React from "react";
import { useRouter } from "next/navigation"; // useRouter 임포트 추가

import { useGetSpotList } from "@/hooks/useGetSpotList";

export const HomeTemplate = () => {
  const router = useRouter(); // useRouter 훅 사용

  const { data: spotList, isLoading, isError } = useGetSpotList();

  const handleCreatePromo = () => {
    // 내 홍보물 만들기 로직 추가 (예: 폼 페이지로 이동)
    router.push("/spot/create");
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
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <MainSwiper />

      {/* 사장님 이야기 헤더 */}
      <HStack padding={"20px 24px 10px 24px"}>
        <VStack justifyContent="center">
          <Text
            style={{
              fontFamily: "KCC Sonkeechung",
              fontSize: "24px",
              fontWeight: "500",
              marginBottom: "12px",
              lineHeight: 1.2,
              color: "#767676",
            }}
          >
            김탐라 사장님,
          </Text>
          <Text typography="heading6" style={{ color: "#767676" }}>
            다른 사장님들의 게시글도 확인해 보세요
          </Text>
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
