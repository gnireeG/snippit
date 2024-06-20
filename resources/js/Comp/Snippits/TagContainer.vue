<template>
    <div class="flex gap-1 flex-wrap" v-if="tags.length > 0">
        <Link v-for="tag in tags" :key="tag.id" :href="route('app.search') + '?tags=' + tag.name.en" class="rounded-md border border-gray-500 px-1.5 py-0.5 text-sm bg-secondary hover transition-colors">#{{ tag.name.en }}</Link>
    </div>
</template>
<script setup>
import { Link } from '@inertiajs/vue3'
const props = defineProps({
    tags: {
        type: Array,
        default: []
    }
})
</script>