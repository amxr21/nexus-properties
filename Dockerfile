# syntax=docker/dockerfile:1

# ─── Build stage ────────────────────────────────────────────────────────────
# Produces the static export in /app/out. Next.js writes it there because
# next.config.ts sets output: 'export'.
FROM node:22-alpine AS builder

WORKDIR /app

# NEXT_PUBLIC_* is inlined into the bundle at build time, so it must be
# present as a build arg — a runtime env var would be ignored and the site
# would ship with no CMS URL.
ARG NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL

RUN corepack enable && corepack prepare pnpm@11.5.0 --activate

# Copy manifests first so the dependency layer is cached across source-only
# changes — this is most of the build time on a 1 vCPU box.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Prerendering fetches every project/service/blog slug from Strapi, so this
# step needs network access and fails loudly if the CMS is unreachable.
RUN pnpm build

# ─── Serve stage ────────────────────────────────────────────────────────────
FROM nginx:alpine AS runner

COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1
