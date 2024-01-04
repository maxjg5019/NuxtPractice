<script setup lang="ts">
import { addCourse } from '~/composables/api/course';
import type { course } from '~/server/models/courseModel';
import { weekDays, coursePeriods } from '~/constants/tableConstants';

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

const showModal = () => {
    courseForm.courseDate = [];
    courseForm.name = '';
    courseForm.teacher = '';

    isModalVisible.value = true;
    modalTitle.value = '新增課程';
};

const handleOk = async () => {
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
  