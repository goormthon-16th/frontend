import { Flex, Button } from "@vapor-ui/core";

const BottomButton = () => {
  return (
    <Flex
      style={{
        gap: "12px",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "16px",
        backgroundColor: "white",
        zIndex: 10,
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        justifyContent: "space-between",
      }}
    >
      <Button
        width="50%"
        height="48px"
        color="black"
        backgroundColor="$gray-100"
      >
        뒤로 가기
      </Button>
      <Button
        width="50%"
        color="white"
        backgroundColor="$primary-200"
        height="48px"
      >
        내 콘텐츠 만들기
      </Button>
    </Flex>
  );
};

export default BottomButton;
