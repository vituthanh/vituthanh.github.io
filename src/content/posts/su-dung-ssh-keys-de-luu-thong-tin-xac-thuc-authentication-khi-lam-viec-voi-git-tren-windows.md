---
title: 'Sử dụng SSH Keys để lưu thông tin xác thực (authentication) khi làm việc với Git trên Windows'
description: 'Sử dụng SSH Keys để lưu thông tin xác thực (authentication) khi làm việc với Git trên Windows'
pubDate: '2024 11 06'
heroImage: './images/ssh-key.jpg'
---

Sử dụng SSH Keys để lưu thông tin xác thực khi làm việc với Git trên Windows giúp bạn kết nối với các kho Git mà không cần nhập lại mật khẩu mỗi lần. Dưới đây là các bước để thiết lập SSH Keys trên Windows cho Git:

## 1. Cài đặt Git Bash (nếu chưa có)

Tải và cài đặt Git Bash từ trang chủ của Git [tại đây](https://git-scm.com/download/win).

## 2. Tạo SSH Key

Mở Git Bash và chạy lệnh sau để tạo một SSH Key mới:

```
ssh-keygen -t rsa -b 4096 -C "youremail@example.com"
```

 - Thay [youremail@example.com](mailto:youremail@example.com) bằng email
   mà bạn đã dùng cho tài khoản GitHub, GitLab, hoặc các dịch vụ Git
   khác.
 - Khi được hỏi về vị trí lưu file, bạn có thể nhấn Enter để lưu ở đường
   dẫn mặc định (c:/Users/youruser/.ssh/id_rsa).
 - Bạn có thể đặt passphrase cho key, hoặc nhấn Enter nếu không muốn
   đặt.

## 3. Thêm SSH Key vào SSH agent

Để SSH agent quản lý SSH key, khởi động agent bằng lệnh sau:

```
eval $(ssh-agent -s)
```

Sau đó, thêm SSH key vào agent:

```
ssh-add ~/.ssh/id_rsa
```

## 4. Sao chép Public Key

Để kết nối với dịch vụ Git (như GitHub hoặc GitLab), bạn cần sao chép SSH public key:

```
cat ~/.ssh/id_rsa.pub
```

Sau đó, sao chép toàn bộ nội dung của key hiển thị ra.

## 5. Thêm SSH Key vào tài khoản Git

 - GitHub: Vào Settings > SSH and GPG keys > New SSH Key và dán SSH Key
   của bạn vào.
 - GitLab: Vào Profile Settings > SSH Keys > Add SSH Key.

## 6. Cấu hình Git để sử dụng SSH

Đảm bảo Git sẽ sử dụng SSH khi thực hiện các thao tác như clone, pull, hoặc push. Ví dụ, khi bạn clone một repository, thay vì dùng URL HTTPS, hãy dùng URL SSH như sau:

```
git clone git@github.com:username/repository.git
```

Sau khi thực hiện các bước trên, bạn sẽ không cần nhập mật khẩu mỗi lần push, pull hay clone từ các dịch vụ Git nữa, giúp tiết kiệm thời gian và bảo mật tốt hơn.