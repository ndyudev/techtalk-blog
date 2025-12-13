<h1 align="center">TechTalk Blog - Nền tảng Blog Công Nghệ</h1>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  <a href="https://github.com/ndyudev/techtalk-blog" target="_blank">
    <img alt="GitHub" src="https://img.shields.io/badge/GitHub-ndyudev-black?logo=github" />
  </a>
</p>

<p align="center">
  <img alt="Vue.js" src="https://img.shields.io/badge/Vue.js-3.5.24-4FC08D?style=flat&logo=vue.js&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6.0.3-646CFF?style=flat&logo=vite&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat&logo=supabase&logoColor=white" />
  <img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?style=flat&logo=bootstrap&logoColor=white" />
</p>

> Nền tảng blog hiện đại với Vue 3 và Supabase: CRUD bài viết, xác thực người dùng, hệ thống bình luận, quản lý profile và phân quyền admin.

### 🏠 Trang chủ

- Đang phát triển

### ✨ Demo

- Đang phát triển

---

## Tính năng

- 🔐 **Xác thực người dùng** - Đăng ký và đăng nhập bằng email/password
- 📄 **Quản lý bài viết** - Tạo, sửa, xóa bài viết (chỉ Admin)
- 💬 **Hệ thống bình luận** - Thêm bình luận vào bài viết
- 👤 **Quản lý profile** - Chỉnh sửa thông tin cá nhân và đổi mật khẩu
- 🎨 **Thiết kế responsive** - Bootstrap 5 với mobile-first design
- 🚀 **Hiệu suất cao** - Vite và Vue 3 Composition API
- ☁️ **Database đám mây** - Supabase PostgreSQL backend
- 🔔 **Thông báo (toast)** - vue-sonner cho UX mượt mà

## Công nghệ

- **Frontend**: Vue 3.5.24 (Composition API với `<script setup>`)
- **Build Tool**: Vite 6.0.3
- **UI Framework**: Bootstrap 5.3.8
- **Database**: Supabase (PostgreSQL)
- **Routing**: Vue Router 4.6.3
- **Notifications**: vue-sonner 2.0.9
- **Icons**: Font Awesome 6
- **HTTP Client**: @supabase/supabase-js

---

## Yêu cầu

- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn
- Tài khoản Supabase (có gói miễn phí)

---

## Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/ndyudev/techtalk-blog.git
cd techtalk-blog
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Thiết lập Supabase

1. Tạo project mới tại [supabase.com](https://supabase.com)
2. Vào **SQL Editor** và chạy schema ở phần **Thiết lập Database** bên dưới
3. Vào **Settings** → **API** để lấy credentials

### 4. Cấu hình biến môi trường

Tạo file `.env.local` ở thư mục gốc:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Thay thế bằng URL và anon key thực tế từ Supabase dashboard.

---

## Chạy dự án (Dev)

```bash
npm run dev
```

Mở [http://localhost:5173](http://localhost:5173) trên trình duyệt.

---

## Thiết lập Database

Chạy SQL sau trong Supabase SQL Editor để tạo schema:

```sql
-- Tạo bảng Users
CREATE TABLE users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo bảng Posts
CREATE TABLE posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo bảng Comments
CREATE TABLE comments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bật Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Tạo policies (public access cho demo)
CREATE POLICY "Public Access Users" ON users FOR ALL USING (true);
CREATE POLICY "Public Access Posts" ON posts FOR ALL USING (true);
CREATE POLICY "Public Access Comments" ON comments FOR ALL USING (true);
```

### Tài khoản Admin mặc định

Sau khi chạy schema, bạn có thể đăng nhập với:

- **Email**: `admin@gmail.com`
- **Password**: `123456`

---

## Cấu trúc dự án

```
techtalk-blog/
├── src/
│   ├── assets/              # Tài nguyên tĩnh
│   ├── components/          # Component tái sử dụng
│   │   ├── Header.vue
│   │   └── Footer.vue
│   ├── config/              # File cấu hình
│   │   ├── supabase.js      # Supabase client
│   │   └── api-service.js   # Lớp trừu tượng API
│   ├── router/              # Cấu hình Vue Router
│   │   └── index.js
│   ├── views/               # Các trang
│   │   ├── Home.vue
│   │   ├── PostDetail.vue
│   │   ├── CreatePost.vue
│   │   ├── EditPost.vue
│   │   ├── Signin.vue
│   │   ├── Signup.vue
│   │   └── Profile.vue
│   ├── App.vue              # Component gốc
│   └── main.js              # Entry point
├── .env.local               # Biến môi trường
├── index.html
├── package.json
└── vite.config.js
```

---

## Phân quyền

- **Admin**: Tạo, sửa, xóa bài viết
- **User**: Xem bài viết, thêm bình luận, chỉnh sửa profile

---

## Scripts

```bash
# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## Build & Deploy

```bash
npm run build
npm run preview
```

Deploy tĩnh (Vercel/Netlify khuyến nghị):

```bash
# Deploy lên Vercel
npm install -g vercel
vercel
```

Nhớ cấu hình biến môi trường `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` trên nền tảng deploy.

---

## API Service Layer

File: `src/config/api-service.js`

### Users Service

| Method                 | Mô tả               |
| ---------------------- | ------------------- |
| `getAll()`             | Lấy tất cả users    |
| `getByEmail(email)`    | Tìm user theo email |
| `create(userData)`     | Tạo user mới        |
| `update(id, userData)` | Cập nhật user       |
| `delete(id)`           | Xóa user            |

### Posts Service

| Method                 | Mô tả                                           |
| ---------------------- | ----------------------------------------------- |
| `getAll()`             | Lấy tất cả posts (sắp xếp theo created_at desc) |
| `getById(id)`          | Lấy post theo ID                                |
| `create(postData)`     | Tạo post mới                                    |
| `update(id, postData)` | Cập nhật post (tự động set updated_at)          |
| `delete(id)`           | Xóa post                                        |

### Comments Service

| Method                | Mô tả                     |
| --------------------- | ------------------------- |
| `getByPostId(postId)` | Lấy comments theo post_id |
| `create(commentData)` | Tạo comment mới           |
| `delete(id)`          | Xóa comment               |

---

## Ghi chú kỹ thuật

- **Composition API**: Sử dụng `<script setup>` để code ngắn gọn hơn
- **Reactive State**: Dùng `ref()` cho reactive data, `onMounted()` cho lifecycle
- **LocalStorage**: Lưu session user với key `userLogin`
- **Toast Notifications**: vue-sonner để thông báo thành công/lỗi
- **Router Navigation**: Programmatic routing với `router.push()`
- **Supabase Client**: Tất cả API calls đi qua abstraction layer `api-service.js`

---

## Tác giả

**Duy Chau Nhat - ndyudev**

- GitHub: https://github.com/ndyudev

## License

MIT © 2025 ndyudev

---
