<script lang="ts" setup>
import type { loginformState } from '~/composables/api/user';
import { userLogin } from '~/composables/api/user';
import { useLoginStore } from '@/store/auth';
definePageMeta({
    layout: false,
})

const userData = ref<loginformState>({
    studentId: '',
    password: '',
});

const loginStore = useLoginStore();

const onFinish = async (Info: any) => {
    const result = await userLogin(Info);
    if (result?.success) {
        message.success(result.message);
        loginStore.Login();
        navigateTo('/');
    } else {
        message.error(result?.message);
    }
};

const onFinishFailed = (errorInfo: any) => {
    message.error('請輸入完整資料');
};

</script>

<template>
    <div class="form-container">
        <a-form :model="userData" name="login" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-typography-title style="letter-spacing: 0.1em;">實驗室成員課程表系統</a-typography-title>
            <a-divider />

            <a-form-item label="帳號" name="studentId" :rules="[{ required: true, message: '請輸入你的帳號' }]">
                <a-input v-model:value="userData.studentId" style="width: 488px;" />
            </a-form-item>

            <a-form-item label="密碼" name="password" :rules="[{ required: true, message: '請輸入你的密碼' }]">
                <a-input-password v-model:value="userData.password" style="width: 488px;" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 2, span: 16 }">
                <a-button type="primary" html-type="submit">登入</a-button>
            </a-form-item>

        </a-form>
    </div>
</template>

<style scoped>
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #eee;
}
</style>
