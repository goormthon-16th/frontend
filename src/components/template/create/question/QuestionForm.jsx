import { Button, Flex, HStack, Text, InputGroup, TextInput, VStack } from "@vapor-ui/core";

export const QuestionForm = ({ onClickPrev, onClickNext, text }) => {
  return (
    <VStack>
      <Text typography="heading4">{text}</Text>
      <InputGroup.Root>
        <TextInput width="100%" placeholder="내용 작성하세용" maxLength={200} />
        <InputGroup.Counter />
      </InputGroup.Root>
      <HStack width="100%">
        <Button variant="outline" width="50%" onClick={onClickPrev}>
          이전
        </Button>
        <Button width="50%" onClick={onClickNext}>
          다음
        </Button>
      </HStack>
    </VStack>
  );
};
