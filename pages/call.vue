<script setup>

    // const {data, pending, error, refresh} = await useAsyncData(
    //     'mountains',
    //     () => $fetch ('https://api.nuxtjs.dev/mountains')
    // );

    const {data, pending, error, refresh} = await useFetch(
        'https://api.nuxtjs.dev/mountains',
        {method: 'POST'}
    )

    onMounted(() => {
        
    });
</script>

<template>
    <div>
        <h1>Call</h1>
        <ul>
            <li v-for="item in data" :key="item.title">
                {{ item }}
            </li>
        </ul>
    </div>
</template>
