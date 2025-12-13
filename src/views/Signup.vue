<template>
  <div>
    <div
      class="container d-flex align-items-center justify-content-center mt-5"
    >
      <div class="col-12" style="max-width: 480px">
        <div class="card shadow-sm mb-3">
          <div class="card-body p-4">
            <h4
              class="text-center fw-bold mb-2 d-flex align-items-center justify-content-center"
            >
              <i class="fa-solid fa-user-plus me-2"></i> Đăng ký
            </h4>
            <p class="text-secondary text-center mb-4">
              Đăng ký để tham gia TechTalk Blog.
            </p>

            <form class="text-start" @submit.prevent="handleSignup">
              <div class="mb-3">
                <label class="form-label fw-semibold">Email</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Tên đầy đủ</label>
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Mật khẩu</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div
                class="text-secondary small mb-3 text-center"
                style="font-size: 12px"
              >
                Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách dữ liệu
                và Chính sách cookie của chúng tôi.
              </div>

              <button type="submit" class="btn btn-dark fw-semibold w-100">
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        <div class="border p-4 rounded-1 text-center">
          <span>Bạn có tài khoản?</span>
          <router-link
            to="/signin"
            class="text-primary text-decoration-none fw-bold ms-1"
            >Đăng nhập</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { toast } from "vue-sonner";

const name = ref("");
const email = ref("");
const password = ref("");

const handleSignup = async () => {
  if (!name.value || !email.value || !password.value) {
    toast.error("Điền đầy đủ thông tin!");
    return;
  }

  try {
    const checkEmail = await axios.get(
      `http://localhost:3000/users?email=${email.value}`
    );
    if (checkEmail.data.length > 0) {
      toast.error("Email tồn tại");
      return;
    }

    // Tạo user mới
    await axios.post("http://localhost:3000/users", {
      name: name.value,
      email: email.value,
      password: password.value,
      avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      bio: "",
      role: "user",
    });

    toast.success("Đăng ký thành công!");
    setTimeout(() => {
      window.location.href = "/signin";
    }, 1000);
  } catch (error) {
    console.error(error);
    toast.error("Lỗi đăng ký!");
  }
};
</script>

<style lang="scss" scoped></style>
