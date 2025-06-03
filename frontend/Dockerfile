# Étape de build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape de production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm install --production
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY next.config.js ./
EXPOSE 3000
CMD ["npm", "start"]
