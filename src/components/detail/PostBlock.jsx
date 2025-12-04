import { Text, VStack, HStack, Badge } from "@vapor-ui/core";
import Image from "next/image";
import "@/styles/font.css";

const PostBlock = ({ isFirst, title, content }) => {
  return (
    <VStack margin="$200 0" gap="$200">
      <div
        style={{
          width: "100%",
          position: "relative",
          height: 0,
          overflow: "hidden",
          paddingTop: "70%",
          borderRadius: "8px",
        }}
      >
        <Image
          fill
          src="https://cdn.pixabay.com/photo/2025/09/12/16/49/dog-9830833_1280.jpg"
          alt="img"
          style={{ objectFit: "cover" }}
          sizes="90vw"
        />
      </div>
      <Text
        style={{
          fontFamily: "KCC Sonkeechung",
          fontSize: "24px",
          fontWeight: "500",
          marginTop: "20px",
        }}
      >
        {title}
      </Text>
      {isFirst && (
        <HStack gap="$100">
          {["감성", "이주민", "귤칵테일"].map((tag) => {
            return <Badge key={tag}>{tag}</Badge>;
          })}
        </HStack>
      )}

      <Text style={{ fontSize: "14px", lineHeight: 1.5, marginTop: "10px" }}>{content}</Text>
    </VStack>
  );
};

export default PostBlock;
