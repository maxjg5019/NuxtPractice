<script lang="ts" setup>
const columns = [
    {
        title: '',
        className: 'class',
        dataIndex: 'class',
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

const data = [
    {
        key: '1',
        class: '1',
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: '課程 A',

    },
    {
        key: '2',
        class: '2',
        thursday: '課程 B',
    },
    {
        key: '3',
        class: '3',
        tuesday: '課程 C',
    },
    {
        key: '4',
        class: '4',
        monday: '課程 D',
    },
    {
        key: '5',
        class: 'N',
        wednesday: '課程 E',
    },
    {
        key: '6',
        class: '5',
        friday: '課程 F',
    },
    {
        key: '7',
        class: '6',
        thursday: '課程 G',
    },
    {
        key: '8',
        class: '7',
        tuesday: '課程 H',
    },
    {
        key: '9',
        class: '8',
        monday: '課程 I',
    },
    {
        key: '10',
        class: '9',
        wednesday: '課程 J',
    },
    {
        key: '11',
        class: 'A',
        friday: '課程 K',
    },
    {
        key: '12',
        class: 'B',
        thursday: '課程 L',
    },
    {
        key: '13',
        class: 'C',
        tuesday: '課程 M',
    },
    {
        key: '14',
        class: 'D',
        monday: '課程 N',
    },
];
</script>

<template>
    <a-spin :spinning="data == null">

        <a-table :columns="columns" :data-source="data" bordered :pagination="false" class="table">

        </a-table>
        
    </a-spin>
</template>
 
<style scoped>
.table {
    width: 100%;
    height: 100%;
    font-weight: bold;
}
</style>
  