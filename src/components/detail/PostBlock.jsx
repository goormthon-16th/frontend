import { Flex, Text, VStack, HStack, Badge } from "@vapor-ui/core";
import Image from "next/image";

const PostBlock = ({ isFirst, title, content }) => {
  return (
    <VStack margin="$200 0" gap="$100">
      <div
        style={{
          width: "100%",
          position: "relative",
          height: 0,
          overflow: "hidden",
          paddingTop: "70%",
          // marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <Image
          fill
          src="https://cdn.pixabay.com/photo/2025/09/12/16/49/dog-9830833_1280.jpg"
          alt="img"
          style={{ objectFit: "cover" }}
          // fill 사용 시 성능 최적화를 위한 sizes 속성 추가 (선택)
          sizes="90vw"
        />
      </div>
      {isFirst && (
        <HStack gap="$100">
          {["감성", "이주민", "귤칵테일"].map((tag) => {
            return <Badge key={tag}>{tag}</Badge>;
          })}
        </HStack>
      )}
      <Text typography="heading4">{title}</Text>
      <Text>{content}</Text>
    </VStack>
  );
};

export default PostBlock;
