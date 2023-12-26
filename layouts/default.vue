<script lang="ts" setup>
import { ref } from 'vue';
import { useLoginStore } from '@/store/auth';
const loginStore = useLoginStore();
const selectedKeys = ref<string[]>(['2']);

const userLogout = async () => {
  loginStore.Logout();
  navigateTo('/login');
};

</script>

<template>
    <a-layout class="layout">
        <a-layout-header>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <a-menu-item key="1" @click="userLogout">帳號登出</a-menu-item>
                <a-menu-item key="2">課程總表</a-menu-item>
                <a-menu-item key="3">修改課表</a-menu-item>
                <a-menu-item key="4">修改課程</a-menu-item>
            </a-menu> 
        </a-layout-header>
        <a-layout-content style="padding: 0 50px">
            <div :style="{ background: '#fff', padding: '24px', minHeight: '280px', marginTop: '16px' }">
                <slot></slot>
            </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            <p> Database final project </p>
            <p> By 林承孝,曾廷修,吳明憲 </p>
        </a-layout-footer>
    </a-layout>
</template>

<style scoped>
.site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
}

#components-layout-demo-top .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
    float: right;
    margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
    background: #141414;
}
</style>
