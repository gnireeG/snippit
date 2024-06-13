<template>
    <div v-if="store.state.path" class="flex gap-2">
        <Link :href="route('app.folders.index')">Home</Link><i class="bi bi-chevron-right"></i>
        <template v-for="(elem, index) in path">
            <Link :href="elem.pathSlug">{{ elem.name }}</Link><i v-if="index !== path.length - 1" class="bi bi-chevron-right"></i>
        </template>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Link } from '@inertiajs/vue3';
const store = useStore()

const path = computed(() => {
    let simplePath = store.getters.simplePath;
    if(simplePath){
        simplePath.shift();
        simplePath = simplePath.map((folder, index) => {
            const pathSlug = '/folder/' + simplePath.slice(0, index + 1).map(f => f.slug).join('/');
            return { ...folder, pathSlug };
        });
        return simplePath;
    }
    return [];
})
</script>