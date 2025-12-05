"use client";

import { createContext, useContext, useState } from "react";

/**
 * 🏪 장소 생성 Context
 * 장소 생성 과정에서 필요한 모든 데이터를 관리합니다.
 */
const SpotCreateContext = createContext(undefined);

export const SpotCreateProvider = ({ children }) => {
  // 📍 기본 정보 (1단계)
  const [spotName, setSpotName] = useState("");
  const [address, setAddress] = useState("");

  // 📝 질문 답변 (2-4단계)
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  // 🖼️ 이미지 URL (각 단계별)
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");

  // 🎯 모든 상태를 초기화하는 함수
  const resetAll = () => {
    setSpotName("");
    setAddress("");
    setText1("");
    setText2("");
    setText3("");
    setImageUrl1("");
    setImageUrl2("");
    setImageUrl3("");
  };

  const value = {
    // 📍 기본 정보
    spotName,
    setSpotName,
    address,
    setAddress,

    // 📝 질문 답변
    text1,
    setText1,
    text2,
    setText2,
    text3,
    setText3,

    // 🖼️ 이미지 URL
    imageUrl1,
    setImageUrl1,
    imageUrl2,
    setImageUrl2,
    imageUrl3,
    setImageUrl3,

    // 🔄 초기화
    resetAll,
  };

  return (
    <SpotCreateContext.Provider value={value}>
      {children}
    </SpotCreateContext.Provider>
  );
};

/**
 * 🎣 장소 생성 Context 사용 훅
 */
export const useSpotCreate = () => {
  const context = useContext(SpotCreateContext);
  if (context === undefined) {
    throw new Error("useSpotCreate must be used within a SpotCreateProvider");
  }
  return context;
};
