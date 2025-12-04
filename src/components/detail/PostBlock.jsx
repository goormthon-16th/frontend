import { Flex, Text, VStack } from "@vapor-ui/core";
import Image from "next/image";

const PostBlock = ({ title, content }) => {
  return (
    <VStack alignItems="center" margin="$200">
      <div
        style={{
          position: "relative",
          width: "398px",
          height: 0,
          overflow: "hidden",
          paddingTop: "231px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <Image
          fill
          src="https://cdn.pixabay.com/photo/2025/09/12/16/49/dog-9830833_1280.jpg"
          alt="img"
          style={{ objectFit: "cover" }}
        />
      </div>
      <Text typography="heading4">{title}</Text>
      <Text>{content}</Text>
    </VStack>
  );
};

export default PostBlock;
