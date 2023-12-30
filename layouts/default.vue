<script lang="ts" setup>
import { ref } from 'vue';
import { useLoginStore } from '@/store/auth';
const loginStore = useLoginStore();
const selectedKeys = ref<string[]>(['1']);

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
                <a-menu-item key="1">
                    <!-- TODO:Admin端會顯示所有學生加起來的課表
                        可以檢視特定學生的課表-->
                    <nuxt-link to="/">課程總表</nuxt-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <!-- TODO:只有學生端可操作 -->
                    <nuxt-link to="/personalCourseTable">個人課表</nuxt-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <!-- TODO:只有Admin端可操作 -->
                    <nuxt-link to="/courseList">課程列表</nuxt-link>
                </a-menu-item>
                <a-menu-item key="4">
                    <nuxt-link to="/studentList">成員列表</nuxt-link>
                </a-menu-item>
                <a-menu-item key="5">
                    <nuxt-link to="/about">關於</nuxt-link>
                </a-menu-item>
                <a-menu-item key="6" @click="userLogout">帳號登出</a-menu-item>
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
