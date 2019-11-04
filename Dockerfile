FROM node:13-alpine AS build

RUN apk add git
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM node:12.8-alpine
RUN apk add git
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY --from=build /app/dist ./dist

CMD ["npm", "run", "start"]
