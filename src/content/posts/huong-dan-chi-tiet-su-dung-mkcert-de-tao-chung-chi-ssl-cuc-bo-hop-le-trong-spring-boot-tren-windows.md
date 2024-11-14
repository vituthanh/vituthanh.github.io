---
title: 'Hướng dẫn chi tiết sử dụng mkcert để tạo chứng chỉ SSL cục bộ hợp lệ trong Spring Boot trên Windows'
description: 'Hướng dẫn chi tiết sử dụng mkcert để tạo chứng chỉ SSL cục bộ hợp lệ trong Spring Boot trên Windows'
pubDate: '2024 11 14'
heroImage: './images/ssh-key.jpg'
---
mkcert là một công cụ tạo chứng chỉ SSL hợp lệ trên máy cục bộ và được trình duyệt tin cậy mà không cần thêm chứng chỉ ngoại lệ.

## 1. Cài đặt mkcert:
Tải mkcert tại https://github.com/FiloSottile/mkcert/releases, chọn tải mkcert-v*-windows-amd64.exe ở mục *Assets*. Sau khi tải xong, đổi tên tệp mkcert-v*-windows-amd64.exe thành mkcert.exe, rồi chạy lệnh sau để thiết lập mkcert:
```
mkcert -install
```
## 2. Tạo chứng chỉ cho localhost:
Chạy lệnh sau để tạo chứng chỉ cho localhost:
```
mkcert -key-file key.pem -cert-file cert.pem localhost
```
## 3. Cài đặt OpenSSL:
Tải OpenSSl tại https://slproweb.com/products/Win32OpenSSL.html, chọn tải Win64 OpenSSL v3.4.0 Light. Sau khi tải xong, cài đặt OpenSSL và thiết lập biến PATH cho thư mục OpenSSL-Win64\bin.
## 4. Cấu hình SSL trong Spring Boot:
Để Spring Boot sử dụng chứng chỉ của mkcert, trước tiên bạn cần chuyển đổi tệp .pem sang định dạng .p12 bằng OpenSSL như sau:
```
openssl pkcs12 -export -in cert.pem -inkey key.pem -out keystore.p12 -name "localhost" -CAfile rootCA.pem -caname root
```
- Để trống khi xuất hiện Enter Export Password và Verifying - Enter Export Password.
- Sau đó chép tệp keystore.p12 vào thư mục resources của dự án.
- Thêm cấu hình SSL vào application.properties.
```
server.port=8443
server.ssl.enabled=true
server.ssl.key-store-type=PKCS12
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=your_password
server.ssl.key-alias=localhost
```
## 5. Chạy ứng dụng và truy cập HTTPS:
Khởi chạy Spring Boot trong Visual Studio Code và truy cập https://localhost:8443. Trình duyệt sẽ chấp nhận chứng chỉ này mà không có cảnh báo bảo mật.

Với các cách này, bạn có thể phát triển ứng dụng Spring Boot trên HTTPS miễn phí trong Visual Studio Code mà không cần mua chứng chỉ SSL.