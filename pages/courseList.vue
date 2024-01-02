<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue';
import { getAllCourse, deleteCourse } from '~/composables/api/course';

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
    {
        title: '課程編號',
        dataIndex: '_id',
        key: '_id',

    },
];
const allCourseData = await getAllCourse();
console.log('allCourseData', allCourseData);

interface tableData {
    key: string;
    _id: string;
    name: string;
    teacher: string;
    courseTime: string;
}

const finalData = ref<tableData[]>([]);
const NTUTcoursePeriod = ['1', '2', '3', '4', 'N', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D'];

onMounted(() => {
    finalData.value = allCourseData.data.map((item, index) => {
        return {
            key: index.toString(),
            _id: item._id,
            name: item.name,
            teacher: item.teacher,
            courseTime: item.courseDate.map((courseDate) => {
                return `星期${courseDate.weekDay}第${courseDate.period}節`;
            }).join(' - '),
        };
    });
});

const callDeleteCourse = async (courseId: string) => {
    console.log('deleteCourse資料', courseId);
    const result = await deleteCourse(courseId);
    if (result?.success) {
        message.success(result.message);
        setTimeout(() => {
            reloadNuxtApp({ ttl: 500 });
        }, 1000);
    } else {
        message.error(result?.message);
    }
};

</script>

<template>
    <a-row style="margin-bottom: 20px;">
        <AddCourse />
    </a-row>
    <a-row style="margin-bottom: 20px;">
        <a-table :columns="columns" :data-source="finalData" bordered :pagination="false" style="width: 800px ;">
            <template #bodyCell="{ record, column }">
                <template v-if="column.dataIndex === 'name'">
                    {{ record.name }}
                    <a-popconfirm title="確定要刪除嗎？" ok-text="確定" cancel-text="取消" placement="topRight"
                        @confirm="callDeleteCourse(record._id)">
                        <DeleteOutlined style="margin-left: 10px; cursor: pointer;"></DeleteOutlined>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </a-row>
</template>

<style scoped></style>
