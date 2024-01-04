<script lang="tsx" setup>
//我也不熟 jsx 跟 tsx ，反正就是讓 script 可以塞 HTML 的酷東西
import { getAllStudents } from '~/composables/api/user';
import { getStudentCourse } from '~/composables/api/course';
import { dataToTable } from '~/composables/table';
import type { courseTableInfo } from '~/composables/api/course';
import type { courseTableType } from '~/types/tableTypes'

function renderCourseItems(courseItems: string[]) {
  return (
    <div>
      {courseItems.map((item) => {
        return <div>{item}</div>;
      })}
    </div>
  );
}

const studentSelect = ref('');
const allStudentData = await getAllStudents();
const studentSelectList = allStudentData.data.map((item) => {
  return {
    name: item.name,
    studentId: item.studentId,
  };
});

onMounted(() => {
  // 初始化 studentSelectList，將「所有學生」加入開頭
  studentSelectList.unshift({
    name: "所有學生",
    studentId: "All"
  });
  // 設置初始選中的學生為「所有學生」
  studentSelect.value = "All";
  console.log('studentSelectList', studentSelectList);
});

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
    customRender: ({ text }: { text: string[] }) => renderCourseItems(text)
  },
  {
    title: '星期二',
    className: 'week',
    dataIndex: 'tuesday',
    customRender: ({ text }: { text: string[] }) => renderCourseItems(text)
  },
  {
    title: '星期三',
    className: 'week',
    dataIndex: 'wednesday',
    customRender: ({ text }: { text: string[] }) => renderCourseItems(text)
  },
  {
    title: '星期四',
    className: 'week',
    dataIndex: 'thursday',
    customRender: ({ text }: { text: string[] }) => renderCourseItems(text)
  },
  {
    title: '星期五',
    className: 'week',
    dataIndex: 'friday',
    customRender: ({ text }: { text: string[] }) => renderCourseItems(text)
  },
];

//模擬從DB取得的資料
const mockData: courseTableInfo[] = [
  {
    key: '1',
    _id: '',
    name: '課程 B',
    teacher: '',
    courseDate: [
      {
        weekDay: 4,
        period: 2,
      },
    ],
  },
];

const finalData = ref<courseTableType[]>([]);
finalData.value = dataToTable(mockData);

watch(studentSelect, async (Value) => {
  if (Value === 'All') {
    console.log('studentSelectCheck', Value);

    finalData.value = dataToTable(mockData);
  } else {
    const getStudentCoures = await getStudentCourse(Value.toString());
    console.log('getStudentCoures', getStudentCoures);

    if ((getStudentCoures)?.success) {
      finalData.value = dataToTable(getStudentCoures.data);
    } else {
      finalData.value = dataToTable([]);
    }
  }
});

</script>

<template>
  <a-space size="middle">
    <h2>選擇學生課表</h2>
    <a-select v-model:value="studentSelect" style="width: 120px" placeholder="選擇學生">
      <a-select-option v-for=" student in studentSelectList" :value="student.studentId" :key="student.name">
        {{ student.name }}
      </a-select-option>
    </a-select>
  </a-space>

  <a-spin :spinning="finalData == null">
    <a-table :columns="columns" :data-source="finalData" bordered :pagination="false"></a-table>
  </a-spin>
</template>
 
<style scoped></style>
  