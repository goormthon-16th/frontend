"use client";

import {
  Box,
  Button,
  Field,
  Form,
  Text,
  TextInput,
  VStack,
} from "@vapor-ui/core";

export const CreateInfoTemplate = () => {
  return (
    <div>
      <VStack
        gap="$250"
        padding="$300"
        className="create-info"
        render={<Form onSubmit={(event) => event.preventDefault()} />}
      >
        <VStack gap="$200">
          <Field.Root>
            <Box
              render={<Field.Label />}
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text typography="subtitle2" foreground="normal-200">
                가게 이름
              </Text>
              <TextInput id="store-name" size="lg" required type="text" />
            </Box>
            <Field.Error match="valueMissing">
              가게 이름을 입력해주세요.
            </Field.Error>
          </Field.Root>
          <Field.Root>
            <Box
              render={<Field.Label />}
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text typography="subtitle2" foreground="normal-200">
                가게 주소
              </Text>
              <TextInput id="store-address" type="text" required size="lg" />
            </Box>
            <Field.Error match="valueMissing">
              가게 주소를 입력해주세요.
            </Field.Error>
          </Field.Root>
        </VStack>
        <VStack gap="$100">
          <Button size="lg">다음</Button>
        </VStack>
      </VStack>
    </div>
  );
};
