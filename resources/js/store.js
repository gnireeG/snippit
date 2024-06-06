import { createStore } from 'vuex';

const store = createStore({
    state(){
        return {
            theme: 'light',
            alerts: [
                /* {type: 'success', message: 'This is a success alert. This is a success alert. This is a success alert. This is a success alert'},
                {type: 'error', message: 'This is an error alert'},
                {type: 'warning', message: 'This is a warning alert'},
                {type: 'info', message: 'This is an info alert'}, */
            ]
        }

    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
        },
        addAlert(state, alert){
            state.alerts.push(alert);
    
            setTimeout(() => {
                this.commit('removeAlert', alert);
            }, 10000); // remove after 10 seconds
        },
        removeAlert(state, alert){
            const index = state.alerts.indexOf(alert);
            if (index !== -1) {
                state.alerts.splice(index, 1);
            }
        }
    },
    getters: {
        theme(state) {
            return state.theme;
        }
    }
});

export default store;