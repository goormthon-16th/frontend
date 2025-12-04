import BottomButton from "@/components/detail/BottomButton";
import DefaultInfo from "@/components/detail/DefaultInfo";
import PostBlock from "@/components/detail/PostBlock";
import mockPost from "@/components/detail/mockPost";
import { VStack, Text, HStack, Badge } from "@vapor-ui/core";
import Image from "next/image";

const firstPostData = {
  title: mockPost.title[0],
  content: mockPost.content[0],
  tags: ["감성", "이주민", "귤칵테일"],
};

export default function Page() {
  const gradientOverlayStyle = {
    background: "linear-gradient(to top, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0) 100%)",
  };
  return (
    <>
      <div
        style={{
          width: "100vw",
          position: "relative",
          height: 0,
          paddingTop: "70%",
          overflow: "hidden",
        }}
      >
        <Image
          fill
          src="https://cdn.pixabay.com/photo/2025/09/12/16/49/dog-9830833_1280.jpg"
          alt="img"
          style={{ objectFit: "cover" }}
          sizes="90vw"
        />

        <VStack
          gap="$100"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            padding: "20px",
            zIndex: 10,
            color: "white",
            justifyContent: "flex-end",
            ...gradientOverlayStyle,
          }}
          alignItems="flex-start"
        >
          <Text
            foreground="white"
            style={{
              fontFamily: "KCC Sonkeechung",
              fontSize: "24px",
              fontWeight: "500",
              marginBottom: "12px",
              lineHeight: 1.2,
            }}
          >
            {firstPostData.title}
          </Text>
          <HStack gap="$100">
            {firstPostData.tags.map((tag) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FC7302",
                    padding: "2px 12px",
                    borderRadius: "16px",
                  }}
                  shape="pill"
                  key={tag}
                >
                  <Text typography="subtitle2" color="White">
                    {tag}
                  </Text>
                </div>
              );
            })}
          </HStack>
        </VStack>
      </div>

      <VStack margin="0 $200" marginBottom="100px">
        {mockPost.title.map((titleText, index) => {
          const contentText = mockPost.content[index];
          if (index === 0) return null;

          return (
            <div key={index}>
              <PostBlock
                title={titleText}
                content={contentText}
                isFirst={index == 0 ? firstPostData.content : undefined}
              />
            </div>
          );
        })}

        {/* TODO: color 수정 필요 */}
        <div style={{ border: "1px solid lightgray", margin: "32px 0" }} />
        <DefaultInfo />
        <div style={{ border: "1px solid lightgray", margin: "32px 0" }} />

        <BottomButton />
      </VStack>
    </>
  );
}
