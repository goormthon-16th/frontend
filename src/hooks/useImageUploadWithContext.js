import { useCallback } from "react";
import useImagePost from "./useImagePost";
import { useSpotCreate } from "@/contexts/SpotCreateContext";

/**
 * 🎯 이미지 업로드 + Context 저장 통합 훅
 * 이미지를 업로드하고 자동으로 Context에 저장합니다.
 *
 * @param {number} step - 현재 단계 (1, 2, 3)
 * @returns {Object} handleImageUpload - 이미지 업로드 핸들러, isLoading - 로딩 상태, error - 에러 상태
 */
const useImageUploadWithContext = (step) => {
  const { uploadImages, isLoading, error } = useImagePost();
  const { setImageUrl1, setImageUrl2, setImageUrl3 } = useSpotCreate();

  /**
   * 🚀 이미지 업로드 및 Context 저장 핸들러
   * @param {File} file - 업로드할 이미지 파일
   * @returns {Promise<string>} 업로드된 이미지 URL
   */
  const handleImageUpload = useCallback(
    async (file) => {
      try {
        // 📤 이미지 업로드
        const imageUrls = await uploadImages([file]);
        const imageUrl = imageUrls[0];

        // 💾 단계별로 Context에 저장
        if (step === 1) {
          setImageUrl1(imageUrl);
        } else if (step === 2) {
          setImageUrl2(imageUrl);
        } else if (step === 3) {
          setImageUrl3(imageUrl);
        }

        console.log(`✅ 이미지 업로드 성공 (단계 ${step}):`, imageUrl);
        return imageUrl;
      } catch (err) {
        console.error("❌ 이미지 업로드 실패:", err);
        throw err;
      }
    },
    [uploadImages, step, setImageUrl1, setImageUrl2, setImageUrl3]
  );

  return {
    handleImageUpload,
    isLoading,
    error,
  };
};

export default useImageUploadWithContext;
