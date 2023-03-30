# stage 1

FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN node_modules/.bin/ng build --prod

# stage 2

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist/projFrontend .

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# COPY --from=build /app/dist/beegbrain /usr/share/nginx/html