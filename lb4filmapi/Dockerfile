#Dockerfile app Express em modo Produção
FROM node:lts-alpine AS build
LABEL maintainer="Francisco Dias <a029185@umaia.pt>"

# Define o diretório de trabalho
WORKDIR /app
# Copia dependências e instala apenas produção
COPY package*.json ./
RUN npm ci
# Copia o restante do código
COPY . .
RUN npm run build

# Imagem final
FROM node:lts-alpine
# Define o diretório de trabalho
WORKDIR /app
# Define variáveis de ambiente
ENV NODE_ENV=production

# Copia os arquivos buildados da etapa anterior
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY ./public ./public



# Expõe a porta usada pela app
EXPOSE 3000

# Comando padrão de execução
CMD ["node", "dist/index.js"]
