<template>
    <div class="reverse">
        <el-card class="mainContent" :style="{ backgroundColor: isDark ? '#303030' : '#ecefff' }" shadow="always"
            @click="focusEditable">
            <div class="content">
                <span @click="updateCommand">🚀</span>
                <span ref="editable" contenteditable class="editable"></span>
            </div>
        </el-card>
        <div class="options">
            <el-select v-model="shell" filterable placeholder="Select" style="width: 120px">
                <el-option v-for="item in shellsOptions" :key="item.value" :label="item.label" :value="item.value"
                    @click="updateCommand(currentShellCommand)" />
            </el-select>
            <el-select v-model="encoding" filterable placeholder="Select" style="width: 120px">
                <el-option v-for="item in encodingsOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
    </div>
</template>

<script setup lang='js'>
import { ref, defineExpose } from 'vue'
import { useDark } from '@vueuse/core'
import { shells, encodings, reverseShellCommands } from '../../utils/myData'
import { useDataStore } from '../../store/data';
const dataStore = useDataStore()
const isDark = useDark()
const currentShellCommand = ref('sh')
const editable = ref(null)

function focusEditable() {
    if (editable.value) {
        editable.value.focus()
    }
}
const shell = ref('powershell')
const encoding = ref('None')
const shellsOptions = shells.map(shell => ({
    value: shell,
    label: shell,
}))
const encodingsOptions = encodings.map(shell => ({
    value: shell,
    label: shell,
}))
function updateCommand(commandName) {
    if (!commandName)
        return
    currentShellCommand.value = commandName
    let command = reverseShellCommands.find(item => item.name === commandName).command
    if (!command)
        return
    command = dataStore.rsg.highlightParameters(command)
    command = command.replace('{port}', dataStore.rsg.getPort())
    command = command.replace('{ip}', dataStore.rsg.getIP())
    command = command.replace('{payload}', dataStore.rsg.getPayload())
    command = command.replace('{type}', dataStore.rsg.getType())
    command = command.replace('{shell}', shell.value)
    editable.value.innerHTML = command
    console.log(command)
}
defineExpose({
    updateCommand
})
</script>

<style lang="scss" scoped>
.reverse {
    display: flex;
    flex-direction: column;
    padding: 10px 0 0 20px;

    .mainContent {
        flex:8;

        /* 其他样式 */
        cursor: text;
        /* 鼠标指针变为文本选择 */
    }

    .content {
        max-height: 350px;
        overflow-y: auto;
        display: flex;
        align-items: flex-start;
        /* 确保文本在顶部对齐 */
    }

    .editable {
        outline: none;
        /* 移除编辑时的边框 */
        flex: 1;
        /* 使文本区域占据剩余空间 */
        word-break: break-word;
        /* 确保长单词换行 */
        white-space: pre-wrap;
        /* 保留空白符并换行 */
    }
    .options{
        flex:2;
        display: flex;
        justify-content: space-between;
        padding: 10px 0 0 0;
    }
}
</style>