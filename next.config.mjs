// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 여기에 Next.js가 이미지 최적화를 허용할 외부 도메인을 등록합니다.
    domains: [
      "cdn.pixabay.com", // (이전에 등록한 도메인)
      "example-bucket.s3.ap-northeast-2.amazonaws.com", // ★★★ 이 도메인을 추가해야 합니다. ★★★
      // API에서 이미지를 가져오는 다른 S3 버킷 URL이 있다면 모두 등록해야 합니다.
    ],
  },

  // 프록시 설정 (이전 단계에서 설정한 rewrites가 있다면 유지합니다)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://goormthon-1.goorm.training/api/:path*",
      },
    ];
  },
};

export default nextConfig;
