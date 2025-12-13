<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { postService } from "@/config/api-service";
import { toast } from "vue-sonner";

const router = useRouter();
const posts = ref([]);

// Fetch posts from Supabase
const fetchPosts = async () => {
  try {
    posts.value = await postService.getAll();
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    toast.error("Không thể tải bài viết!");
  }
};

const handleCreatePost = () => {
  const userLogin = localStorage.getItem("userLogin");
  if (!userLogin) {
    router.push("/signin");
    return;
  }
  router.push("/create-post");
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div class="container">
    <!-- Post Header -->
    <div class="my-4 border-bottom pb-3">
      <h2 class="fw-bold">Bài viết mới nhất</h2>
      <p class="text-muted">Cập nhập thông tin mới nhất về công nghệ.</p>
      <div class="d-flex justify-content-between align-items-center my-3">
        <div class="input-group w-50">
          <span class="input-group-text bg-light border-0">
            <i class="fa-solid fa-magnifying-glass text-muted"></i>
          </span>
          <input
            type="text"
            class="form-control border-0 shadow-none"
            placeholder="Search articles..."
          />
        </div>
        <button
          @click="handleCreatePost"
          class="btn btn-dark fw-semibold d-flex align-items-center text-decoration-none"
        >
          <i class="fa-solid fa-plus me-2"></i> Create New Post
        </button>
      </div>
    </div>
    <!-- Body: Post List -->
    <div class="row">
      <!-- Post List -->
      <div class="col-sm-8">
        <!-- Posts Grid -->
        <div class="row g-4">
          <div class="col-sm-4 d-flex" v-for="post in posts" :key="post.id">
            <router-link
              :to="`/post/${post.id}`"
              class="text-decoration-none text-dark w-100"
            >
              <div class="card shadow-sm p-0 h-100">
                <div class="ratio ratio-16x9">
                  <img
                    :src="post.image"
                    class="card-img-top object-fit-cover"
                    :alt="post.title"
                  />
                </div>
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">
                    {{ post.title }}
                  </h5>
                  <p class="card-text text-muted flex-grow-1">
                    {{ post.content }}
                  </p>
                  <div
                    class="d-flex align-items-center border-top pt-2 mt-auto"
                  >
                    <i class="fa-solid fa-user text-muted me-2"></i>
                    <small class="text-muted">{{ post.author_name }}</small>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <!-- Pagination -->
        <!-- <nav aria-label="Page navigation" class="mt-4">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a
                class="page-link border-0 bg-transparent text-muted shadow-none"
                href="#"
                aria-label="Previous"
              >
                <i class="fa-solid fa-chevron-left"></i>
              </a>
            </li>
            <li class="page-item active">
              <a
                class="page-link rounded-circle text-white bg-dark border-0 shadow-none"
                href="#"
                >1</a
              >
            </li>
            <li class="page-item">
              <a
                class="page-link border-0 bg-transparent text-dark shadow-none"
                href="#"
                >2</a
              >
            </li>
            <li class="page-item">
              <a
                class="page-link border-0 bg-transparent text-dark shadow-none"
                href="#"
                >3</a
              >
            </li>
            <li class="page-item disabled">
              <span class="page-link border-0 bg-transparent text-muted"
                >...</span
              >
            </li>
            <li class="page-item">
              <a
                class="page-link border-0 bg-transparent text-dark shadow-none"
                href="#"
                >8</a
              >
            </li>
            <li class="page-item">
              <a
                class="page-link border-0 bg-transparent text-dark shadow-none"
                href="#"
                >9</a
              >
            </li>
            <li class="page-item">
              <a
                class="page-link border-0 bg-transparent text-dark shadow-none"
                href="#"
                >10</a
              >
            </li>
            <li class="page-item">
              <a
                class="page-link border-0 bg-transparent text-muted shadow-none"
                href="#"
                aria-label="Next"
              >
                <i class="fa-solid fa-chevron-right"></i>
              </a>
            </li>
          </ul>
        </nav> -->
      </div>
      <!-- Sidebar -->
      <div class="col-sm-4">
        <div class="bg-white border rounded p-0">
          <div class="p-3 pb-0">
            <h5 class="fw-bold mb-3">Bài viết nổi bật</h5>
          </div>
          <ul class="nav nav-tabs px-3" id="featuredPostTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active text-muted fw-semibold"
                id="day-tab"
                data-bs-toggle="tab"
                data-bs-target="#day"
                type="button"
                role="tab"
                aria-controls="day"
                aria-selected="true"
              >
                Ngày
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link text-muted fw-semibold"
                id="week-tab"
                data-bs-toggle="tab"
                data-bs-target="#week"
                type="button"
                role="tab"
                aria-controls="week"
                aria-selected="false"
              >
                Tuần
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link text-muted fw-semibold"
                id="month-tab"
                data-bs-toggle="tab"
                data-bs-target="#month"
                type="button"
                role="tab"
                aria-controls="month"
                aria-selected="false"
              >
                Tháng
              </button>
            </li>
          </ul>
          <div class="tab-content p-0" id="featuredPostTabContent">
            <!-- Ngày -->
            <div
              class="tab-pane fade show active"
              id="day"
              role="tabpanel"
              aria-labelledby="day-tab"
            >
              <ul class="list-group list-group-flush">
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/1"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >JavaScript Là Gì? 10 Năm Kinh Nghiệm Tóm Gọn Trong 3
                    Phút</router-link
                  >
                  <small class="text-muted d-block">01/01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/2"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Cách thống trị React, Angular, NodeJS,… để chiến tốt mọi dự
                    án</router-link
                  >
                  <small class="text-muted d-block">01/01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/3"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Tất Tần Tật Về Git Flow Trong 3 Phút – Tự Học Siêu
                    Tốc</router-link
                  >
                  <small class="text-muted d-block">01/01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/4"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Học Vue.js Cơ Bản Trong 7 Ngày</router-link
                  >
                  <small class="text-muted d-block">01/01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/5"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Tổng Quan Về Node.js – Hướng Dẫn Cho Người Mới</router-link
                  >
                  <small class="text-muted d-block">01/01/2023</small>
                </li>
              </ul>
            </div>
            <!-- Tuần -->
            <div
              class="tab-pane fade"
              id="week"
              role="tabpanel"
              aria-labelledby="week-tab"
            >
              <ul class="list-group list-group-flush">
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/1"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >JavaScript Là Gì? 10 Năm Kinh Nghiệm Tóm Gọn Trong 3
                    Phút</router-link
                  >
                  <small class="text-muted d-block">01/01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/2"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Cách thống trị React, Angular, NodeJS,… để chiến tốt mọi dự
                    án</router-link
                  >
                  <small class="text-muted d-block">01/01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/3"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Tất Tần Tật Về Git Flow Trong 3 Phút – Tự Học Siêu
                    Tốc</router-link
                  >
                  <small class="text-muted d-block">01/01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/4"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Học Vue.js Cơ Bản Trong 7 Ngày</router-link
                  >
                  <small class="text-muted d-block">01/01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/5"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Tổng Quan Về Node.js – Hướng Dẫn Cho Người Mới</router-link
                  >
                  <small class="text-muted d-block">01/01/2023</small>
                </li>
              </ul>
            </div>
            <!-- Tháng -->
            <div
              class="tab-pane fade"
              id="month"
              role="tabpanel"
              aria-labelledby="month-tab"
            >
              <ul class="list-group list-group-flush">
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/6"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Hướng Dẫn Sử Dụng Docker Cho Người Mới</router-link
                  >
                  <small class="text-muted d-block">01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/7"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Tìm Hiểu Về CI/CD Pipeline</router-link
                  >
                  <small class="text-muted d-block">01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/8"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Cách Tạo Blog Cá Nhân Với Gatsby.js</router-link
                  >
                  <small class="text-muted d-block">01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/9"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Tìm Hiểu Về WebSocket</router-link
                  >
                  <small class="text-muted d-block">01/2023</small>
                </li>
                <li class="list-group-item py-2">
                  <router-link
                    to="/post/10"
                    class="d-block text-decoration-none text-dark fw-semibold text-truncate"
                    >Học Lập Trình Python Từ Cơ Bản</router-link
                  >
                  <small class="text-muted d-block">01/2023</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
