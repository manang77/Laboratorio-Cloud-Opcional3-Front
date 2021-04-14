FROM node:12-alpine AS stage_0
RUN mkdir -p /usr/app
WORKDIR /usr/app

FROM stage_0 AS stage_1
ARG BASE_SERVER_URL
ENV BASE_SERVER_URL=$BASE_SERVER_URL
COPY ./ ./
RUN npm install
RUN npm run build

FROM stage_0 AS stage_1
COPY ./server ./
COPY --from=stage_1 /usr/app/dist ./public
RUN npm install --only=production

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT [ "node", "index.js" ]
