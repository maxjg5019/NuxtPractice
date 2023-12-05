<script lang="ts" setup>
import type { formState as userData } from '~/composables/api/user';
definePageMeta({
    layout: false,
})


const userData = ref<userData>({
    studentId: '',
    password: '',
    userType: '0',
});
const onFinish = (Info: any) => {
    const userTypeEnum = parseInt(Info.userType, 10);
    //這邊嗎
    message.success('登入成功');
    console.log('Success:', Info, userTypeEnum);
};

const onFinishFailed = (errorInfo: any) => {
    message.error('請輸入完整資料');
    console.log('Failed:', errorInfo);
};

</script>

<template>
    <div class="form-container">
        <a-form :model="userData" name="login" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <h2 style="letter-spacing: 0.1em;">註冊後登入</h2>
            <a-divider />
            <a-form-item label="姓名" name="name" :rules="[{ required: true, message: '請輸入你的姓名' }]">
                <a-input v-model:value="userData.studentId" style="width: 488px;" />
            </a-form-item>

            <a-form-item label="帳號" name="studentId" :rules="[{ required: true, message: '請輸入你的帳號' }]">
                <a-input v-model:value="userData.studentId" style="width: 488px;" />
            </a-form-item>

            <a-form-item label="密碼" name="password" :rules="[{ required: true, message: '請輸入你的密碼' }]">
                <a-input-password v-model:value="userData.password" style="width: 488px;" />
            </a-form-item>

            <a-form-item label="登入身份" name="userType">
                <a-radio-group v-model:value="userData.userType" name="radioGroup">
                    <a-radio value="0">教授</a-radio>
                    <a-radio value="1">學生</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 2, span: 16 }">
                <a-button type="primary" html-type="submit">送出</a-button>
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
