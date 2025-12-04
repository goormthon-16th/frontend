"use client";

import BottomButton from "@/components/detail/BottomButton";
import DefaultInfo from "@/components/detail/DefaultInfo";
import PostBlock from "@/components/detail/PostBlock";
// import mockPost from "@/components/detail/mockPost"; // mockPost 제거
import { VStack, Text, HStack } from "@vapor-ui/core"; // Badge 제거 (직접 구현한 div 사용)
import Image from "next/image";

// 훅 임포트 (경로 수정 필요)
import { useGetDetail } from "@/hooks/useGetDetail";

// 임시 spotId 사용 (실제로는 URL 파라미터 등에서 받아와야 함)
const MOCK_SPOT_ID = "1";

export default function Page() {
  // ★★★ useGetDetail 훅을 사용하여 데이터 가져오기 ★★★
  const { data: detailData, isLoading, isError, error } = useGetDetail(MOCK_SPOT_ID);

  const gradientOverlayStyle = {
    background: "linear-gradient(to top, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0) 100%)",
  };

  // 로딩 및 에러 처리
  if (isLoading) {
    return <div>상세 정보를 불러오는 중입니다...</div>;
  }

  if (isError) {
    console.error(error);
    return <div>데이터 로딩 실패: {error?.message || "알 수 없는 오류"}</div>;
  }

  // 데이터 구조를 확인하여, 첫 번째 포스트 데이터 구성 (API 응답은 단일 포스트)
  const firstPostData = {
    title: detailData.storyTitle,
    content: detailData.storyContent,
    // API 명세에는 tags 필드가 없으므로, 태그는 임시로 유지하거나 API에 맞춰 수정해야 합니다.
    tags: ["감성", "이주민", "귤칵테일"],
    image:
      detailData.imageUrls?.[0] ||
      "https://cdn.pixabay.com/photo/2025/09/12/16/49/dog-9830833_1280.jpg",
  };

  // 첫 번째 이미지는 API에서 가져온 이미지의 첫 번째 항목을 사용
  const firstImageUrl = firstPostData.image;

  // 나머지 PostBlock에 들어갈 데이터 (API 명세에는 단일 스토리만 있으므로,
  // 다수의 PostBlock을 렌더링하려면 이 부분을 서버 응답 구조에 맞게 수정해야 합니다.)
  // 여기서는 구조를 유지하기 위해 첫 번째 항목만 사용하고 나머지는 렌더링하지 않겠습니다.
  const additionalPosts = [{ title: "추가 정보 제목", content: "추가 정보 내용" }];

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
          // ★★★ API 이미지 사용 ★★★
          src={firstImageUrl}
          alt={firstPostData.title}
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
            {/* ★★★ API 데이터 사용 ★★★ */}
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
                  // shape="pill" // shape 속성은 div가 아닌 Badge에 사용됩니다.
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
        {/* API 명세는 단일 상세 정보만 제공하므로, 기존의 map 로직은 유지하기 어렵습니다. 
           임시로 mockPost의 나머지 데이터를 사용하여 렌더링 구조만 유지합니다. */}
        {additionalPosts.map((post, index) => {
          // index 0이 아닌 항목들만 PostBlock으로 렌더링
          return (
            <div key={index}>
              <PostBlock
                title={post.title}
                content={post.content}
                isFirst={false} // 첫 번째가 아님
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
