<script lang="ts" setup>

</script>

<template>
    <h1>開發語言</h1>
    <a-space size="middle">
        <NuxtImg src="/images/ts.png" width="200" />
        <a-space direction="vertical">
            <a-typography-text strong>TypeScript 是 JavaScript 的超集，由 Microsoft 開發，</a-typography-text>
            <a-typography-text strong>它新增了靜態類型定義，使得開發大型專案時，能更容易進行維護與偵錯，</a-typography-text>
            <a-typography-text strong>TypeScript 最終會被編譯為純 JavaScript，可在任何瀏覽器或 Node.js 環境中執行。</a-typography-text>
        </a-space>
    </a-space>
    <a-divider />

    <h1>前端使用框架</h1>
    <a-space size="middle">
        <NuxtImg src="/images/AntDVue.jpg" width="200" />
        <a-space direction="vertical">
            <a-typography-text strong>Ant Design Vue 是一套基於 Ant Design 的 Vue.js UI 框架(當然Nuxt.js也兼容)，</a-typography-text>
            <a-typography-text strong>它提供了豐富的 Vue 組件，適用於構建高品質的介面，且支持快速的元件設定，廣泛應用於企業級專案後臺開發，</a-typography-text>
            <a-typography-text strong>最近剛更新 4.0.8，開發者為中國的螞蟻金服團隊，故有較多中文社群支援。</a-typography-text>
        </a-space>
    </a-space>
    <a-divider />
    <a-space size="middle">
        <NuxtImg src="/images/Nuxt.png" width="200" />
        <a-space direction="vertical">
            <a-typography-text strong>Nuxt3 是一個基於 Vue.js 的框架，用於構建更有效率的 Vue 相關專案，</a-typography-text>
            <a-typography-text strong>它集成了伺服器端渲染(SSR)、靜態站點生成等功能，使開發過 Vue 的 Devloper 上手更快速，</a-typography-text>
            <a-typography-text strong>提供更快的渲染速度和更好的SEO優化，適合開發現代化的網頁專案。</a-typography-text>
        </a-space>
    </a-space>
    <a-divider />

    <h1>DBMS使用工具</h1>
    <a-space size="middle">
        <NuxtImg src="/images/Mongo.png" width="200" />
        <a-space direction="vertical">
            <a-typography-text strong>MongoDB 是一種基於 Document 的 NoSQL 資料庫，支持高度靈活的資料格式，</a-typography-text>
            <a-typography-text strong>它允許儲存 JSON 樣式的文檔，使數據結構可以隨需求變化，且有多樣的GUI可使用</a-typography-text>
            <a-typography-text strong>MongoDB 適用於處理大規模數據集，提供高效能、易於擴展的解決方案。它廣泛應用於大數據、實時應用及雲計算等領域。</a-typography-text>
        </a-space>
    </a-space>
    <a-divider />

    <h1>網域URL轉發工具</h1>

    <a-space size="middle">
        <NuxtImg src="/images/cloudfare.png" width="200" />
        <a-space direction="vertical">
            <a-typography-text strong>CloudFlare 是一家提供全球性網絡服務的公司，其 CloudFlare Tunnel 功能允許安全地連線網路資源到 CloudFlare 的網路，</a-typography-text>
            <a-typography-text strong>目前此網站所使用的網域名稱正是向 CloudFlare 購買的，利用架設的 CloudFlare Tunnel 可以防止網站 Ip 裸奔，</a-typography-text>
            <a-typography-text strong>且無需公開 IP 或進行複雜的配置，就能保護與加速網站訪問，同時避免 DDoS 攻擊和資料泄露，保障網站基礎安全。</a-typography-text>
        </a-space>
    </a-space>
</template>

<style scoped></style>
