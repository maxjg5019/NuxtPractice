<script lang="tsx" setup>
//我也不熟 jsx 跟 tsx ，反正就是讓 script 可以塞 HTML 的酷東西

interface courseInfo {
  key: string;
  courseName: string;
  courseDate: courseDate[];
}

interface courseDate {
  weekDay: number;
  period: number;
}

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
const newColmns: courseInfo[] = [
  {
    key: '1',
    courseName: '課程 A',
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
    key: '2',
    courseName: '課程 B',
    courseDate: [
      {
        weekDay: 4,
        period: 2,
      },
    ],
  },
  {
    key: '3',
    courseName: '課程 C',
    courseDate: [
      {
        weekDay: 2,
        period: 3,
      },
    ],
  },
  {
    key: '4',
    courseName: '課程 D',
    courseDate: [
      {
        weekDay: 1,
        period: 4,
      },
    ],
  },
  {
    key: '5',
    courseName: '課程 E',
    courseDate: [
      {
        weekDay: 3,
        period: 5,
      },
    ],
  },
  {
    key: '6',
    courseName: '課程 F',
    courseDate: [
      {
        weekDay: 5,
        period: 6,
      },
    ],
  },
  {
    key: '7',
    courseName: '課程 G',
    courseDate: [
      {
        weekDay: 4,
        period: 7,
      },
    ],
  },
  {
    key: '8',
    courseName: '課程 H',
    courseDate: [
      {
        weekDay: 2,
        period: 8,
      },
    ],
  },
  {
    key: '9',
    courseName: '課程 I',
    courseDate: [
      {
        weekDay: 1,
        period: 9,
      },
    ],
  },
  {
    key: '10',
    courseName: '課程 J',
    courseDate: [
      {
        weekDay: 3,
        period: 10,
      },
    ],
  },
  {
    key: '11',
    courseName: '課程 A1',
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
    key: '12',
    courseName: '課程 DTV',
    courseDate: [
      {
        weekDay: 5,
        period: 12,
      },
      {
        weekDay: 5,
        period: 13,
      },
      {
        weekDay: 5,
        period: 14,
      },
    ],
  },
];

const finalData = ref<tableData[]>([]);
courseInfoToTableData(newColmns);

function courseInfoToTableData(courseIndos: courseInfo[]): void {
  const tableData: tableData[] = [];

  // 資料型態的節次        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
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
  console.log("初始化", tableData);

  //分別將課程資料填入對應的節次表
  courseIndos.forEach((eachCourse) => {
    eachCourse.courseDate.forEach((eachCourseDate) => {
      switch (eachCourseDate.weekDay) {
        case 1:
          tableData[eachCourseDate.period - 1].monday.push(eachCourse.courseName);
          break;
        case 2:
          tableData[eachCourseDate.period - 1].tuesday.push(eachCourse.courseName);
          break;
        case 3:
          tableData[eachCourseDate.period - 1].wednesday.push(eachCourse.courseName);
          break;
        case 4:
          tableData[eachCourseDate.period - 1].thursday.push(eachCourse.courseName);
          break;
        case 5:
          tableData[eachCourseDate.period - 1].friday.push(eachCourse.courseName);
          break;
      }
    });
  });
  //最後再把節次轉換成北科正確的格式
  tableData.forEach((item, index) => {
    item.period = NTUTcoursePeriod[index];
  });
  console.log("處理完畢", tableData);
  finalData.value = tableData;
}

</script>

<template>
  <a-space size="middle">
    <h2>選擇學生課表</h2>
    <a-select style="width: 120px">
      <a-select-option value="TEST">TEST</a-select-option>
    </a-select>
  </a-space>

  <a-spin :spinning="finalData == null">
    <a-table :columns="columns" :data-source="finalData" bordered :pagination="false"></a-table>
  </a-spin>
</template>
 
<style scoped></style>
  