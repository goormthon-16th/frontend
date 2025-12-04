# 1. 공통 베이스 이미지
FROM node:23-alpine AS base
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps

COPY package.json package-lock.json* ./

RUN npm install 

# 3. 빌드 단계
FROM base AS builder


COPY --from=deps /app/node_modules ./node_modules


COPY . .

RUN npm run build

FROM node:23-alpine AS runner
WORKDIR /app


ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

EXPOSE 3000


# 빌드된 앱 실행
CMD ["npm", "run", "start"]