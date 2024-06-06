<template>
    <div class="fixed bottom-4 right-4 flex flex-col gap-2">
        <div v-for="alert in store.state.alerts" class="flex">
            <div class="p-3 rounded-l-lg flex items-center" :class="bgclass(alert.type)"><i class="bi text-xl text-slate-900" :class="iconclass(alert.type)"></i></div>
            <div class="p-3 bg-primary-inverted w-56 text-sm flex items-center"><span class="text-gray-600">{{ alert.message }}</span></div>
            <div class="p-3 rounded-r-lg bg-primary-inverted flex items-center"><button title="Dismiss alert" @click="store.commit('removeAlert', alert)"><i class="bi bi-x text-xl text-slate-900"></i></button></div>
        </div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';

const store = useStore();

function bgclass(type){
    switch(type){
        case 'success':
            return 'bg-green-500';
        case 'error':
            return 'bg-red-500';
        case 'warning':
            return 'bg-yellow-500';
        case 'info':
            return 'bg-blue-500';
    }
}

function iconclass(type){
    switch(type){
        case 'success':
            return 'bi-check-circle-fill';
        case 'error':
            return 'bi-x-circle-fill';
        case 'warning':
            return 'bi-exclamation-circle-fill';
        case 'info':
            return 'bi-info-circle-fill';
    }
}
</script>