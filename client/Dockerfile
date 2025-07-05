FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm

EXPOSE 3000

CMD ["pnpm", "dev"]
