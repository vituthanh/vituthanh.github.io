---
title: 'Hướng dẫn chi tiết thiết lập gRPC-Web với Vue.js'
description: 'Hướng dẫn chi tiết thiết lập gRPC-Web với Vue.js'
pubDate: '2024 11 12'
heroImage: './images/ssh-key.jpg'
---
## Bước 1: Cài đặt protoc

- Truy cập https://github.com/protocolbuffers/protobuf/releases.
- Chọn phiên bản phù hợp và tải file protoc-*-win64.zip trong mục Assets.
- Giải nén file và thêm đường dẫn tới thư mục protoc-\*-win64\bin vào biến môi trường PATH.

## Bước 2: Cài đặt protoc-gen-grpc-web

- Công cụ protoc-gen-grpc-web dùng để tạo các file .js từ file .proto.

```
npm install -g protoc-gen-grpc-web
```

## Bước 3: Tạo ứng dụng Vue.js

- Khởi tạo một ứng dụng Vue.js mới:

```
vue create greeter-client
```

## Bước 4: Tạo client stubs

- Chạy lệnh protoc để tạo các file *_pb.js và *_grpc_web_pb.js từ file .proto:

```
protoc --proto_path=GrpcGreeter/GrpcGreeter/Protos --js_out=import_style=commonjs,binary:greeter-client/src/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:greeter-client/src/ greet.proto
```

- GrpcGreeter/GrpcGreeter/Protos: Thư mục chứa file .proto.
- greeter-client/src/: Thư mục đích của ứng dụng client để lưu các file sinh ra.
- greet.proto: File .proto chứa định nghĩa của service gRPC.

- Sau khi chạy lệnh thành công, bạn sẽ thấy các file greet_pb.js và greet_grpc_web_pb.js trong thư mục greeter-client/src/.

## Bước 5: Cài đặt các thư viện cần thiết cho gRPC-Web trong client

```
npm install grpc-web
npm install google-protobuf
```

## Bước 6: Triển khai code để gọi gRPC từ Vue.js

Trong một component Vue (ví dụ: App.vue), triển khai method để gọi gRPC:

```
<template>
  <div>
    <button @click="sayHello">Say Hello</button>
  </div>
</template>

<script>
import { HelloRequest } from "./greet_pb.js";
import { GreeterClient } from "./greet_grpc_web_pb.js";

export default {
  name: "App",
  methods: {
    sayHello: function () {
      const client = new GreeterClient("https://localhost:7255", null, null);

      const request = new HelloRequest();
      request.setName("Vue.js");

      client.sayHello(request, {}, (err, response) => {
        if (err) {
          console.error("gRPC Error:", err);
        } else {
          console.log("Server says:", response.getMessage());
        }
      });
    },
  },
};
</script>
```
## Trường hợp TypeScript
Bạn có thể tạo output TypeScript cho các file .proto khi sử dụng gRPC-Web với protoc. Để làm điều này, bạn cần plugin protoc-gen-ts từ gói ts-protoc-gen, giúp tạo mã TypeScript thay vì JavaScript thuần.
### Cài đặt ts-protoc-gen
Trước tiên, bạn cần cài đặt ts-protoc-gen
```
npm install -D ts-protoc-gen
```
### Sử dụng protoc để tạo file TypeScript
Sau khi cài đặt, bạn có thể sử dụng protoc để tạo file TypeScript bằng cách đặt đường dẫn tới ts-protoc-gen trong lệnh:
```
protoc --proto_path=GrpcGreeter/GrpcGreeter/Protos --js_out=import_style=commonjs,binary:greeter-client/src/ --grpc-web_out=import_style=typescript,mode=grpcwebtext:greeter-client/src/ --plugin=protoc-gen-ts=greeter-client/node_modules/.bin/protoc-gen-ts greet.proto
```
Sau khi chạy lệnh này, bạn sẽ thấy các file TypeScript được tạo trong thư mục greeter-client/src/, với các định nghĩa và kiểu dữ liệu tương ứng từ file .proto.
## Ghi chú bổ sung
- **CORS và gRPC-Web:** Nếu bạn gặp lỗi CORS, hãy đảm bảo server của bạn đã được cấu hình để chấp nhận các yêu cầu từ domain của client.
- **Cấu hình HTTPS:** Đảm bảo server đang chạy với HTTPS nếu sử dụng https://localhost:7255 trong Vue.js.
- **Kiểm tra SSL:** Nếu bạn dùng HTTPS với chứng chỉ tự ký, bạn có thể cần thêm chứng chỉ vào trình duyệt để tránh lỗi về bảo mật.

Sau khi hoàn tất các bước trên, bạn có thể chạy ứng dụng Vue.js để gửi request gRPC tới server!