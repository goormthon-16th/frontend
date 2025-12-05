// src/components/mockCanvasData.js

const y_position = 1200;

// [_, _, _, _, fontSize, fontColor, x, y, maxWidth, textAlign, fontWeight, lineHeightFactor]
const TEXT_ATTRIBUTE_COMMON = [
  [0, 0, 0, 0, 70, "#FFFFFF", 300, y_position - 300, 6000, "left", "bold", 1.2],
  [0, 0, 0, 0, 30, "#FFFFFF", 300, y_position, 4800, "left", "normal", 1.5],
];

export const mockCanvasSlides = [
  {
    id: 1,
    IMAGE_URL:
      "https://cdn.pixabay.com/photo/2019/06/11/07/36/shiroyama-hiji-peak-4266254_1280.jpg",
    TEXT: [
      `도시를 떠나,
      우리가 제주 빈티지를 택한 이유`,
      "패션업계에서의 경험에 제주만의 느린 감성을 더하고 싶어 남편과 함께 이곳에 내려와 빈티지 편집숍을 열게 되었어요. 도시에서 전하지 못했던 그 분위기가 천천히 모여 지금의 가게가 되었습니다.",
    ],
    TEXT_ATTRIBUTE: TEXT_ATTRIBUTE_COMMON,
  },
  {
    id: 2,
    IMAGE_URL: "https://cdn.pixabay.com/photo/2016/07/20/08/14/jeju-1529847_1280.jpg",
    TEXT: [
      `손님 덕분에 더 특별해진 
      우리 가게의 이야기`,
      `신혼 때 남편과 말다툼을 했는데, 손님들이 다정하게 말려주셔서 금방 웃음을 되찾았던 기억이 있어요. 그 뒤로 손님들에게 더 잘하고 싶다는 마음이 생겼죠. 반나절 동안 옷을 고르다 함께 식사까지 했던 손님은 지금은 취향을 나누는 친구가 되었습니다.
      `,
    ],
    TEXT_ATTRIBUTE: TEXT_ATTRIBUTE_COMMON,
  },
  {
    id: 3,
    IMAGE_URL:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=2600&h=3270",
    TEXT: [
      `잠시 머물러도
      마음이 쉬어가는 공간`,
      `저희 가게가 손님들에게 편하게 느껴지는 공간이었으면 좋겠어요.
      옷을 고르는 시간이 단순한 쇼핑이 아니라, 제주의 따뜻한 여유를 조금이라도 담아가는 경험이 되길 바랍니다.`,
    ],
    TEXT_ATTRIBUTE: TEXT_ATTRIBUTE_COMMON,
  },
];
