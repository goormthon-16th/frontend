import BottomButton from "@/components/detail/BottomButton";
import PostBlock from "@/components/detail/PostBlock";
import mockPost from "@/components/detail/mockPost";
import { Badge, HStack, VStack } from "@vapor-ui/core";

export default function Page() {
  return (
    <VStack margin="$200" marginBottom="100px">
      {mockPost.title.map((titleText, index) => {
        const contentText = mockPost.content[index];

        return (
          <div key={index}>
            <PostBlock title={titleText} content={contentText} isFirst={index == 0} />
          </div>
        );
      })}

      {/* TODO: color 수정 필요 */}
      <div style={{ border: "1px solid lightgray" }} />

      <BottomButton />
    </VStack>
  );
}
