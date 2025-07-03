FROM node:21-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Install necessary packages including wget for Doppler CLI and gnupg for NPM signature verification
RUN apk add --no-cache libc6-compat wget curl gnupg
WORKDIR /app

# Add NPM token argument
ARG NPM_TOKEN

# Copy package files
COPY .npmrc ./
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps && npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
ARG NPM_TOKEN
ARG DOPPLER_TOKEN
ARG DOPPLER_PROJECT
ARG DOPPLER_CONFIG

ENV DOPPLER_TOKEN=${DOPPLER_TOKEN}
ENV DOPPLER_PROJECT=${DOPPLER_PROJECT}
ENV DOPPLER_CONFIG=${DOPPLER_CONFIG}

COPY .npmrc ./

# Copy package files and install ALL dependencies (including dev) for building
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps && npm cache clean --force

# Copy source code
COPY . .

RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

# Build the application
RUN doppler run --token="${DOPPLER_TOKEN}" --project="${DOPPLER_PROJECT}" --config="${DOPPLER_CONFIG}" -- npm run build

# Production image, copy all the files and run the app
FROM nginx:alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]