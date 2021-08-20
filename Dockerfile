FROM node:12.18.1 as develop-stage
ARG VUE_APP_SERVICES_HOST=/api
WORKDIR /code
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

FROM develop-stage as build-stage
# RUN npm run lint
RUN npm run build

FROM nginx as production-stage
RUN mkdir /code
COPY --from=build-stage /code/dist /usr/share/nginx/html
