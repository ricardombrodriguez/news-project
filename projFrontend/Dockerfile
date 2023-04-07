# stage 1

FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN node_modules/.bin/ng build --prod --output-path=/app/dist

EXPOSE 80


# stage 2

FROM nginx:alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
