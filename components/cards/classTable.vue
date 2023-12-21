<script setup lang="ts">

</script>

<template>
    <div class="timetable">

        <!-- 左上角空白 -->
        <div class="corner"></div>

        <!-- 周一至周五 -->
        <div class="header">一</div>
        <div class="header">二</div>
        <div class="header">三</div>
        <div class="header">四</div>
        <div class="header">五</div>

        <!-- 第一列：課程節次 -->
        <div class="sidebar">1</div>
        <div class="sidebar">2</div>
        <div class="sidebar">3</div>
        <div class="sidebar">4</div>
        <div class="sidebar">N</div>
        <div class="sidebar">5</div>
        <div class="sidebar">6</div>
        <div class="sidebar">7</div>
        <div class="sidebar">8</div>
        <div class="sidebar">9</div>
        <div class="sidebar">A</div>
        <div class="sidebar">B</div>
        <div class="sidebar">C</div>
        <div class="sidebar">D</div>

        <!-- 課程格 -->
        <div class="grid-item">課程 A </div>
        <div class="grid-item">課程 B</div>
        <div class="grid-item">課程 C</div>

    </div>
</template>

<style scoped>
.timetable {
    display: grid;
    grid-template-columns: 60px repeat(5, 1fr);
    /* 第一列為課表標籤，五個等寬的課程列 */
    grid-template-rows: 30px repeat(14, 1fr);
    /* 第一行為星期標籤，14個等高的時間行 */
    gap: 10px;
    padding: 10px;
    background-color: #E0E0E0;
    max-width: 1024px;
    max-height: 700px;
    justify-content: center;
    align-items: center;
    border: 1px solid;
}

.corner {
    grid-column: 1;
    grid-row: 1;
}

.header {
    /* 星期設定 */
    background-color: #333;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    height: 30px;
    border-bottom: 1px solid #ccc;
}

.sidebar {
    /* 課表設定 */
    background-color: #333;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    height: 30px;
    width: 60px;
    grid-column: 1;
    border-bottom: 1px solid #ccc;
}

/* 課程方格 */
.grid-item {
    background-color: #ADFEDC;
    color: black;
    border-radius: 5px;
    padding: 20px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
     /* 需要设置具体的 grid-column 和 grid-row 以定位课程 */
}

.sidebar, .grid-item:last-child {
  border-right: none;
}

.header:last-of-type, .grid-item:last-child {
  border-bottom: none;
}
</style>
