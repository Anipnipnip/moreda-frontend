# Gunakan image Nginx
FROM nginx:alpine

# Salin semua file statis ke dalam direktori yang digunakan oleh Nginx
COPY . /usr/share/nginx/html

# Expose port 8080 untuk Cloud Run
EXPOSE 8080

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
