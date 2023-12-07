<script lang="ts" setup>
import type { registerFormState } from '~/composables/api/user';
import { userRegister } from '~/composables/api/user';

definePageMeta({
    layout: false,
})


const userData = ref<registerFormState>({
    name: '',
    studentId: '',
    password: '',
});
const onFinish = async (Info: any) => {
    const result = await userRegister(Info);
    if(result?.success){
        message.success(result.message);
        console.log('Success:', Info);
    }else{
        message.error(result?.message);
        console.log('Failed:', Info);
    }
};

const onFinishFailed = (errorInfo: any) => {
    message.error('請輸入完整資料');
    console.log('Failed:', errorInfo);
};

</script>

<template>
    <div class="form-container">
        <a-form :model="userData" name="login" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <h2 style="letter-spacing: 0.1em;">學生註冊</h2>
            <a-divider />
            <a-form-item label="姓名" name="name" :rules="[{ required: true, message: '請輸入你的姓名' }]">
                <a-input v-model:value="userData.name" style="width: 488px;" />
            </a-form-item>

            <a-form-item label="帳號" name="studentId" :rules="[{ required: true, message: '請輸入你的帳號' }]">
                <a-input v-model:value="userData.studentId" style="width: 488px;" />
            </a-form-item>

            <a-form-item label="密碼" name="password" :rules="[{ required: true, message: '請輸入你的密碼' }]">
                <a-input-password v-model:value="userData.password" style="width: 488px;" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 2, span: 16 }">
                <a-button type="primary" html-type="submit">註冊</a-button>
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
