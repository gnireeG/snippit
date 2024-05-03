<template>
    <Link :href="route(routeName)" :title="title" class="flex gap-2 items-center px-4 py-1.5 hover:bg-gray-200 dark:hover:bg-slate-900 transition-colors"  :class="[route().current(routeName) ? 'bg-gray-200 dark:bg-slate-900' : '']">
        <i v-if="icon" class="text-xl bi px-2" :class="icon"></i>
        <p :class="expand ? 'opacity-100' : 'opacity-0'" class="transition-opacity duration-500"><slot /></p>
    </Link>
</template>
<script setup>
import { defineProps } from 'vue';
import { Link } from '@inertiajs/vue3'
const props = defineProps({
    routeName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: true
    },
    expand: {
        type: Boolean,
        required: true
    }
});
   
</script>