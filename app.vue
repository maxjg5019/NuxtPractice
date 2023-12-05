<script lang="ts" setup>
  definePageMeta({
    middleware: 'login-check'
  })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
