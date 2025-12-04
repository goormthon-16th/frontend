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
      <Text typography="subtitle1" foreground="normal-100" marginTop={"20px"}>
        내용 입력
      </Text>

      <InputGroup.Root marginTop={"8px"}>
        <Textarea
          size="sm"
          height={"134px"}
          placeholder="사장님의 이야기를 들려주세요"
          maxLength={200}
        />
        <InputGroup.Counter />
      </InputGroup.Root>

      <VStack width="100%" marginTop="20px">
        <Text typography="subtitle1" foreground="normal-100">
          관련된 사진을 업로드해주세요.
        </Text>
        <div
          style={{
            width: "auto",
            height: "134px",
            border: "1px dashed #d1d5db",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.08333 29.75C6.30417 29.75 5.63715 29.4726 5.08229 28.9177C4.52743 28.3629 4.25 27.6958 4.25 26.9167V7.08333C4.25 6.30417 4.52743 5.63715 5.08229 5.08229C5.63715 4.52743 6.30417 4.25 7.08333 4.25H26.9167C27.6958 4.25 28.3629 4.52743 28.9177 5.08229C29.4726 5.63715 29.75 6.30417 29.75 7.08333V26.9167C29.75 27.6958 29.4726 28.3629 28.9177 28.9177C28.3629 29.4726 27.6958 29.75 26.9167 29.75H7.08333ZM9.91667 24.0833H24.0833C24.3667 24.0833 24.5792 23.9535 24.7208 23.6938C24.8625 23.434 24.8389 23.1861 24.65 22.95L20.7542 17.7438C20.6125 17.5549 20.4236 17.4604 20.1875 17.4604C19.9514 17.4604 19.7625 17.5549 19.6208 17.7438L15.9375 22.6667L13.3167 19.1604C13.175 18.9715 12.9861 18.8771 12.75 18.8771C12.5139 18.8771 12.325 18.9715 12.1833 19.1604L9.35 22.95C9.16111 23.1861 9.1375 23.434 9.27917 23.6938C9.42083 23.9535 9.63333 24.0833 9.91667 24.0833ZM12.0417 14.1667C12.6319 14.1667 13.1337 13.9601 13.5469 13.5469C13.9601 13.1337 14.1667 12.6319 14.1667 12.0417C14.1667 11.4514 13.9601 10.9497 13.5469 10.5365C13.1337 10.1233 12.6319 9.91667 12.0417 9.91667C11.4514 9.91667 10.9497 10.1233 10.5365 10.5365C10.1233 10.9497 9.91667 11.4514 9.91667 12.0417C9.91667 12.6319 10.1233 13.1337 10.5365 13.5469C10.9497 13.9601 11.4514 14.1667 12.0417 14.1667Z"
              fill="#A3A3A3"
            />
          </svg>
        </div>
      </VStack>

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
        </HStack>
      </Flex>
    </VStack>
  );
};
