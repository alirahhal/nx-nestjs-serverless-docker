FROM node:14-alpine AS builder
WORKDIR "/app"
COPY . .
RUN npm install -g nx
RUN npm install
RUN nx build my-nest-app --prod

FROM node:14-alpine AS production
WORKDIR "/app"
COPY --from=builder /app/dist/apps/my-nest-app ./
RUN npm install
CMD node ./main.js