<script lang="ts" setup>
import { getAllStudents } from '~/composables/api/user';

const columns = [
    {
        title: '學生姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '學號',
        dataIndex: 'studentId',
        key: 'studentId',
    },
];
const allStudentData = await getAllStudents();
console.log('allStudentData', allStudentData);

interface tableData {
    key: string;
    name: string;
    studentId: string;
}

const finalData = ref<tableData[]>([]);

onMounted(() => {
    finalData.value = allStudentData.data.map((item, index) => {
        return {
            key: index.toString(),
            name: item.name,
            studentId: item.studentId,
        };
    });
});

</script>

<template>
    <div style="margin-bottom: 20px;">
        <a-typography-title :level="2">實驗室成員列表</a-typography-title>
    </div>
    <a-table :columns="columns" :data-source="finalData" bordered :pagination="false" style="width: 800px ;" />
</template>

<style scoped></style>
