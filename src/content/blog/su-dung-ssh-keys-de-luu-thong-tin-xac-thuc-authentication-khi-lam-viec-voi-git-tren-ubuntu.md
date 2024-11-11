---
title: 'Sử dụng SSH Keys để lưu thông tin xác thực (authentication) khi làm việc với Git trên Ubuntu'
description: 'Sử dụng SSH Keys để lưu thông tin xác thực (authentication) khi làm việc với Git trên Ubuntu'
pubDate: '2024 11 06'
heroImage: './images/ssh-key.jpg'
---

Sử dụng SSH keys là phương pháp bảo mật và tiện lợi hơn để lưu thông tin xác thực cho Git mà không cần phải nhập mật khẩu mỗi khi thực hiện thao tác git push hoặc git pull.

## 1. Tạo SSH Key (nếu bạn chưa có)

Chạy lệnh dưới đây để tạo một SSH key mới:

<pre>ssh-keygen -t rsa -b 4096 -C "your_email@example.com"</pre>

Trong quá trình tạo, bạn sẽ được yêu cầu nhập đường dẫn lưu key và passphrase (có thể để trống nếu không muốn đặt mật khẩu cho SSH key).

## 2. Thêm SSH Key vào SSH agent

Chạy các lệnh dưới đây để khởi động SSH agent và thêm SSH key vào:

<pre>eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa</pre>

## 3. Thêm SSH Key vào GitHub

Chạy lệnh dưới đây để sao chép nội dung của SSH public key:

<pre>cat ~/.ssh/id_rsa.pub</pre>

Truy cập vào GitHub và thêm SSH key:

- Vào Settings > SSH and GPG keys > New SSH key.

- Điền tùy ý vào Title

- Chọn Authentication Key ở Key type

- Điền Key là kết quả sau khi chạy lệnh cat ~/.ssh/id_rsa.pub

## 4. Cấu hình Git để sử dụng SSH

Chạy lệnh dưới đây để thay đổi URL của remote repository từ HTTPS sang SSH:

<pre>git remote set-url origin git@github.com:username/repository.git</pre>

## 5. Xác nhận kết nối SSH

Chạy lệnh dưới đây để kiểm tra kết nối SSH với GitHub:

<pre>ssh -T git@github.com</pre>

Nếu lần đầu tiên kết nối đến GitHub qua SSH sẽ xuất hiện thông báo xác nhận danh tính như bên dưới

<pre>The authenticity of host 'github.com (your_ip)' can't be established.
ECDSA key fingerprint is SHA256:your_key.
Are you sure you want to continue connecting (yes/no/[fingerprint])?</pre>

Điền **yes** để tiếp tục kết nối

Nếu thành công, bạn sẽ nhận được thông báo:

<pre>Hi username! You've successfully authenticated, but GitHub does not provide shell access.</pre>