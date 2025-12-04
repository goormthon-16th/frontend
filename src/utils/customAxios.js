import axios from "axios";

const createCustomAxios = () => {
  const instance = axios.create({
    baseURL: "/api",
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.data.status === 500) {
        throw err;
      } else if (error.response) {
        let err = new Error(errorMessage || "알 수 없는 오류가 발생했습니다.");
        throw err;
      }

      throw Promise.reject(error);
    }
  );

  return instance;
};

const customAxios = createCustomAxios();

export { customAxios };
