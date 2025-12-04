import { Button, Field, Flex, HStack, InputGroup, Text, TextInput, VStack } from "@vapor-ui/core";

export function QuestionForm() {
  return (
    <Flex justifyContent="center" alignContent="center">
      <VStack>
        <Text typography="heading4">질문이 나타날 위치입니다.</Text>
        <InputGroup.Root>
          <TextInput width="100%" placeholder="내용 작성하세용" maxLength={200} />
          <InputGroup.Counter />
        </InputGroup.Root>
        <HStack width="100%">
          <Button variant="outline" width="50%">
            이전
          </Button>
          <Button width="50%">다음</Button>
        </HStack>
      </VStack>
    </Flex>
  );
}
