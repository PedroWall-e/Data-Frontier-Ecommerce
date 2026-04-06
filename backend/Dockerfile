FROM node:18-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .
RUN npm run build

# Remove os devDependencies (Mantém o Prisma Client gerado intacto)
RUN npm prune --production

# Stage de Producao Otimizado
FROM node:18-alpine

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

# Copiamos apenas os módulos limpos e o dist do builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
