FROM node:18-alpine AS build

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install

COPY . .

ENV NITRO_PRESET static
RUN npm run generate

FROM nginx:alpine

COPY --from=build /app/.output/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
