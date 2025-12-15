# Pharmacy Management System – Server Setup

## 1️⃣ Clone the projects

```bash
# Frontend
git clone <FRONTEND_REPO_URL> /var/www/pharmacy/frontend

# Backend
git clone <BACKEND_REPO_URL> /var/www/pharmacy/backend
```

## 2️⃣ Install dependencies

```bash
# Backend
cd /var/www/pharmacy/backend
npm ci

# Frontend
cd /var/www/pharmacy/frontend
npm ci
```

## 3️⃣ Build projects

```bash
# Backend
npm run build

# Frontend
npm run build
```

- Frontend build will create a `dist` folder.

## 4️⃣ Setup PM2 for backend

```bash
cd /var/www/pharmacy/backend
pm2 start dist/main.js --name pharmacy-backend --update-env
pm2 save
pm2 startup
```

## 5️⃣ Configure Nginx

- Frontend: serve `/var/www/pharmacy/frontend/dist`  
- Backend: proxy `/api/` to `http://127.0.0.1:3000`  

Example config: `/etc/nginx/conf.d/pharmacy.conf`

```nginx
server {
    listen 80 default_server;
    server_name _;

    root /var/www/pharmacy/frontend/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Test & reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 6️⃣ Environment variables

- Backend: create `.env` in `/var/www/pharmacy/backend`  

Example `.env`:

```
PORT=3000
DATABASE_URL=postgres://user:pass@host:port/dbname
```

- Frontend: set `VITE_BACKEND_URL` when building:

```bash
VITE_BACKEND_URL="http://<SERVER_IP>/api" npm run build
```

## 7️⃣ Optional: Enable GitHub Actions deployment

- Add secrets: `EC2_HOST`, `EC2_USER`, `EC2_KEY`  
- Push to `main` → backend/frontend auto-deploys
