<template>
  <div>
    <div
      class="container d-flex align-items-center justify-content-center mt-5"
    >
      <div class="col-12" style="max-width: 480px">
        <div class="card shadow-sm mb-3">
          <div class="card-body p-4">
            <h4
              class="text-center fw-bold mb-4 d-flex align-items-center justify-content-center"
            >
              <i class="fa-solid fa-user-lock me-2"></i> Sign In
            </h4>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="loginEmail" class="form-label fw-semibold"
                  >Email hoặc Username</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="loginEmail"
                  placeholder="you@example.com"
                  v-model="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label fw-semibold"
                  >Mật khẩu</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="loginPassword"
                  placeholder="••••••••"
                  v-model="password"
                  required
                />
              </div>
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberMe"
                  />
                  <label class="form-check-label" for="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="#" class="text-decoration-none small"
                  >Quên mật khẩu?</a
                >
              </div>
              <button type="submit" class="btn btn-dark w-100 fw-semibold">
                Đăng nhập
              </button>
            </form>
            <div class="text-center mt-3">
              <small class="text-muted">Hoặc đăng nhập với</small>
              <div class="d-flex justify-content-center gap-3 mt-2">
                <a href="#" class="text-muted"
                  ><i class="fa-brands fa-google fs-5"></i
                ></a>
                <a href="#" class="text-muted"
                  ><i class="fa-brands fa-github fs-5"></i
                ></a>
                <a href="#" class="text-muted"
                  ><i class="fa-brands fa-facebook fs-5"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div class="border p-4 rounded-1 text-center">
          <span>Bạn chưa có tài khoản?</span>
          <router-link to="/signup" class="text-decoration-none fw-bold ms-1"
            >Đăng ký</router-link
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
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const handleLogin = async () => {
  errorMessage.value = "";

  try {
    const response = await axios.get(
      `http://localhost:3000/users?email=${email.value}`
    );

    if (response.data.length === 0) {
      toast.error("Email không tồn tại!");
      return;
    }

    const user = response.data[0];

    if (user.password !== password.value) {
      toast.error("Mật khẩu không đúng!");
      return;
    }

    localStorage.setItem("userLogin", JSON.stringify(user));

    toast.success("Đăng nhập thành công!");

    setTimeout(() => {
      router.push("/");
    }, 500);
  } catch (error) {
    toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
  }
};
</script>

<style lang="scss" scoped></style>
