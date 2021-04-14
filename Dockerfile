FROM node:12-alpine AS stage_0
RUN mkdir -p /usr/app
WORKDIR /usr/app

FROM stage_0 AS stage_1
ARG BASE_SERVER_URL
ENV BASE_SERVER_URL=$BASE_SERVER_URL
COPY ./ ./
RUN npm install
RUN npm run build

FROM stage_0 AS stage_2
ENV STATIC_FILES_PATH=./public
COPY --from=stage_1 /usr/app/dist $STATIC_FILES_PATH
