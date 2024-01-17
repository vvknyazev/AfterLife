FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY devops/volumes/env/.env_dev .env
RUN npm install
COPY ./ ./
#RUN if [ ! -f /app/.env ]; then cp /app/devops/volumes/env/.env_dev /app/.env; fi
#CMD ["npm", "run", "build"]
RUN npm run build

ENV TIMEZONE Europe/Kiev

RUN	apk update && \
	apk upgrade && \
	apk add --update openssl nginx mc && \
	apk add --update tzdata && \
	cp /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && \
	echo "${TIMEZONE}" > /etc/timezone && \
	mkdir /etc/nginx/certificates && \
	openssl req \
		-x509 \
		-newkey rsa:2048 \
		-keyout /etc/nginx/certificates/key.pem \
		-out /etc/nginx/certificates/cert.pem \
		-days 365 \
		-nodes \
		-subj /CN=localhost && \
	mkdir /www && \
	apk del tzdata && \
	rm -rf /var/cache/apk/*

RUN cp /app/devops/volumes/nginx/nginx.conf /etc/nginx/nginx.conf && \
    cp /app/devops/volumes/nginx/common.conf /etc/nginx/common.conf && \
    mkdir /etc/nginx/conf.d && \
    cp /app/devops/volumes/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf && \
    cp /app/devops/volumes/nginx/conf.d/ssl.conf /etc/nginx/conf.d/ssl.conf

RUN mkdir /usr/share/nginx/html && cp -R /app/build/* /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html/media
RUN chmod +x /var/lib/nginx -R
RUN chown -R nginx:nginx /var/lib/nginx

# Expose volumes
VOLUME ["/etc/nginx/conf.d", "/var/log/nginx", "/www"]

# Expose ports
EXPOSE 80 443

# Entry point
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]