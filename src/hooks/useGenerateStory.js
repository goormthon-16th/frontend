import { useState } from "react";
import { customAxios } from "@/utils/customAxios";

/**
 * @typedef {Object} StoryRequestPayload
 * @property {string} ownerName
 * @property {string} spotName
 * @property {string} address
 * @property {string} text1
 * @property {string} imageUrl1
 * @property {string} text2
 * @property {string} imageUrl2
 * @property {string} text3
 * @property {string} imageUrl3
 */

/**
 * @typedef {Object} StoryResponseData
 * @property {string} story
 */

/**
 * 새로운 스토리를 생성하는 API를 호출하는 커스텀 훅입니다. (POST /api/spots/generate-story)
 * @returns {{
 * data: StoryResponseData | null,
 * isLoading: boolean,
 * isError: boolean,
 * error: Error | null,
 * generateStory: (payload: StoryRequestPayload) => Promise<StoryResponseData | undefined>
 * }}
 */
export const useGenerateStory = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 스토리 생성 API를 호출하는 함수
   * @param {StoryRequestPayload} payload - API 요청 본문
   */
  const generateStory = async (payload) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setData(null); // 새로운 요청 전에 이전 데이터 초기화

    try {
      // API 명세: POST /api/spots/generate-story
      const response = await customAxios.post("/spots/generate-story", payload);

      const responseData = response.data; // 200 OK: { "story": "string" }
      setData(responseData);

      return responseData;
    } catch (err) {
      setIsError(true);
      setError(err);
      console.error("스토리 생성 API 호출 실패:", err);
      // 오류가 발생하면 undefined를 반환하거나 에러를 다시 던질 수 있습니다.
      // 여기서는 undefined를 반환하여 호출 측에서 오류를 처리하도록 유도합니다.
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    isError,
    error,
    generateStory,
  };
};
