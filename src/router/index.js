import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import PostDetail from "../views/PostDetail.vue";
import Profile from "../views/Profile.vue";
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";
import CreatePost from "../views/CreatePost.vue";
import EditPost from "../views/EditPost.vue";
import { toast } from "vue-sonner";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Không cần đăng nhập
    { path: "/", name: "home", component: Home },
    { path: "/post/:id", name: "post-detail", component: PostDetail },
    { path: "/signin", name: "signin", component: Signin },
    { path: "/signup", name: "signup", component: Signup },
    // Đăng nhập nhưng admin hay user đều được
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { requiresAuth: true },
    },
    // Chỉ admin
    {
      path: "/create-post",
      name: "create-post",
      component: CreatePost,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/edit-post/:id",
      name: "edit-post",
      component: EditPost,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Local storage
    const userStr = localStorage.getItem("userLogin");

    if (userStr) {
      const user = JSON.parse(userStr);

      if (to.meta.requiresAdmin && user.role !== "admin") {
        toast.error("Bạn không có quyền truy cập trang này!");
        next("/");
        return;
      }

      next();
    } else {
      toast.error("Bạn cần đăng nhập để truy cập trang này!");
      next("/signin");
    }
  } else {
    next(); // Route công khai -> Cứ đi thoải mái
  }
});

export default router;
