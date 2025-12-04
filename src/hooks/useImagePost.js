import { useState } from "react";
import { customAxios } from "@/utils/customAxios";

/**
 * 🖼️ 이미지 업로드 커스텀 훅
 * S3에 이미지를 업로드하고 URL을 반환받습니다.
 *
 * @returns {Object} uploadImages - 이미지 업로드 함수, isLoading - 로딩 상태, error - 에러 상태
 */
const useImagePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 📤 이미지 업로드 함수
   * @param {File[]} files - 업로드할 이미지 파일 배열
   * @returns {Promise<string[]>} 업로드된 이미지 URL 배열
   */
  const uploadImages = async (files) => {
    // 🔍 파일 유효성 검사
    if (!files || files.length === 0) {
      throw new Error("업로드할 파일이 없습니다.");
    }

    setIsLoading(true);
    setError(null);

    try {
      // 📦 각 파일을 개별적으로 업로드하고 URL 수집
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        console.log("🚀 업로드 요청 시작:", file.name);
        const response = await customAxios.post("/upload/image", formData);
        console.log("✅ 업로드 응답:", response.data);

        // ✅ 응답에서 URL 추출 (response.data.url)
        const imageUrl = response.data?.url;
        if (!imageUrl) {
          throw new Error("응답에 이미지 URL이 없습니다.");
        }

        return imageUrl;
      });

      // ⏳ 모든 업로드가 완료될 때까지 대기
      const imageUrls = await Promise.all(uploadPromises);

      return imageUrls;
    } catch (err) {
      // ❌ 에러 처리
      const errorMessage = err.message || "이미지 업로드에 실패했습니다.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadImages,
    isLoading,
    error,
  };
};

export default useImagePost;
