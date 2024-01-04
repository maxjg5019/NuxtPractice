<script lang="ts" setup>
//我也不熟 jsx 跟 tsx ，反正就是讓 script 可以塞 HTML 的酷東西
import { useLoginStore } from '~/store/auth';
import { getStudentCourse } from '~/composables/api/course';
import { transformRawCourseData, dataToTable } from '~/composables/table';
import type { courseTableType } from '~/types/tableTypes'

//課程表table的欄位格式
const columns = [
    {
        title: '',
        className: 'period',
        dataIndex: 'period',
        width: 50,
    },
    {
        title: '星期一',
        className: 'week',
        dataIndex: 'monday',
    },
    {
        title: '星期二',
        className: 'week',
        dataIndex: 'tuesday',
    },
    {
        title: '星期三',
        className: 'week',
        dataIndex: 'wednesday',
    },
    {
        title: '星期四',
        className: 'week',
        dataIndex: 'thursday',
    },
    {
        title: '星期五',
        className: 'week',
        dataIndex: 'friday',
    },
];

const finalData = ref<courseTableType[]>([]);
const loginStore = useLoginStore();
const studentId = loginStore.studentID;
const rawCourseData = await getStudentCourse(studentId!);

if (rawCourseData?.success) {
    const convertData = transformRawCourseData(rawCourseData.data);
    finalData.value = dataToTable(convertData);
}

onMounted(() => {
    console.log('最後的資料', finalData.value);
});
</script>

<template>
    <a-space size="middle" style="margin-bottom: 20px">
        <SignUpCourse />
        <DropCourse />
    </a-space>

    <a-spin :spinning="finalData == null">
        <a-table :columns="columns" :data-source="finalData" bordered :pagination="false"></a-table>
    </a-spin>
</template>

<style scoped></style>
