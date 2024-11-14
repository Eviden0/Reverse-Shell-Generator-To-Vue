import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useDataStore = defineStore('Data', () => {
    const ip = ref('10.10.10.10')
    const port = ref(9000)
    function imcrement() {
        this.port++
    }
    return { ip, port, imcrement }
})