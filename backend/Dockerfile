# ═══════════════════════════════════════════════════════════════════════════
# 🐳 DOCKERFILE - Backend API
# ═══════════════════════════════════════════════════════════════════════════
# Project: عتادنا (Atadna) B2B Marketplace
# Base: Node.js 22 Alpine
# ═══════════════════════════════════════════════════════════════════════════

FROM node:22-alpine AS base

# Development image
FROM base AS dev
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=development
EXPOSE 4000

CMD ["npm", "run", "dev"]

# Build image
FROM base AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apiuser

COPY --from=builder /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=builder --chown=apiuser:nodejs /app/dist ./dist

USER apiuser

EXPOSE 4000

CMD ["node", "dist/index.js"]
