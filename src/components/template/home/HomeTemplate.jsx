import MainSwiper from "@/components/MainSwiper";
import SpotSwiper from "@/components/SpotSwiper";
import { Text } from "@vapor-ui/core";
import React from "react";

export const HomeTemplate = () => {
  return (
    <div>
      <MainSwiper />
      <Text typography="heading6" className="text-gray-500">
        다른 사장님들의 이야기에요
      </Text>
      <SpotSwiper />
    </div>
  );
};
