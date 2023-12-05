<script lang="ts" setup>
definePageMeta({
    layout: false,
})

interface FormState {
    student_id: string;
    password: string;
    remember: boolean;
}

const formState = ref<FormState>({
    student_id: '',
    password: '',
    remember: true,
});
const onFinish = () => {
    console.log('Success:');
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>

<template>
    <div class="form-container">
        <a-form :model="formState" name="login"  autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <h2>實驗室成員統一課程表系統</h2>
            <h2>請登入後以查看或新增課表</h2>
            <a-divider />
            <a-form-item label="學號" name="student_id" :rules="[{ required: true, message: '請輸入你的學號' }]">
                <a-input v-model:value="formState.student_id" style="width: 488px;" />
            </a-form-item>

            <a-form-item label="密碼" name="password" :rules="[{ required: true, message: '請輸入你的密碼' }]">
                <a-input-password v-model:value="formState.password" style="width: 488px;" />
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
