# Dockerfile para o esquema de DB MySQL em modo Produção
FROM mysql:8.0
LABEL maintainer="Francisco Dias <a029185@umaia.pt>"


# Copia o script SQL para inicializar a base de dados
COPY databaseSchema.sql /docker-entrypoint-initdb.d

# Expõe a porta usada pela app
EXPOSE 3306

