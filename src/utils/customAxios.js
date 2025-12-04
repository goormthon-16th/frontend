import axios from "axios";

const ADDRESS = import.meta.env.VITE_SERVER_URL;

const createCustomAxios = () => {
  const instance = axios.create({
    baseURL: `${ADDRESS}`,
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error.response.data);

      if (error.response && error.response.data.status === 500) {
        // 서버 에러 (500) 처리
        let err = new Error(error.response.data.message);
        err.name = error.response.data.code;
        throw err;
      } else if (error.response) {
        // 기타 일반 에러 처리 (4xx 클라이언트 에러 등)
        const errorMessage = error.response.data.message;
        if (errorMessage) {
          console.error(errorMessage);
        }
        let err = new Error(errorMessage || "알 수 없는 오류가 발생했습니다.");
        err.name = "GENERAL";
        throw err;
      }

      // 네트워크 오류 또는 기타 Axios 오류 발생 시
      throw Promise.reject(error);
    }
  );

  return instance;
};

const customAxios = createCustomAxios();

export { customAxios };
