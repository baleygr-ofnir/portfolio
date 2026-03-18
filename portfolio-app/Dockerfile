FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# 1. DECLARE THE ARG FIRST
ARG VITE_API_BASE_URL
# 2. MAP IT TO AN ENV SO VITE SEES IT
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
# 3. NOW BUILD - Vite will now find the variable and swap "5000" for the new port
RUN pnpm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# ... rest of nginx config
