import { Header } from "@/components/Header";
import CanvasSwiper from "@/components/sns/CanvasSwiper";
import { VStack, Flex, Button } from "@vapor-ui/core";

export default function Home() {
  return (
    <VStack>
      <Header />
      <VStack alignItems="center" height="120px" justifyContent="center">
        <div style={{ fontSize: "20px" }}>다운받아서</div>
        <div style={{ fontWeight: 600, fontSize: "24px" }}>SNS에 올려보세요!</div>
      </VStack>
      <CanvasSwiper />
    </VStack>
  );
}
