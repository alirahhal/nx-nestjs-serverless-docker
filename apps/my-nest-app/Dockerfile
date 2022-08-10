FROM node:14-alpine AS builder
WORKDIR "/app"
COPY . .
RUN npm install -g nx
# RUN npm ci
# RUN npm run build
# RUN npm prune --production
RUN npm install
RUN nx build my-nest-app --prod

FROM node:14-alpine AS production
WORKDIR "/app"
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist/apps/my-nest-app ./
# COPY --from=builder /app/node_modules ./node_modules
RUN npm install
CMD node ./main.js