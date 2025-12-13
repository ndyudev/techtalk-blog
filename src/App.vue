<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { Toaster } from "vue-sonner";
</script>

<template>
  <div>
    <Header />
    <router-view />
    <Toaster position="top-right" richColors />
    <Footer />
  </div>
</template>

<style scoped></style>
