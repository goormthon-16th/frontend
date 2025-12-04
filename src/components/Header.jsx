"use client";

import { useRouter, usePathname } from "next/navigation";
import { HStack, Text, IconButton } from "@vapor-ui/core";
import { getRouteTitle } from "@/config/routeTitles";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const title = getRouteTitle(pathname);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <HStack
      width="100%"
      height="56px"
      justifyContent="space-between"
      alignItems="center"
      paddingX={{ desktop: "$400", mobile: "$200" }}
      paddingY={{ desktop: "$100", mobile: "$050" }}
      position="sticky"
      top={0}
      backgroundColor="white"
    >
      <IconButton
        aria-label="뒤로가기"
        variant="ghost"
        onClick={handleBackClick}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.7651 6.1369C13.0824 5.8196 13.0824 5.30515 12.7651 4.98785C12.4478 4.67055 11.9333 4.67055 11.616 4.98785L7.27507 9.3288C6.90441 9.69946 6.9044 10.3004 7.27507 10.6711L11.616 15.012C11.9333 15.3293 12.4478 15.3293 12.7651 15.012C13.0824 14.6947 13.0824 14.1803 12.7651 13.863L8.90202 9.99994L12.7651 6.1369Z"
            fill="#393939"
          />
        </svg>
      </IconButton>

      <Text typography="heading6" fontWeight="semibold">
        {title}
      </Text>

      <IconButton
        disabled
        aria-label="placeholder"
        variant="ghost"
        visibility="hidden"
      />
    </HStack>
  );
};
