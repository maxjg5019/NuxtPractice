<script lang="ts" setup>
//我也不熟 jsx 跟 tsx ，反正就是讓 script 可以塞 HTML 的酷東西
import { useLoginStore } from '@/store/auth';
import { getStudentCourse } from '~/composables/api/course';

interface courseInfo {
    key: string;
    courseName: string;
    courseDate: courseDate[];
}

interface courseDate {
    weekDay: number;
    period: number;
}

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

interface tableData {
    key: string;
    period: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
}

function transformRawCourseData(courseData: any) {
    return courseData.map((course: any, index: number) => {
        return {
            key: (index + 1).toString(),
            courseName: course.name.concat(' - ', course.teacher),
            courseDate: course.courseDate.map((date: any) => {
                return {
                    weekDay: date.weekDay,
                    period: date.period,
                };
            }),
        };
    });
}

const finalData = ref<tableData[]>([]);
const loginStore = useLoginStore();
const studentId = loginStore.studentID;
const rawCourseData = await getStudentCourse(studentId!);

if (rawCourseData?.success) {
    const convertData = transformRawCourseData(rawCourseData.data);
    courseInfoToTableData(convertData);
}

function courseInfoToTableData(courseIndos: courseInfo[]): void {
    const tableData: tableData[] = [];

    const NTUTcoursePeriod = ['1', '2', '3', '4', 'N', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D'];

    //初始化每周的節次表
    for (let i = 0; i < NTUTcoursePeriod.length; i++) {
        tableData.push({
            key: i.toString(),
            period: (i + 1).toString(),
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
        });
    }

    //分別將課程資料填入對應的節次表
    courseIndos.forEach((eachCourse) => {
        eachCourse.courseDate.forEach((eachCourseDate) => {
            switch (eachCourseDate.weekDay) {
                case 1:
                    tableData[eachCourseDate.period - 1].monday = (eachCourse.courseName);
                    break;
                case 2:
                    tableData[eachCourseDate.period - 1].tuesday = (eachCourse.courseName);
                    break;
                case 3:
                    tableData[eachCourseDate.period - 1].wednesday = (eachCourse.courseName);
                    break;
                case 4:
                    tableData[eachCourseDate.period - 1].thursday = (eachCourse.courseName);
                    break;
                case 5:
                    tableData[eachCourseDate.period - 1].friday = (eachCourse.courseName);
                    break;
            }
        });
    });
    //最後再把節次轉換成北科正確的格式
    tableData.forEach((item, index) => {
        item.period = NTUTcoursePeriod[index];
    });
    finalData.value = tableData;
}
onMounted(() => {
    console.log("最後的資料", finalData.value);
});
</script>

<template>

    <a-space size="middle" style="margin-bottom: 20px;">
        <SignUpCourse />
        <DropCourse />
    </a-space>

    <a-spin :spinning="finalData == null">
        <a-table :columns="columns" :data-source="finalData" bordered :pagination="false"></a-table>
    </a-spin>
</template>
 
<style scoped></style>
  