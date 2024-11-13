<!-- 代办的事务，不合法端口和ip的检测 -->
<!-- port的高亮 -->
<template>
    <el-card class="mainBoard">
        <div class="theme">
            <el-text class="mx-1" type="info">theme</el-text>
            <el-switch v-model="isDark" :active-icon="Moon" :inactive-icon="Sunny" inline-prompt @change="toggleDark" />
        </div>
        <div class="title">
            <el-text class="mx-1">Reverse Shell Generator</el-text>
        </div>
        <div class="setting">
            <div class="ipAndPort">
                <el-card class="custom-card">
                    <div class="header">
                        <span>IP & Port</span>
                    </div>
                    <div class="content">
                        <el-input v-model="dataStore.ip" style="width: 190px" placeholder="ip">
                            <template #prepend>IP</template>
                        </el-input>
                        <div class="port">
                            <el-input v-model="dataStore.port" style="width: 190px" placeholder="port"
                                @input="updateListener">
                                <template #prepend>PORT</template>
                            </el-input>
                            <el-button style="width: 10px;" @click="imcrement">+1</el-button>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="listener">
                <el-card class="custom-card">
                    <div class="header">
                        <span>Listener</span>
                        <el-switch v-model="value1" />
                    </div>
                    <div class="content">
                        <el-input v-model="textarea2" style="width: 450px" :autosize="{ minRows: 2, maxRows: 8 }"
                            type="textarea" placeholder="Please input" />
                        <el-select v-model="value" placeholder="Select" size="large"
                            style="width: 200px;margin-top: 10px;" v-if="value1" @change="updateListener">
                            <el-option v-for="item in listenerCommands" :key="item.type" :label="item.type"
                                :value="item.type" />
                        </el-select>
                        <div class="copy">
                            <el-button type="primary" style="width: 100px;margin-top: 10px;"
                                @click="copyToClipboard">COPY</el-button>
                        </div>

                    </div>
                </el-card>
            </div>
        </div>
    </el-card>
</template>

<script setup lang='js'>

import { ref } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core'
import { useDataStore } from '../store/data';
import listenerCommandsData from '../assets/json/listenerCommands.json'
import { ElMessage } from 'element-plus'
const dataStore = useDataStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const value1 = ref(true)
const textarea2 = ref('')
const value = ref('')
const listenerCommands = ref(listenerCommandsData) // 正确引用导入的 JSON 数据
function updateListener() {
    const selectedCommand = listenerCommands.value.find(item => item.type === value.value)
    if (selectedCommand) {
        const [text1, text2] = selectedCommand.result.split('{port}')
        const port = dataStore.port
        textarea2.value = text1 + port + text2
    }
}

function imcrement() {
    dataStore.imcrement()
    updateListener()
}
function copyToClipboard() {
    navigator.clipboard.writeText(textarea2.value).then(() => {
        ElMessage({
            type: 'success',
            message: 'Copy successfully!',
            duration: 1000
        })
    }).catch(err => {
        ElMessage.error({
            message: 'Copy failed!',
            duration: 1000
        })
    })
}
</script>

<style lang="scss" scoped>
.mainBoard {
    display: flex;
    width: 1200px;
    min-width: 600px;
    height: 800px;
    border-radius: 15px;
    flex-direction: column;

    .theme {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .mx-1 {
            margin-right: 20px;
        }
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: center;

        .mx-1 {
            font-size: 35px;
        }
    }

    .setting {
        display: flex;
        justify-content: space-evenly;
        /* 确保两个卡片之间有间距 */
        margin-top: 16px;
        flex: 1;
        flex-wrap: wrap;
        /* 使设置区域填满剩余空间 */

        .ipAndPort,
        .listener {
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;


            .header {
                margin-bottom: 20px;
            }

            .content {
                display: flex;
                justify-content: space-evenly;
                flex: 1;
                /* 使内容区域填满卡片 */
            }
        }

        .ipAndPort {
            .port {
                display: flex;
                align-items: center;
            }
        }

        .listener {
            .header {
                display: flex;
                justify-content: space-between;
                line-height: 20px;
            }

            .content {
                display: flex;
                flex-direction: column;
            }
        }

        .copy {
            display: flex;
            justify-content: end;
            margin-top: 10px;
        }
    }

    .custom-card {
        width: 500px;
        display: flex;
        flex-direction: column;
        flex: 1;
        /* 使卡片等高 */
    }
}
</style>