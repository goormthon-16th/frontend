import PostBlock from "@/components/detail/PostBlock";
import mockPost from "@/components/detail/mockPost";
import { Badge, Flex, HStack, VStack } from "@vapor-ui/core";

export default function Page() {
  return (
    <VStack margin="$200">
      <HStack gap="$100">
        {["감성", "이주민", "귤칵테일"].map((tag) => {
          return <Badge key={tag}>{tag}</Badge>;
        })}
      </HStack>
      {mockPost.title.map((titleText, index) => {
        const contentText = mockPost.content[index];

        return <PostBlock key={index} title={titleText} content={contentText} />;
      })}
    </VStack>
  );
}
