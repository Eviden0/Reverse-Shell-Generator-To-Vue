import { ref } from 'vue'
import { defineStore } from "pinia";
export const useNavStore = defineStore('Nav', () => {
    const nav = ref('Reverse')
    const command = ref('')
    function setNav(value) {
        nav.value = value
    }
    function setCommand(value) {
        command.value = value
    }
    return { nav, setNav, command, setCommand }
});