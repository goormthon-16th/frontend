"use client";

import { createContext, useContext, useState } from "react";

// 📦 Application 전역 상태를 관리하는 Context
const ApplicationContext = createContext(null);

// 🎣 Application Context를 사용하는 커스텀 훅
export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplication은 ApplicationProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};

// 🌍 Application Provider 컴포넌트
export const ApplicationProvider = ({ children }) => {
  // 📝 전체 application 데이터 상태
  const [applicationData, setApplicationData] = useState({
    ownerName: "",
    spotName: "",
    address: "",
    thumbnailUrl: "",
    text1: "",
    imageUrl1: "",
    text2: "",
    imageUrl2: "",
    text3: "",
    imageUrl3: "",
  });

  // 🖼️ 업로드된 이미지 URL 배열 상태
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  // 🔄 기본 정보 업데이트 함수 (CreateInfoTemplate에서 사용)
  const updateBasicInfo = (data) => {
    setApplicationData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // 🔄 섹션 데이터 업데이트 함수 (CreateQuestionTemplate에서 사용)
  const updateSectionData = (sectionData) => {
    setApplicationData((prev) => ({
      ...prev,
      ...sectionData,
    }));
  };

  // 🖼️ 이미지 URL 배열 추가 함수
  const addImageUrls = (urls) => {
    setUploadedImageUrls((prev) => [...prev, ...urls]);
  };

  // 🖼️ 특정 인덱스의 이미지 URL 업데이트 함수
  const updateImageUrl = (index, url) => {
    setUploadedImageUrls((prev) => {
      const newUrls = [...prev];
      newUrls[index] = url;
      return newUrls;
    });
  };

  // 🗑️ 이미지 URL 배열 초기화 함수
  const clearImageUrls = () => {
    setUploadedImageUrls([]);
  };

  // 🗑️ 전체 데이터 초기화 함수
  const resetApplicationData = () => {
    setApplicationData({
      ownerName: "",
      spotName: "",
      address: "",
      thumbnailUrl: "",
      text1: "",
      imageUrl1: "",
      text2: "",
      imageUrl2: "",
      text3: "",
      imageUrl3: "",
    });
    clearImageUrls();
  };

  const value = {
    applicationData,
    uploadedImageUrls,
    updateBasicInfo,
    updateSectionData,
    addImageUrls,
    updateImageUrl,
    clearImageUrls,
    resetApplicationData,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};
