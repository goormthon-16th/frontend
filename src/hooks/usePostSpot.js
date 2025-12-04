// useCreateSpot.js (또는 useFetchHooks.js 파일에 작성)

import { useState } from "react";
import { customAxios } from "@/utils/customAxios"; // 경로에 맞게 수정해주세요

/**
 * @typedef {Object} CreateSpotPayload
 * @property {string} spotName
 * @property {string} address
 * @property {string} storyTitle
 * @property {string} storyContent
 * @property {string[]} imageUrls
 */

/**
 * @typedef {Object} CreateSpotResponse
 * @property {string} spotId - 생성된 장소의 ID
 * @property {string} spotName
 * // ... (201 Created 응답의 나머지 필드에 따라 정의)
 */

/**
 * 새로운 장소를 생성하고 상세 정보를 저장하는 API를 호출하는 커스텀 훅입니다.
 * (POST /api/spots)
 * @returns {{
 * data: CreateSpotResponse | null,
 * isLoading: boolean,
 * isError: boolean,
 * error: Error | null,
 * createSpot: (payload: CreateSpotPayload) => Promise<CreateSpotResponse | undefined>
 * }}
 */
export const useCreateSpot = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 장소 생성 API를 호출하는 함수
   * @param {CreateSpotPayload} payload - API 요청 본문
   */
  const createSpot = async (payload) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setData(null);

    try {
      // API 명세: POST /api/spots
      // baseURL이 /api이므로 경로는 /spots
      const response = await customAxios.post("/spots", payload);

      const responseData = response.data; // 201 Created 응답 데이터
      setData(responseData);

      return responseData;
    } catch (err) {
      setIsError(true);
      setError(err);
      console.error("장소 생성 API 호출 실패:", err);
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
    createSpot,
  };
};
