<script setup>
import { useRoute } from 'vue-router';

    const route = useRoute();
    const { data: userData } = useFetch('/api/user/${route.params.id}}');

    const user = computed(() => userData.value || {});
</script>

<template>
    <div>
        <div>name: {{ user.name }}</div>
        <div>email: {{ user.email }}</div>
        <div>phone: {{ user.phone }}</div>
    </div>
</template>
