import store from 'store2'
import Vue from 'vue'

export default {
    get: key => {
        return store(`${process.env.VUE_APP_LOCALSTORAGE}_${key}`)
    },
    set: (key, data) => {
        store(`${process.env.VUE_APP_LOCALSTORAGE}_${key}`, data)
    },
    clear: key => {
        store.remove(`${process.env.VUE_APP_LOCALSTORAGE}_${key}`)
    },
    clearall: () => {
        store.clearAll()
    }
}
