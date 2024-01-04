<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue';
import { getAllCourse, deleteCourse } from '~/composables/api/course';
import type { courseListTable } from '~/types/tableTypes';
import { periodAdjust, courseListColumns } from '~/constants/courseConstants';

const allCourseData = await getAllCourse();
const finalData = ref<courseListTable[]>([]);

console.log('allCourseData', allCourseData);

onMounted(() => {
    finalData.value = allCourseData.data.map((item, index) => {
        return {
            key: index.toString(),
            _id: item._id,
            name: item.name,
            teacher: item.teacher,
            courseTime: item.courseDate.map((courseDate) => {
                const periods = periodAdjust[courseDate.period];
                return `星期${courseDate.weekDay}${periods}`;
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
        <a-table :columns="courseListColumns" :data-source="finalData" bordered :pagination="false" style="width: 800px ;">
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
