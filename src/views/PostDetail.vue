<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { toast } from "vue-sonner";

const route = useRoute();
const router = useRouter();
const postId = route.params.id;
const post = ref({});
const isAdmin = ref(false);
const comments = ref([]);
const newComment = ref({
  author: "",
  content: "",
});

const checkAdmin = () => {
  const userLogin = localStorage.getItem("userLogin");
  if (userLogin) {
    const user = JSON.parse(userLogin);
    isAdmin.value = user.role === "admin";
  }
};

const fetchPost = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${postId}`);
    post.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchComments = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/comments?postId=${postId}`
    );
    comments.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const handleAddComment = async () => {
  if (!newComment.value.content) {
    toast.error("Vui lòng điền nội dung bình luận");
    return;
  }

  const userLogin = localStorage.getItem("userLogin");
  if (!userLogin) {
    router.push("/signin");
    return;
  }

  // Nếu không nhập tên thì lấy từ localStorage
  let authorName = newComment.value.author;
  if (!authorName) {
    const user = JSON.parse(userLogin);
    authorName = user.name;
  }

  try {
    await axios.post("http://localhost:3000/comments", {
      postId: postId,
      author: authorName,
      content: newComment.value.content,
      createdAt: new Date().toISOString(),
    });
    toast.success("Thêm bình luận thành công!");
    newComment.value.author = "";
    newComment.value.content = "";
    fetchComments();
  } catch (error) {
    console.error(error);
    toast.error("Lỗi khi thêm bình luận!");
  }
};

const handleDelete = async () => {
  try {
    await axios.delete(`http://localhost:3000/posts/${postId}`);
    toast.success("Xóa thành công!");
    setTimeout(() => {
      router.push("/");
    }, 500);
  } catch (error) {
    console.error("Lỗi", error);
    toast.error("Lỗi xóa bài viết");
  }
};

const handleEdit = () => {
  router.push(`/edit-post/${postId}`);
};

onMounted(() => {
  checkAdmin();
  fetchPost();
  fetchComments();
});
</script>

<template>
  <div class="container">
    <!-- Post Detail -->
    <section class="my-4">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-3">
        <ol class="breadcrumb small">
          <li class="breadcrumb-item">
            <router-link to="/" class="text-decoration-none">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/" class="text-decoration-none">Blog</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ post.title }}
          </li>
        </ol>
      </nav>

      <div class="row g-4">
        <!-- Article -->
        <div class="col-sm-8">
          <h2 class="fw-bold">
            {{ post.title }}
          </h2>
          <p class="text-muted small mb-4">
            By {{ post.author }} • {{ post.createdAt }}
          </p>

          <div class="ratio ratio-16x9 mb-4">
            <img
              :src="post.image"
              class="img-fluid rounded shadow-sm object-fit-cover"
              alt="Post image"
            />
          </div>

          <p>
            {{ post.content }}
          </p>

          <!-- Nút sửa và xóa -->
          <div v-if="isAdmin" class="d-flex gap-2 mt-4">
            <button @click="handleEdit" class="btn btn-outline-primary">
              <i class="fa-solid fa-pen me-1"></i> Sửa bài viết
            </button>
            <button @click="handleDelete" class="btn btn-outline-danger">
              <i class="fa-solid fa-trash me-1"></i> Xóa bài viết
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-sm-4">
          <!-- Comments -->
          <div class="card mb-4 p-0">
            <div class="card-body">
              <h6 class="fw-bold mb-3">Comments ({{ comments.length }})</h6>

              <div
                v-if="comments.length === 0"
                class="text-muted text-center py-3"
              >
                Chưa có bình luận nào
              </div>

              <div
                v-for="comment in comments"
                :key="comment.id"
                class="d-flex mb-3"
              >
                <div class="me-3 d-flex align-items-start">
                  <i class="fa-regular fa-user-circle fa-2x text-muted"></i>
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between">
                    <strong>{{ comment.author }}</strong>
                    <small class="text-muted">{{ comment.createdAt }}</small>
                  </div>
                  <small class="text-muted">{{ comment.content }}</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Leave a Comment -->
          <div class="card p-4">
            <div class="card-body p-0">
              <h6 class="fw-bold mb-3">Leave a Comment</h6>
              <div class="mb-3">
                <input
                  v-model="newComment.author"
                  type="text"
                  class="form-control mb-2"
                  placeholder="Tên của bạn..."
                />
                <textarea
                  v-model="newComment.content"
                  class="form-control"
                  rows="4"
                  placeholder="Nội dung bình luận..."
                  required
                ></textarea>
              </div>
              <button
                @click="handleAddComment"
                class="btn btn-dark w-100 fw-semibold"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
