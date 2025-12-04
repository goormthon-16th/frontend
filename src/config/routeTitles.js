/**
 * 라우터 경로별 헤더 제목 설정
 * 경로와 제목을 매핑하는 설정 파일
 */
export const ROUTE_TITLES = {
  "/spot/create/info": "게시글 입력",
  "/spot/create/question": "게시글 입력",
  "/spot/create": "게시글 입력",
};

/**
 * 현재 경로에 해당하는 제목을 반환하는 함수
 * @param {string} pathname - 현재 경로
 * @returns {string} 해당 경로의 제목 또는 기본 제목
 */
export const getRouteTitle = (pathname) => {
  // 정확한 경로 매칭
  if (ROUTE_TITLES[pathname]) {
    return ROUTE_TITLES[pathname];
  }

  // 부분 경로 매칭 (예: /spot/create/info/xxx -> /spot/create/info)
  const matchedPath = Object.keys(ROUTE_TITLES)
    .sort((a, b) => b.length - a.length) // 긴 경로부터 매칭
    .find((path) => pathname.startsWith(path));

  return matchedPath ? ROUTE_TITLES[matchedPath] : "header";
};
