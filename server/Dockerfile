FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY devops/volumes/env/.env_dev .env
RUN npm i
COPY ./ ./
#RUN if [ ! -f /app/.env ]; then cp /app/devops/volumes/env/.env_prod /app/.env; fi
CMD ["npm", "run", "dev"]