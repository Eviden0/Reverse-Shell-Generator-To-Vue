<template>
    <div class="Nav">
        <el-segmented v-model="value" :options="options" size="large" />
        <Card />
    </div>


</template>

<script setup lang='ts'>
import Card from './Card.vue';
import { ref } from 'vue'

const value = ref('Mon')

const options = [
    'Reverse',
    'Config',
    'Role',
    'fourth',
]

</script>

<style lang="scss" scoped>
.Nav {
    width: 100%;
    padding: 0 52px;
}
</style>