export const periodAdjust: { [key: number]: string } = {
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

export const courseListColumns = [
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
