"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// 🔄 이 페이지는 더 이상 사용되지 않습니다.
// /spot/create/question으로 리다이렉트합니다.
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/spot/create/question");
  }, [router]);

  return null;
}
