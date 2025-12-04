// useGetSpotList.js (또는 useFetchHooks.js 파일에 작성)

import { useState, useEffect } from "react";
import { customAxios } from "@/utils/customAxios";

/**
 * @typedef {Object} SpotListItem
 * @property {string} spotId
 * @property {string} spotName
 * @property {string} address
 * @property {string} storyTitle
 * @property {string} storyContent
 * @property {string[]} imageUrls
 */

/**
 * 장소 목록 전체를 가져오는 커스텀 훅입니다. (GET /api/spots)
 * @returns {{
 * data: SpotListItem[] | null,
 * isLoading: boolean,
 * isError: boolean,
 * error: Error | null
 * }}
 */
export const useGetSpotList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        // API 명세: GET /api/spots
        // customAxios.baseURL이 /api 이므로 경로는 /spots
        const response = await customAxios.get("/spots");

        // 응답 데이터가 배열이라고 가정
        setData(response.data);
      } catch (err) {
        setIsError(true);
        setError(err);
        console.error("장소 목록 조회 API 호출 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
    // 의존성 배열이 비어 있으므로, 컴포넌트 마운트 시 한 번만 실행됩니다.
  }, []);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
