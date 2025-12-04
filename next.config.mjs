// next.config.js 파일
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.pixabay.com"], // TODO: S3 도메인 추가
  },
};

export default nextConfig;
