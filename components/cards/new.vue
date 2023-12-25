<script lang="tsx" setup>
//我也不熟 jsx 跟 tsx ，反正就是讓 script 可以塞 HTML 的酷東西

interface ClassInfo {
    key: string;
    className: string;
    classDate: ClassDate[];
}

interface ClassDate {
    weekDay: number;
    classPeriod: number;
}

function renderClassItems(classItems: string[]) {
    return (
        <div>
            {classItems.map((item) => {
                return <div>{item}</div>;
            })}
        </div>
    );
}

//課程表table的欄位格式
const columns = [
    {
        title: '',
        className: 'classPeriod',
        dataIndex: 'classPeriod',
        width: 50,
    },
    {
        title: '星期一',
        className: 'week',
        dataIndex: 'monday',
        customRender: ({ text }: { text: string[] }) => renderClassItems(text)
    },
    {
        title: '星期二',
        className: 'week',
        dataIndex: 'tuesday',
        customRender: ({ text }: { text: string[] }) => renderClassItems(text)
    },
    {
        title: '星期三',
        className: 'week',
        dataIndex: 'wednesday',
        customRender: ({ text }: { text: string[] }) => renderClassItems(text)
    },
    {
        title: '星期四',
        className: 'week',
        dataIndex: 'thursday',
        customRender: ({ text }: { text: string[] }) => renderClassItems(text)
    },
    {
        title: '星期五',
        className: 'week',
        dataIndex: 'friday',
        customRender: ({ text }: { text: string[] }) => renderClassItems(text)
    },
];

interface tableData {
    key: string;
    classPeriod: string;
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
}

const newDate = ref<tableData[]>([]);

//模擬從DB取得的資料
const newColmns: ClassInfo[] = [
    {
        key: '1',
        className: '課程 A',
        classDate: [
            {
                weekDay: 1,
                classPeriod: 1,
            },
            {
                weekDay: 1,
                classPeriod: 2,
            },
            {
                weekDay: 1,
                classPeriod: 3,
            },
        ],
    },
    {
        key: '2',
        className: '課程 B',
        classDate: [
            {
                weekDay: 4,
                classPeriod: 2,
            },
        ],
    },
    {
        key: '3',
        className: '課程 C',
        classDate: [
            {
                weekDay: 2,
                classPeriod: 3,
            },
        ],
    },
    {
        key: '4',
        className: '課程 D',
        classDate: [
            {
                weekDay: 1,
                classPeriod: 4,
            },
        ],
    },
    {
        key: '5',
        className: '課程 E',
        classDate: [
            {
                weekDay: 3,
                classPeriod: 5,
            },
        ],
    },
    {
        key: '6',
        className: '課程 F',
        classDate: [
            {
                weekDay: 5,
                classPeriod: 6,
            },
        ],
    },
    {
        key: '7',
        className: '課程 G',
        classDate: [
            {
                weekDay: 4,
                classPeriod: 7,
            },
        ],
    },
    {
        key: '8',
        className: '課程 H',
        classDate: [
            {
                weekDay: 2,
                classPeriod: 8,
            },
        ],
    },
    {
        key: '9',
        className: '課程 I',
        classDate: [
            {
                weekDay: 1,
                classPeriod: 9,
            },
        ],
    },
    {
        key: '10',
        className: '課程 J',
        classDate: [
            {
                weekDay: 3,
                classPeriod: 10,
            },
        ],
    },
    {
        key: '11',
        className: '課程 A1',
        classDate: [
            {
                weekDay: 1,
                classPeriod: 1,
            },
            {
                weekDay: 1,
                classPeriod: 2,
            },
            {
                weekDay: 1,
                classPeriod: 3,
            },
        ],
    },
    {
        key: '12',
        className: '課程 DTV',
        classDate: [
            {
                weekDay: 5,
                classPeriod: 12,
            },
            {
                weekDay: 5,
                classPeriod: 13,
            },
            {
                weekDay: 5,
                classPeriod: 14,
            },
        ],
    },
];

ClassInfoToTableData(newColmns);

function ClassInfoToTableData(classIndos: ClassInfo[]): void {
    const tableData: tableData[] = [];

    // 資料型態的節次        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
    const NTUTClassPeriod = ['1', '2', '3', '4', 'N', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D'];

    //初始化每周的節次表
    for (let i = 0; i < NTUTClassPeriod.length; i++) {
        tableData.push({
            key: i.toString(),
            classPeriod: (i + 1).toString(),
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
        });
    }
    console.log("初始化", tableData);

    //分別將課程資料填入對應的節次表
    classIndos.forEach((eachClass) => {
        eachClass.classDate.forEach((eachclassDate) => {
            switch (eachclassDate.weekDay) {
                case 1:
                    tableData[eachclassDate.classPeriod - 1].monday.push(eachClass.className);
                    break;
                case 2:
                    tableData[eachclassDate.classPeriod - 1].tuesday.push(eachClass.className);
                    break;
                case 3:
                    tableData[eachclassDate.classPeriod - 1].wednesday.push(eachClass.className);
                    break;
                case 4:
                    tableData[eachclassDate.classPeriod - 1].thursday.push(eachClass.className);
                    break;
                case 5:
                    tableData[eachclassDate.classPeriod - 1].friday.push(eachClass.className);
                    break;
            }
        });
    });
    //最後再把節次轉換成北科正確的格式
    tableData.forEach((item, index) => {
        item.classPeriod = NTUTClassPeriod[index];
    });
    console.log("處理完畢", tableData);
    newDate.value = tableData;
}

</script>

<template>
    <a-spin :spinning="newDate == null">
        <a-table :columns="columns" :data-source="newDate" bordered :pagination="false"></a-table>
    </a-spin>
</template>
 
<style scoped></style>
  