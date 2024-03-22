# Stage 1: Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* ./
RUN npm install --frozen-lockfile

# Stage 2: Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
# Set the environment to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN npm run build

# Stage 3: Production environment
FROM node:alpine AS runner
WORKDIR /app

# Copy the build output to reduce the image size
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.local ./.env.local

# Expose the port the app runs on
EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Telemetry is disabled.
ENV NEXT_TELEMETRY_DISABLED 1

# Use the "start" script for production
CMD ["npm", "run", "start"]
