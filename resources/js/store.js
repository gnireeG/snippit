import { createStore } from 'vuex';

const store = createStore({
    state(){
        return {
            theme: 'light',
            alerts: []
        }

    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
        }
    },
    getters: {
        theme(state) {
            return state.theme;
        }
    }
});

export default store;