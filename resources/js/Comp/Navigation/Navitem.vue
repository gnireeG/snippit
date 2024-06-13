<template>
    <Link :href="route(routeName)" :title="title"
    class="relative flex gap-2 items-center px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors" 
    :class="[route().current(routeName) ? 'bg-gray-50 dark:bg-slate-800 before:absolute before:h-full before:w-1 before:bg-slate-800 dark:before:bg-gray-200 before:left-0 before:top-0' : '']">
        <i v-if="icon" class="text-xl bi px-2" :class="icon"></i>
        <p :class="expand ? 'opacity-100' : 'opacity-0'" class="transition-opacity duration-500"><slot /></p>
    </Link>
</template>
<script setup>
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