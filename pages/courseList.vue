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
interface periodMappingstruct {
    [key: number]: string;
}
const periodMapping: periodMappingstruct = {
    1: '第一節',
    2: '第二節',
    3: '第三節',
    4: '第四節',
    5: '第N節',
    6: '第五節',
    7: '第六節',
    8: '第七節',
    9: '第八節',
    10: '第九節',
    11: '第A節',
    12: '第B節',
    13: '第C節',
    14: '第D節'
};

onMounted(() => {
    finalData.value = allCourseData.data.map((item, index) => {
        return {
            key: index.toString(),
            _id: item._id,
            name: item.name,
            teacher: item.teacher,
            courseTime: item.courseDate.map((courseDate) => {
                const periods = periodMapping[courseDate.period];
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
