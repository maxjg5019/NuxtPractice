<script lang="tsx" setup>
//我也不熟 jsx 跟 tsx ，反正就是讓 script 可以塞 HTML 的酷東西
import { getAllStudents } from '~/composables/api/user';
import { getStudentCourse } from '~/composables/api/course';
import type { courseTableInfo } from '~/composables/api/course';

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

interface tableData {
  key: string;
  period: string;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
}

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

const finalData = ref<tableData[]>([]);
courseInfoToTableData(mockData);

function courseInfoToTableData(courseIndos: courseTableInfo[]): void {
  const tableData: tableData[] = [];

  const NTUTcoursePeriod = ['1', '2', '3', '4', 'N', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D'];

  //初始化每周的節次表
  for (let i = 0; i < NTUTcoursePeriod.length; i++) {
    tableData.push({
      key: i.toString(),
      period: (i + 1).toString(),
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    });
  }
  // console.log("初始化", tableData);

  //分別將課程資料填入對應的節次表
  courseIndos.forEach((eachCourse) => {
    eachCourse.courseDate.forEach((eachCourseDate) => {
      switch (eachCourseDate.weekDay) {
        case 1:
          tableData[eachCourseDate.period - 1].monday.push(eachCourse.name);
          break;
        case 2:
          tableData[eachCourseDate.period - 1].tuesday.push(eachCourse.name);
          break;
        case 3:
          tableData[eachCourseDate.period - 1].wednesday.push(eachCourse.name);
          break;
        case 4:
          tableData[eachCourseDate.period - 1].thursday.push(eachCourse.name);
          break;
        case 5:
          tableData[eachCourseDate.period - 1].friday.push(eachCourse.name);
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

watch(studentSelect, async (Value) => {
  if (Value === 'All') {
    console.log('studentSelectCheck', Value);

    courseInfoToTableData(mockData);
  } else {
    const getStudentCoures = await getStudentCourse(Value.toString());
    console.log('getStudentCoures', getStudentCoures);

    if ((getStudentCoures)?.success) {
      courseInfoToTableData(getStudentCoures.data);
    } else {
      courseInfoToTableData([]);
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
  