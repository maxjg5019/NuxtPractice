<script lang="ts" setup>
import type { course } from '~/server/models/courseModel';
import { DeleteOutlined } from '@ant-design/icons-vue';
import {getAllCourse} from '~/composables/api/course';

const columns = [
    {
        title: '課程名稱',
        dataIndex: 'name',
        key: 'name',

    },
    {
        title: '授課教師',
        dataIndex: 'teacher',
        key: 'teacher',
    },
    {
        title: '上課時間',
        dataIndex: 'courseTime',
        key: 'courseTime',
    },
];
const allCourseData = await getAllCourse();
console.log('allCourseData', allCourseData);

interface tableData {
    key: string;
    name: string;
    teacher: string;
    courseTime: string;
}

const mockData: course[] = [
    {
        name: '資料庫',
        teacher: '林承孝',
        courseDate: [
            {
                weekDay: 1,
                period: 1,
            },
            {
                weekDay: 1,
                period: 2,
            },
            {
                weekDay: 1,
                period: 3,
            },
        ],
    },
    {
        name: '作業系統',
        teacher: '林承孝',
        courseDate: [
            {
                weekDay: 2,
                period: 1,
            },
            {
                weekDay: 2,
                period: 2,
            },
            {
                weekDay: 2,
                period: 3,
            },
        ],
    },
    {
        name: '網路安全',
        teacher: '林承孝',
        courseDate: [
            {
                weekDay: 3,
                period: 1,
            },
            {
                weekDay: 3,
                period: 2,
            },
            {
                weekDay: 3,
                period: 3,
            },
        ],
    },
    {
        name: 'DTV',
        teacher: '林承孝',
        courseDate: [
            {
                weekDay: 1,
                period: 1,
            },
            {
                weekDay: 1,
                period: 2,
            },
            {
                weekDay: 1,
                period: 3,
            },
        ],
    },
    {
        name: '網路安全',
        teacher: '林承孝',
        courseDate: [
            {
                weekDay: 5,
                period: 1,
            },
            {
                weekDay: 5,
                period: 2,
            },
            {
                weekDay: 5,
                period: 3,
            },
        ],
    },

];
const finalData = ref<tableData[]>([]);

onMounted(() => {
    finalData.value = mockData.map((item, index) => {
        return {
            key: index.toString(),
            name: item.name,
            teacher: item.teacher,
            courseTime: item.courseDate.map((courseDate) => {
                return `星期${courseDate.weekDay}第${courseDate.period}節`;
            }).join(' - '),
        };
    });
});

const deleteCourse = (course: course) => {
    console.log('deleteCourse', course);
};
</script>

<template>
    <a-row style="margin-bottom: 20px;">
        <AddCourse />
    </a-row>
    <a-row style="margin-bottom: 20px;">
        <a-table :columns="columns" :data-source="finalData" bordered :pagination="false" style="width: 800px ;">
            <DeleteOutlined @click()="deleteCourse" />
        </a-table>
    </a-row>
</template>

<style scoped></style>
