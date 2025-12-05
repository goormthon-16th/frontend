import { Flex, Button } from "@vapor-ui/core";
import { useRouter } from "next/navigation";

const BottomButton = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/sns");
  };
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
        width="100%"
        color="white"
        backgroundColor="$primary-200"
        height="48px"
        onClick={handleOnClick}
      >
        SNS용 홍보물 미리보기
      </Button>
    </Flex>
  );
};

export default BottomButton;
