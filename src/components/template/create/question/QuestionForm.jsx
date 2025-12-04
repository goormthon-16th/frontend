import {
  Button,
  Flex,
  HStack,
  Text,
  InputGroup,
  TextInput,
  VStack,
  Textarea,
} from "@vapor-ui/core";

export const QuestionForm = ({ onClickPrev, onClickNext, text1, text2 }) => {
  return (
    <VStack width="100%" height="100%" justifyContent="space-between">
      <Text typography="heading5">{text1}</Text>
      <Text typography="heading5">{text2}</Text>
      <Text typography="subtitle1" foreground="normal-100">
        내용 입력
      </Text>

      <InputGroup.Root>
        <Textarea
          size="sm"
          placeholder="사장님의 이야기를 들려주세요"
          maxLength={200}
        />
        <InputGroup.Counter />
      </InputGroup.Root>

      <Flex width="100%" marginTop="20px">
        <Text typography="subtitle1" foreground="normal-100">
          관련된 사진을 업로드해주세요.
        </Text>
      </Flex>

      <Flex
        width="100%"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px",
          backgroundColor: "white",
          zIndex: 100,
        }}
      >
        <HStack
          width="100%"
          gap="$100"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px",
            backgroundColor: "white",
            zIndex: 100,
          }}
        >
          <Button variant="outline" width="50%" onClick={onClickPrev}>
            이전
          </Button>
          <Button width="50%" onClick={onClickNext}>
            다음
          </Button>
        </HStack>{" "}
      </Flex>
    </VStack>
  );
};
