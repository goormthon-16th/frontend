import { Field, HStack, Text, VStack } from "@vapor-ui/core";
import Image from "next/image";
import { CallIcon, LocationIcon, TimeIcon } from "@vapor-ui/icons";

const DefaultInfo = () => {
  return (
    <VStack gap="$200">
      <Text typography="heading5">기본 정보</Text>
      <HStack gap="$075">
        <div style={{ padding: "2px" }}>
          <LocationIcon width={20} height={20} />
        </div>
        <VStack>
          <Text typography="subtitle1">제주 특별자치도 서귀포 땡귤로 123</Text>
          <Text typography="subtitle2">지도에서 보기</Text>
        </VStack>
      </HStack>

      <HStack gap="$075">
        <div style={{ padding: "2px" }}>
          <TimeIcon width={20} height={20} />
        </div>
        <VStack>
          <Text typography="subtitle1">매일 09:00 - 20:00</Text>
          <Text typography="subtitle2">마지막 주문 19:30</Text>
        </VStack>
      </HStack>
      <HStack gap="$075">
        <div style={{ padding: "2px" }}>
          <CallIcon width={20} height={20} />
        </div>
        <Text typography="subtitle1">064-123-4567</Text>
      </HStack>
    </VStack>
  );
};

export default DefaultInfo;
