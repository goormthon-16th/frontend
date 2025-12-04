import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Dialog,
  Field,
  Flex,
  HStack,
  Text,
  TextInput,
  InputGroup,
  VStack,
  Textarea,
} from "@vapor-ui/core";
import useImageUploadWithContext from "@/hooks/useImageUploadWithContext";
import { useSpotCreate } from "@/contexts/SpotCreateContext";
import { useDaumPostcodeScript } from "@/utils/usePostCodeScript";

export const QuestionForm = ({
  onClickPrev,
  onClickNext,
  text1,
  text2,
  index = 0,
  step = 0, // 현재 단계 (0: info, 1, 2, 3)
  buttonText = "다음으로", // 버튼 텍스트 커스터마이징
}) => {
  // 📸 이미지 파일과 미리보기 URL 상태 관리
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // 🎯 Context에서 상태 가져오기
  const context = useSpotCreate();

  // 🏠 Info 단계 (step === 0) 전용 상태
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [storeNameError, setStoreNameError] = useState("");
  const scriptLoaded = useDaumPostcodeScript();

  const textValue =
    step === 1 ? context.text1 : step === 2 ? context.text2 : context.text3;
  const setText =
    step === 1
      ? context.setText1
      : step === 2
      ? context.setText2
      : context.setText3;

  // 🖼️ 이미지 업로드 훅 (Context와 통합) - info 단계에서는 사용 안 함
  const { handleImageUpload, isLoading, error } =
    useImageUploadWithContext(step);

  // 📂 파일 선택 핸들러
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일인지 확인 🔍
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 미리보기 URL 생성 🖼️
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    // 📤 S3에 이미지 업로드 및 Context 저장
    try {
      await handleImageUpload(file);
    } catch (err) {
      console.error("❌ 업로드 실패:", err);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 🗑️ 이미지 삭제 핸들러
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    // Context에서도 삭제
    if (step === 1) {
      context.setImageUrl1("");
    } else if (step === 2) {
      context.setImageUrl2("");
    } else if (step === 3) {
      context.setImageUrl3("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 📤 업로드 영역 클릭 핸들러
  const handleUploadClick = () => {
    // 로딩 중에는 클릭 방지 🚫
    if (isLoading) return;
    fileInputRef.current?.click();
  };

  const handlePostCodeComplete = useCallback(
    (data) => {
      const fullAddress = data.address;
      const extraAddress = data.addressType === "R" ? data.bname : "";
      const finalAddress = extraAddress
        ? `${fullAddress} (${extraAddress})`
        : fullAddress;
      context.setAddress(finalAddress);
      setAddressError("");
      setIsDialogOpen(false);
    },
    [context]
  );

  const containerRefCallback = useCallback(
    (element) => {
      if (!element || !isDialogOpen || !scriptLoaded || !window.daum) return;

      const postcode = new window.daum.Postcode({
        oncomplete: function (data) {
          handlePostCodeComplete(data);
        },
        onclose: function (state) {
          if (state === "FORCE_CLOSE") {
            setIsDialogOpen(false);
          }
        },
        width: "100%",
        height: "100%",
      });

      postcode.embed(element, {
        autoClose: false,
      });
    },
    [isDialogOpen, scriptLoaded, handlePostCodeComplete]
  );

  const handleInfoNext = () => {
    if (!context.address || context.address.trim() === "") {
      setAddressError("가게 주소를 입력해주세요.");
      return;
    }

    if (!context.spotName || context.spotName.trim() === "") {
      setStoreNameError("가게 이름을 입력해주세요.");
      return;
    }
    onClickNext();
  };

  // 🏠 Info 단계 렌더링 (step === 0)
  if (step === 0) {
    return (
      <VStack width="100%" height="100%" justifyContent="space-between">
        <Text typography="heading5">{text1}</Text>
        <Text typography="heading5">{text2}</Text>

        <VStack gap="$200" width="100%" marginTop="20px">
          <Field.Root>
            <Box
              render={<Field.Label />}
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text typography="subtitle2" foreground="normal-200">
                가게 이름
              </Text>
              <TextInput
                id="store-name"
                size="lg"
                required
                type="text"
                value={context.spotName}
                onChange={(e) => {
                  context.setSpotName(e.target.value);
                  if (storeNameError) setStoreNameError(""); // 입력 시 에러 초기화
                }}
                aria-invalid={storeNameError ? "true" : "false"}
              />
            </Box>
            <Field.Error match={storeNameError.length > 0}>
              가게 이름을 입력해주세요.
            </Field.Error>
          </Field.Root>
          <Field.Root>
            <Box
              render={<Field.Label />}
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text typography="subtitle2" foreground="normal-200">
                가게 주소
              </Text>
              <TextInput
                id="store-address"
                type="text"
                size="lg"
                value={context.address}
                onChange={(e) => {
                  context.setAddress(e.target.value);
                  if (addressError) setAddressError(""); // 입력 시 에러 초기화
                }}
                onClick={() => setIsDialogOpen(true)}
                placeholder="우편번호 검색을 눌러주세요"
                readOnly
                aria-invalid={addressError ? "true" : "false"}
              />
              <Dialog.Root
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                modal={true}
              >
                <Dialog.Popup
                  style={{ width: "400px", height: "500px", padding: 0 }}
                >
                  <Dialog.Body style={{ padding: 0, height: "100%" }}>
                    <div
                      ref={containerRefCallback}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Dialog.Body>
                </Dialog.Popup>
              </Dialog.Root>
            </Box>
            <Field.Error match={addressError.length > 0}>
              가게 주소를 입력해주세요.
            </Field.Error>
          </Field.Root>
        </VStack>

        <Flex
          width="100%"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px",
            backgroundColor: "white",
            zIndex: 100,
          }}
        >
          <Button size="lg" width="100%" onClick={handleInfoNext}>
            {buttonText}
          </Button>
        </Flex>
      </VStack>
    );
  }

  // 📝 질문 단계 렌더링 (step >= 1)
  return (
    <VStack width="100%" height="100%" justifyContent="space-between">
      <Text typography="heading5">{text1}</Text>
      <Text typography="heading5">{text2}</Text>
      <Text typography="subtitle1" foreground="normal-100" marginTop={"20px"}>
        내용 입력
      </Text>

      <InputGroup.Root marginTop={"8px"}>
        <Textarea
          size="sm"
          height={"134px"}
          placeholder="사장님의 이야기를 들려주세요"
          maxLength={200}
          value={textValue}
          onChange={(e) => setText(e.target.value)}
        />
        <InputGroup.Counter />
      </InputGroup.Root>

      <VStack width="100%" marginTop="20px">
        <Text typography="subtitle1" foreground="normal-100">
          관련된 사진을 업로드해주세요.
        </Text>

        {/* 숨겨진 파일 input 📁 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        {/* 이미지 업로드 영역 📤 */}
        <div
          onClick={handleUploadClick}
          style={{
            width: "100%",
            height: "229px",
            border: "1px dashed #d1d5db",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "8px",
            cursor: isLoading ? "not-allowed" : "pointer",
            position: "relative",
            overflow: "hidden",
            backgroundColor: previewUrl ? "#f9fafb" : "transparent",
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          {isLoading ? (
            // 로딩 중 표시 ⏳
            <VStack alignItems="center" gap="$100">
              <Text typography="body2" foreground="normal-100">
                업로드 중...
              </Text>
            </VStack>
          ) : previewUrl ? (
            // 이미지 미리보기 🖼️
            <>
              <Image
                src={previewUrl}
                alt="미리보기"
                fill
                style={{
                  objectFit: "contain",
                  borderRadius: "6px",
                }}
              />
              {/* 삭제 버튼 ❌ */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  zIndex: 10,
                }}
              >
                ×
              </button>
            </>
          ) : (
            // 업로드 아이콘 📷
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.08333 29.75C6.30417 29.75 5.63715 29.4726 5.08229 28.9177C4.52743 28.3629 4.25 27.6958 4.25 26.9167V7.08333C4.25 6.30417 4.52743 5.63715 5.08229 5.08229C5.63715 4.52743 6.30417 4.25 7.08333 4.25H26.9167C27.6958 4.25 28.3629 4.52743 28.9177 5.08229C29.4726 5.63715 29.75 6.30417 29.75 7.08333V26.9167C29.75 27.6958 29.4726 28.3629 28.9177 28.9177C28.3629 29.4726 27.6958 29.75 26.9167 29.75H7.08333ZM9.91667 24.0833H24.0833C24.3667 24.0833 24.5792 23.9535 24.7208 23.6938C24.8625 23.434 24.8389 23.1861 24.65 22.95L20.7542 17.7438C20.6125 17.5549 20.4236 17.4604 20.1875 17.4604C19.9514 17.4604 19.7625 17.5549 19.6208 17.7438L15.9375 22.6667L13.3167 19.1604C13.175 18.9715 12.9861 18.8771 12.75 18.8771C12.5139 18.8771 12.325 18.9715 12.1833 19.1604L9.35 22.95C9.16111 23.1861 9.1375 23.434 9.27917 23.6938C9.42083 23.9535 9.63333 24.0833 9.91667 24.0833ZM12.0417 14.1667C12.6319 14.1667 13.1337 13.9601 13.5469 13.5469C13.9601 13.1337 14.1667 12.6319 14.1667 12.0417C14.1667 11.4514 13.9601 10.9497 13.5469 10.5365C13.1337 10.1233 12.6319 9.91667 12.0417 9.91667C11.4514 9.91667 10.9497 10.1233 10.5365 10.5365C10.1233 10.9497 9.91667 11.4514 9.91667 12.0417C9.91667 12.6319 10.1233 13.1337 10.5365 13.5469C10.9497 13.9601 11.4514 14.1667 12.0417 14.1667Z"
                fill="#A3A3A3"
              />
            </svg>
          )}
        </div>

        {/* 에러 메시지 표시 ❌ */}
        {error && (
          <Text
            typography="caption"
            foreground="error"
            marginTop="8px"
            style={{ color: "red" }}
          >
            {error}
          </Text>
        )}
      </VStack>

      <Flex
        width="100%"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px",
          backgroundColor: "white",
          zIndex: 100,
        }}
      >
        <HStack
          width="100%"
          gap="$100"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px",
            backgroundColor: "white",
            zIndex: 100,
          }}
        >
          <Button
            width="50%"
            height="48px"
            onClick={onClickPrev}
            color="black"
            backgroundColor="$gray-100"
          >
            이전으로
          </Button>
          <Button
            width="50%"
            color="white"
            backgroundColor="$primary-200"
            height="48px"
            onClick={onClickNext}
          >
            {buttonText}
          </Button>
        </HStack>
      </Flex>
    </VStack>
  );
};
