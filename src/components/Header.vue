<template>
  <nav class="navbar navbar-expand-lg navbar-light mb-4 border-bottom">
    <div class="container-fluid">
      <router-link
        class="navbar-brand fw-bold d-flex align-items-center"
        to="/"
      >
        <i class="fa-solid fa-newspaper me-2"></i> TechTalk Blog
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link fw-semibold"
              active-class="text-dark"
              to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-semibold text-muted" to="/blog"
              >Blog</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-semibold text-muted" to="/about"
              >About</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-semibold text-muted" to="/contact"
              >Contact</router-link
            >
          </li>
        </ul>
        <div v-if="!isLoggedIn" class="d-flex ms-3">
          <router-link
            to="/signup"
            class="btn btn-outline-dark fw-semibold me-2"
            >Sign Up</router-link
          >
          <router-link to="/signin" class="btn btn-dark fw-semibold"
            >Sign In</router-link
          >
        </div>
        <div v-else class="d-flex ms-3 align-items-center">
          <div class="dropdown">
            <button
              class="btn d-flex align-items-center text-decoration-none dropdown-toggle text-dark border-0 bg-transparent p-0"
              type="button"
              id="dropdownUser"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="user.avatar || 'https://i.pravatar.cc/150'"
                alt="avatar"
                width="32"
                height="32"
                class="rounded-circle me-2"
              />
              <span class="fw-semibold text-dark">{{ user.name }}</span>
            </button>
            <ul
              class="dropdown-menu dropdown-menu-end shadow p-0 rounded-0"
              aria-labelledby="dropdownUser"
            >
              <li>
                <router-link class="dropdown-item" to="/profile">
                  <i class="fa-solid fa-user me-2"></i> Hồ sơ
                </router-link>
              </li>
              <li v-if="user.role === 'admin'">
                <router-link class="dropdown-item" to="/create-post">
                  <i class="fa-solid fa-pen-to-square me-2"></i> Tạo bài viết
                </router-link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="logout">
                  <i class="fa-solid fa-right-from-bracket me-2"></i> Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);
const user = ref({});

onMounted(() => {
  checkUserLogin();
});

const checkUserLogin = () => {
  const userData = localStorage.getItem("userLogin");
  if (userData) {
    isLoggedIn.value = true;
    user.value = JSON.parse(userData);
  }
};

const logout = () => {
  localStorage.removeItem("userLogin");
  isLoggedIn.value = false;
  user.value = {};
  router.push("/signin");
};
</script>

<style lang="scss" scoped></style>
