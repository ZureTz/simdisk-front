# simdisk-front
Frontend for [simdisk](https://github.com/ZureTz/simdisk)

## Run development server

```bash
bun dev
``` 

## Build for production

```bash
bun run build
```

And then copy the `dist` folder to your server.

If you are using nginx, you can copy the `dist/*` files to your nginx root directory (for example `/data/www`).
After that, set the nginx configuration to serve the static files from that directory.
Also, set reverse proxy to your simdisk backend server (Default: `http://localhost:8080`).


An expample nginx configuration file is provided below:
```nginx

user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;

    server {
	      listen 5173;

	      location /api/ {
	      	  client_max_body_size 50G;
	      	  proxy_pass http://localhost:8080;
	      }

	      location / {
	      	  root /data/www;
	      }
    }
}

```