FROM node:alpine AS base
ARG PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS dependencies

COPY package.json packaje-lick.json ./
RUN npm ci

RUN npm run build

# Run
FROM base AS run

ENV NODE_ENV=production
ENV PORT=$PORT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE $PORT

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]