<script setup>
import { ref } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import InputComponent from '@/Comp/Form/InputComponent.vue';
import InputTag from '@/Comp/Form/InputTag.vue';
import InputToggle from '@/Comp/Form/InputToggle.vue';
import { router } from '@inertiajs/vue3'
import { onMounted } from 'vue'
import SnippitCard from '@/Comp/Snippits/SnippitCard.vue';

const props = defineProps({
    snippits: {
        type: Object,
        default: null
    }
})

const searchVal = ref('')
const tags = ref([])
const searchTitle = ref(true)
const searchDescription = ref(false)
const searchCode = ref(false)

function search(){
    router.visit(route('app.search'), {
        method: 'get',
        data: {
            q: searchVal.value,
            tags: tags.value.join(','),
            title: searchTitle.value,
            description: searchDescription.value,
            code: searchCode.value
        }
    })
    
}

onMounted(() =>{
    // fill the forms from the url params
    const params = new URLSearchParams(window.location.search)
    searchVal.value = params.get('q') || ''
    tags.value = params.get('tags') ? params.get('tags').split(',') : []
    searchTitle.value = params.get('title') === 'true' || !params.has('title')
    searchDescription.value = params.get('description') === 'true'
    searchCode.value = params.get('code') === 'true'

})

</script>

<template>
    <AppLayout title="Snippit App">
        <div>
            <h1 class="heading-1">Search</h1>
            <div class="mt-4 flex gap-4">
                <div>
                    <InputComponent @enter="search" v-model="searchVal" placeholder="Search" label="Search" type="text" bgClass="bg-primary" class="mb-4" autofocus />
                    <!-- <h2 class="heading-2">Search in</h2> -->
                    <div class="flex gap-4">
                        <InputToggle v-model="searchTitle" label="Title" />
                        <InputToggle v-model="searchDescription" label="Description" />
                        <InputToggle v-model="searchCode" label="Code" />
                    </div>
                </div>
                <InputTag :tags="tags" @update="tags = $event" placeholder="Tags" label="Tags" bgClass="bg-primary" />
                <div class="flex items-center">
                    <button @click="search" class="btn btn-primary">Search</button>
                </div>
            </div>
            <div class="mt-4">
                <p>Search results: {{ snippits.length }}</p>
                <div class="autogrid gap-4 w-full mt-4">
                    <template v-for="snippit in snippits" >
                        <SnippitCard :snippit="snippit" :draggable="true" :deleteAble="true" />
                    </template>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
