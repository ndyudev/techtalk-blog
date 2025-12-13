<template>
  <div>
    <section class="my-4">
      <div class="container" style="max-width: 800px">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h3 class="mb-4 fw-bold d-flex align-items-center">
              <i class="fa-solid fa-user-pen me-2"></i> Chỉnh sửa trang cá nhân
            </h3>

            <div class="row mb-4 align-items-center bg-light p-3 rounded">
              <div class="col-sm-3 text-end">
                <img
                  :src="
                    user.avatar ||
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  "
                  class="rounded-circle border"
                  width="80"
                  height="80"
                  alt="Avatar"
                />
              </div>
              <div class="col-sm-9">
                <div class="fw-bold fs-5 mb-1">{{ user.name }}</div>
                <input
                  v-model="user.avatar"
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Nhập URL ảnh đại diện (nếu bỏ trống sẽ dùng ảnh mặc định)"
                />
              </div>
            </div>

            <form @submit.prevent="handleUpdateProfile">
              <div class="row mb-3">
                <label
                  for="inputName"
                  class="col-sm-3 col-form-label text-end fw-semibold"
                  >Tên</label
                >
                <div class="col-sm-9">
                  <input
                    v-model="user.name"
                    type="text"
                    class="form-control"
                    id="inputName"
                    placeholder="Nhập tên của bạn"
                  />
                  <div class="form-text small">
                    Tên này sẽ hiển thị trên trang cá nhân của bạn.
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="inputEmail"
                  class="col-sm-3 col-form-label text-end fw-semibold"
                  >Email</label
                >
                <div class="col-sm-9">
                  <input
                    v-model="user.email"
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="your@email.com"
                    disabled
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="inputBio"
                  class="col-sm-3 col-form-label text-end fw-semibold"
                  >Tiểu sử</label
                >
                <div class="col-sm-9">
                  <textarea
                    v-model="user.bio"
                    class="form-control"
                    id="inputBio"
                    rows="3"
                    placeholder="Viết vài dòng về bản thân..."
                  ></textarea>
                </div>
              </div>

              <hr class="my-4" />

              <h5 class="mb-3 fw-bold">
                <i class="fa-solid fa-lock me-2"></i>Đổi mật khẩu
              </h5>

              <div class="row mb-3">
                <label
                  for="inputOldPass"
                  class="col-sm-3 col-form-label text-end fw-semibold"
                  >Mật khẩu cũ</label
                >
                <div class="col-sm-9">
                  <input
                    v-model="oldPassword"
                    type="password"
                    class="form-control"
                    id="inputOldPass"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="inputNewPass"
                  class="col-sm-3 col-form-label text-end fw-semibold"
                  >Mật khẩu mới</label
                >
                <div class="col-sm-9">
                  <input
                    v-model="newPassword"
                    type="password"
                    class="form-control"
                    id="inputNewPass"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="inputConfirmPass"
                  class="col-sm-3 col-form-label text-end fw-semibold"
                  >Xác nhận lại</label
                >
                <div class="col-sm-9">
                  <input
                    v-model="confirmPassword"
                    type="password"
                    class="form-control"
                    id="inputConfirmPass"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-sm-3"></div>
                <div class="col-sm-9">
                  <button type="submit" class="btn btn-dark fw-semibold px-4">
                    Lưu thay đổi
                  </button>
                  <router-link to="/" class="btn btn-outline-secondary ms-2"
                    >Hủy</router-link
                  >
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
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref({
  id: "",
  name: "",
  email: "",
  avatar: "",
  bio: "",
});

const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const loadUserData = () => {
  const userLogin = localStorage.getItem("userLogin");
  if (!userLogin) {
    router.push("/signin");
    return;
  }
  const userData = JSON.parse(userLogin);
  user.value = { ...userData };
};

const handleUpdateProfile = async () => {
  try {
    if (!user.value.avatar) {
      user.value.avatar =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }

    if (oldPassword.value || newPassword.value || confirmPassword.value) {
      const userLogin = JSON.parse(localStorage.getItem("userLogin"));
      if (oldPassword.value !== userLogin.password) {
        toast.error("Mật khẩu cũ không đúng!");
        return;
      }
      if (newPassword.value !== confirmPassword.value) {
        toast.error("Mật khẩu xác nhận không khớp!");
        return;
      }
      user.value.password = newPassword.value;
    }

    await axios.put(`http://localhost:3000/users/${user.value.id}`, user.value);
    localStorage.setItem("userLogin", JSON.stringify(user.value));
    toast.success("Cập nhật thành công!");

    // Reset password fields
    oldPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
  } catch (error) {
    console.error(error);
    toast.error("Lỗi cập nhật!");
  }
};

onMounted(() => {
  loadUserData();
});
</script>

<style lang="scss" scoped></style>
