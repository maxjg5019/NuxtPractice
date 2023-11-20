<script setup lang="ts">

const point = ref(10);
const {count} = useAddCount()
const {count2} = useAddCount2()
console.log(process.client);
if(process.client){
    console.log(localStorage);
}
let sum:number = 0;
function getsum(msg:string){
    alert('Hello !' + msg )
}
onMounted(() =>{
});

</script>

<template>
    <h1>page's own {{ point }}</h1>
    <h1>call fucn 1 num {{ count }}</h1>
    <h1>call fucn 2 num {{ count2 }}</h1>
    <button @click="getsum('people')">people</button>
    <button @click="getsum('Man')">Man</button>
</template>

<style scoped>

</style>
