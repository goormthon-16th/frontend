"use client";

import MainSwiper from "@/components/MainSwiper";
import SpotSwiper from "@/components/SpotSwiper";
import { Button, Flex, HStack, IconButton, Text, VStack } from "@vapor-ui/core";
import React from "react";

export const HomeTemplate = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <MainSwiper />
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
            onClick={() => {
              router.push("/story");
            }}
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
      <SpotSwiper />

      <Button
        size="lg"
        width="calc(100% - 40px)"
        color="white"
        backgroundColor="$primary-200"
        height="48px"
        marginTop={"auto"}
        marginBottom="20px"
        marginX="20px"
      >
        내 홍보물 만들기
      </Button>
    </div>
  );
};
