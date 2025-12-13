<template>
  <div>
    <!-- Edit Post Section -->
    <section class="my-4">
      <div class="container" style="max-width: 900px">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h3 class="mb-4 fw-bold d-flex align-items-center">
              <i class="fa-solid fa-pen-to-square me-2"></i> Chỉnh sửa bài viết
            </h3>

            <form @submit.prevent="handleUpdatePost">
              <!-- Tên tác giả -->
              <div class="mb-4">
                <label for="postAuthor" class="form-label fw-semibold"
                  >Tên tác giả <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="postAuthor"
                  v-model="post.author"
                  placeholder="Nhập tên tác giả..."
                  required
                />
              </div>

              <!-- Tiêu đề bài viết -->
              <div class="mb-4">
                <label for="postTitle" class="form-label fw-semibold"
                  >Tiêu đề bài viết <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control form-control-lg"
                  id="postTitle"
                  v-model="post.title"
                  placeholder="Nhập tiêu đề bài viết..."
                  required
                />
              </div>

              <!-- Ảnh bài viết -->
              <div class="mb-4">
                <label for="postImage" class="form-label fw-semibold"
                  >Link ảnh bài viết</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="postImage"
                  v-model="post.image"
                  placeholder="https://images.unsplash.com/photo-..."
                />
                <small class="form-text text-muted"
                  >Dán link ảnh từ Unsplash hoặc nguồn khác</small
                >
              </div>
              <!-- Nội dung bài viết -->
              <div class="mb-4">
                <label for="postContent" class="form-label fw-semibold"
                  >Nội dung bài viết <span class="text-danger">*</span></label
                >
                <textarea
                  class="form-control"
                  id="postContent"
                  rows="12"
                  v-model="post.content"
                  placeholder="Viết nội dung bài viết của bạn ở đây..."
                  required
                ></textarea>
              </div>

              <hr class="my-4" />

              <!-- Action buttons -->
              <div class="d-flex justify-content-between align-items-center">
                <router-link
                  :to="`/post/${postId}`"
                  class="btn btn-outline-secondary"
                >
                  <i class="fa-solid fa-arrow-left me-1"></i> Quay lại
                </router-link>
                <button type="submit" class="btn btn-dark fw-semibold">
                  <i class="fa-solid fa-check me-1"></i> Cập nhật bài viết
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { toast } from "vue-sonner";

const route = useRoute();
const router = useRouter();
const postId = route.params.id;

const post = ref({
  title: "",
  author: "",
  content: "",
  image: "",
});

const fetchPost = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${postId}`);
    post.value = response.data;
  } catch (error) {
    console.error(error);
    toast.error("Lỗi khi tải bài viết!");
  }
};

const handleUpdatePost = async () => {
  try {
    await axios.put(`http://localhost:3000/posts/${postId}`, {
      ...post.value,
      updatedAt: new Date().toISOString(),
    });
    toast.success("Cập nhật bài viết thành công!");
    setTimeout(() => {
      router.push(`/post/${postId}`);
    }, 500);
  } catch (error) {
    console.error(error);
    toast.error("Lỗi khi cập nhật bài viết!");
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<style lang="scss" scoped></style>
