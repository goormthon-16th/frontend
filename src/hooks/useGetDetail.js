"use client";

import { useState, useEffect } from "react";
import { customAxios } from "@/utils/customAxios";

/**
 * @typedef {Object} DetailData
 * @property {string} spotId
 * @property {string} spotName
 * @property {string} address
 * @property {string} storyTitle
 * @property {string} storyContent
 * @property {string[]} imageUrls
 */

/**
 * 장소 상세 정보를 가져오는 커스텀 훅입니다.
 * @param {string} spotId - 상세 정보를 가져올 장소의 ID (Path Parameter)
 * @returns {{
 * data: DetailData | null,
 * isLoading: boolean,
 * isError: boolean,
 * error: Error | null
 * }} 결과 객체
 */
export const useGetDetail = (spotId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // spotId가 없으면 API 호출을 건너뜁니다.
    if (!spotId) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        // API 명세: GET /api/spots/{spotId}
        const response = await customAxios.get(`/spots/${spotId}`);
        setData(response.data);
      } catch (err) {
        setIsError(true);
        setError(err);
        console.error("API 호출 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // spotId가 변경될 때마다 재실행
  }, [spotId]);

  return { data, isLoading, isError, error };
};
