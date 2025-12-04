"use client";

import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Field,
  Form,
  Text,
  TextInput,
  VStack,
} from "@vapor-ui/core";
import { useDaumPostcodeScript } from "@/utils/usePostCodeScript";

export const CreateInfoTemplate = () => {
  const [address, setAddress] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const scriptLoaded = useDaumPostcodeScript();

  const handlePostCodeComplete = useCallback((data) => {
    const fullAddress = data.address;
    const extraAddress = data.addressType === "R" ? data.bname : "";
    const finalAddress = extraAddress
      ? `${fullAddress} (${extraAddress})`
      : fullAddress;
    setAddress(finalAddress);
    setIsDialogOpen(false);
  }, []);

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
    <div>
      <VStack
        gap="$250"
        padding="$300"
        className="create-info"
        render={<Form onSubmit={(event) => event.preventDefault()} />}
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
              <TextInput id="store-name" size="lg" required type="text" />
            </Box>
            <Field.Error match="valueMissing">
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
                required
                size="lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onClick={() => setIsDialogOpen(true)}
                placeholder="우편번호 검색을 눌러주세요"
                readOnly
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
            <Field.Error match="valueMissing">
              가게 주소를 입력해주세요.
            </Field.Error>
          </Field.Root>
        </VStack>
        <VStack gap="$100">
          <Button size="lg">다음</Button>
        </VStack>
      </VStack>
    </div>
  );
};
