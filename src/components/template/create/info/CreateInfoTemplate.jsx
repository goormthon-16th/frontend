"use client";

import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Field,
  Flex,
  Form,
  Text,
  TextInput,
  VStack,
} from "@vapor-ui/core";
import { useDaumPostcodeScript } from "@/utils/usePostCodeScript";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/navigation";
import { useSpotCreate } from "@/contexts/SpotCreateContext";

export const CreateInfoTemplate = () => {
  // 🎯 Context에서 상태 가져오기
  const { spotName, setSpotName, address, setAddress } = useSpotCreate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [storeNameError, setStoreNameError] = useState("");
  const scriptLoaded = useDaumPostcodeScript();
  const router = useRouter();

  const handlePostCodeComplete = (data) => {
    const fullAddress = data.address;
    const extraAddress = data.addressType === "R" ? data.bname : "";
    const finalAddress = extraAddress
      ? `${fullAddress} (${extraAddress})`
      : fullAddress;
    setAddress(finalAddress);
    setAddressError(""); // 주소 입력 시 에러 초기화
    setIsDialogOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called");

    if (!address || address.trim() === "") {
      setAddressError("가게 주소를 입력해주세요.");
      return;
    }

    console.log("submit Success");
  };

  const handleNextClick = () => {
    if (!address || address.trim() === "") {
      setAddressError("가게 주소를 입력해주세요.");
      return;
    }

    if (!spotName || spotName.trim() === "") {
      setStoreNameError("가게 이름을 입력해주세요.");
      return;
    }

    console.log("next Success - spotName:", spotName, "address:", address);
    router.push("/spot/create/question");
  };

  // ref 콜백: DOM 요소가 마운트될 때 우편번호 검색 UI 초기화
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

  return (
    <VStack height="100%">
      <ProgressBar currentStep={1} totalSteps={4} />

      <VStack
        padding="20px"
        className="create-info"
        justifyContent="space-between"
        render={<Form onSubmit={handleSubmit} />}
      >
        <VStack gap="$200">
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
                value={spotName}
                onChange={(e) => {
                  setSpotName(e.target.value);
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
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
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
          <Button size="lg" width="100%" onClick={handleNextClick}>
            다음으로
          </Button>
        </Flex>
      </VStack>
    </VStack>
  );
};
