<script lang="ts" setup>
import { getAllStudents } from '~/composables/api/user';
import { studentColumns } from '~/constants/studentConstants';
import type { studentTableType } from '~/types/tableTypes';

const allStudentData = await getAllStudents();
console.log('allStudentData', allStudentData);

const finalData = ref<studentTableType[]>([]);

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
    <a-table :columns="studentColumns" :data-source="finalData" bordered :pagination="false" style="width: 800px ;" />
</template>

<style scoped></style>
