<script setup lang="ts">
import { addCourse } from '~/composables/api/course';
import type { course } from '~/server/models/courseModel';

const isModalVisible = ref(false);
const modalTitle = ref('');
const courseForm = reactive<course>({
    name: '',
    teacher: '',
    courseDate: [],
});

const addCourseDate = () => {
    courseForm.courseDate.push({
        weekDay: 1,
        period: 1,
    });
};

const weekDays = [
    { label: '星期一', value: 1 },
    { label: '星期二', value: 2 },
    { label: '星期三', value: 3 },
    { label: '星期四', value: 4 },
    { label: '星期五', value: 5 },
];

const coursePeriods = [
    { label: '第一節', value: 1 },
    { label: '第二節', value: 2 },
    { label: '第三節', value: 3 },
    { label: '第四節', value: 4 },
    { label: '第N節', value: 5 },
    { label: '第五節', value: 6 },
    { label: '第六節', value: 7 },
    { label: '第七節', value: 8 },
    { label: '第八節', value: 9 },
    { label: '第九節', value: 10 },
    { label: '第A節', value: 11 },
    { label: '第B節', value: 12 },
    { label: '第C節', value: 13 },
    { label: '第D節', value: 14 },
];

const showModal = () => {

    courseForm.courseDate = [];
    courseForm.name = '';
    courseForm.teacher = '';

    isModalVisible.value = true;
    modalTitle.value = '新增課程';
};

const handleOk = async () => {
    console.log('handleOk', courseForm);

    const checkDuplicate = courseForm.courseDate.some((courrseDate, index, array) => {
        return array.findIndex(cd => cd.weekDay === courrseDate.weekDay && cd.period === courrseDate.period) !== index;
    });

    if (checkDuplicate) {
        message.error('課程時間重複');
        return;
    }

    const result = await addCourse(courseForm);
    if (result?.success) {
        message.success(result.message);
        setTimeout(() => {
            reloadNuxtApp({ ttl: 500 });
        }, 500);
    } else {
        message.error(result?.message);
    }

    isModalVisible.value = false;
};

const handleCancel = () => { isModalVisible.value = false; };

</script>

<template>
    <a-button type="primary" @click="showModal">新增課程</a-button>

    <a-modal v-model:open="isModalVisible" :title="modalTitle" @ok="handleOk" @cancel="handleCancel">
        <a-row :gutter="16" style="margin-bottom:10px ;">
            <a-col :span="12">
                <a-typography-text strong>課程名稱：</a-typography-text>
                <a-input v-model:value="courseForm.name" />
            </a-col>
            <a-col :span="12">
                <a-typography-text strong>授課教師：</a-typography-text>
                <a-input v-model:value="courseForm.teacher" />
            </a-col>
        </a-row>
        <a-button style="margin-bottom: 16px;" type="primary" @click="addCourseDate">新增課程時間</a-button>

        <div v-for="course in courseForm.courseDate">
            <a-select v-model:value="course.weekDay">
                <a-select-option v-for="day in weekDays" :value="day.value" :key="day.label">
                    {{ day.label }}
                </a-select-option>
            </a-select>
            <a-select v-model:value="course.period">
                <a-select-option v-for="period in coursePeriods" :value="period.value" :key="period.label">
                    {{ period.label }}
                </a-select-option>
            </a-select>
        </div>
    </a-modal>
</template>
  
<style scoped></style>
  