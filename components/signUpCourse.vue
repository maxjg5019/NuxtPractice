<script setup lang="ts">
import { signUpCourse, getAllCourse } from '~/composables/api/course';
import { useLoginStore } from '@/store/auth';
import type { courseTableInfo } from '~/composables/api/course';

const isModalVisible = ref(false);
const modalTitle = ref('');
const selectedCourseId = reactive<{ _id: string }>({ _id: '' });
const loginStore = useLoginStore();

const allCourseDataToCourseList = (data: courseTableInfo[]) => {
    return data.map((item: courseTableInfo) => {
        return {
            label: item.name.concat(' (', item.teacher, ')'),
            value: item._id,
            date: item.courseDate,
        };
    });
};

const allCourseData = await getAllCourse();
const allCourseList = allCourseDataToCourseList(allCourseData.data);

const showModal = () => {

    isModalVisible.value = true;
    modalTitle.value = '選修課程';
};

const handleOk = async () => {
    console.log('handleOk', selectedCourseId);
    const studentId = loginStore.studentID?.toString(); // 這邊要記得加toString()因從cookie取出來的是number
    if (studentId !== null) {
        const result = await signUpCourse(studentId!, selectedCourseId._id);

        if (result?.success) {
            message.success(result.message);
            setTimeout(() => {
                reloadNuxtApp({ ttl: 500 });
            }, 500);
        } else {
            message.error(result?.message);
        }
    } else {
        message.error('出Bug啦 你怎麼沒登入');
    }
    isModalVisible.value = false;
};

const handleCancel = () => { isModalVisible.value = false; };
</script>

<template>
    <a-button type="primary" @click="showModal">選修課程</a-button>

    <a-modal v-model:open="isModalVisible" :title="modalTitle" @ok="handleOk" @cancel="handleCancel">

        <a-select v-model:value="selectedCourseId._id" style="width:400px">
            <a-select-option v-for="item in allCourseList" :value="item.value" :key="item.value">
                {{ item.label }}
            </a-select-option>
        </a-select>


    </a-modal>
</template>

<style scoped></style>
