<template>
    <el-card shadow="always">
        <template #header>
            <div class="card-header">
                <div class="topBar">
                    <span class="OS">OS</span>
                    <!-- <el-select v-model="os" placeholder="Select" size="default" style="width: 100px;" class="select">
                        <el-option v-for="item in osList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select> -->

                    <el-select class=select v-model="os" :empty-values="[null, undefined]" :value-on-clear="null"
                        clearable placeholder="Select" style="width: 100px" @clear="handleClear">
                        <el-option v-for="item in osList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <span>Name</span>
                    <el-input class=input v-model="name" placeholder="Name" size="large"></el-input>
                    <el-switch class="switch" v-model="isDark" :active-icon="Moon" :inactive-icon="Sunny" inline-prompt
                        @change="toggleDark" />
                    <el-button type="primary" @click="generate">Generate</el-button>
                </div>
            </div>
        </template>
    </el-card>

</template>

<script setup lang='js'>
import { ref } from 'vue'
const name = ref('')
const os = ref('')

const osList = [
    {
        value: '',
        label: 'All',
    },
    {
        value: 'Linux',
        label: 'Linux',
    },
    {
        value: 'Windows',
        label: 'Windows',
    },
    {
        value: 'Mac',
        label: 'Mac',
    },
]
</script>

<style lang="scss" scoped>
.topbar {
    display: flex;
}

.card {
    // width: 100%;
    height: 100%;
    background-color: gray;
}

span,
.select,
.input,
.switch {
    margin-right: 20px;
}

.input {
    min-width: 200px;
    max-width: 450px;
}
</style>