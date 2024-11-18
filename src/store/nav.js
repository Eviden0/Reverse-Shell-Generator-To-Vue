import { ref } from 'vue'
import { defineStore } from "pinia";
export const useNavStore = defineStore('Nav', () => {
    const nav = ref('Reverse')
    function setNav(value) {
        nav.value = value
    }
    return { nav, setNav }
});