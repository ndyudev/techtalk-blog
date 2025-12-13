<template>
  <div>
    <!-- Create Post Section -->
    <section class="my-4">
      <div class="container" style="max-width: 900px">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h3 class="mb-4 fw-bold d-flex align-items-center">
              <i class="fa-solid fa-pen-to-square me-2"></i> Tạo bài viết mới
            </h3>

            <form @submit.prevent="handleCreatePost">
              <!-- Tên tác giả -->
              <div class="mb-4">
                <label for="postAuthor" class="form-label fw-semibold"
                  >Tên tác giả <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="postAuthor"
                  v-model="author"
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
                  v-model="title"
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
                  v-model="image"
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
                  v-model="content"
                  placeholder="Viết nội dung bài viết của bạn ở đây..."
                  required
                ></textarea>
              </div>

              <hr class="my-4" />

              <!-- Action buttons -->
              <div class="d-flex justify-content-between align-items-center">
                <router-link to="/" class="btn btn-outline-secondary">
                  <i class="fa-solid fa-arrow-left me-1"></i> Quay lại
                </router-link>
                <div>
                  <button type="button" class="btn btn-outline-dark me-2">
                    <i class="fa-solid fa-eye me-1"></i> Xem trước
                  </button>
                  <button type="submit" class="btn btn-dark">
                    <i class="fa-solid fa-paper-plane me-1"></i>
                    Đăng bài
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { postService } from "@/config/api-service";
import { toast } from "vue-sonner";

const router = useRouter();

const author = ref("");
const title = ref("");
const image = ref("");
const content = ref("");

const handleCreatePost = async () => {
  try {
    await postService.create({
      title: title.value,
      author_name: author.value,
      content: content.value,
      image:
        image.value ||
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    });

    toast.success("Đăng bài viết thành công!");

    // Reset form
    author.value = "";
    title.value = "";
    image.value = "";
    content.value = "";

    setTimeout(() => {
      router.push("/");
    }, 500);
  } catch (error) {
    console.error(error);
    toast.error("Lỗi khi đăng bài!");
  }
};
</script>

<style lang="scss" scoped></style>
