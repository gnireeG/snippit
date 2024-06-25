<script setup>
import { ref } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import InputComponent from '@/Comp/Form/InputComponent.vue';
import InputTag from '@/Comp/Form/InputTag.vue';
import InputToggle from '@/Comp/Form/InputToggle.vue';
import { router } from '@inertiajs/vue3'
import { onMounted } from 'vue'
import SnippitCard from '@/Comp/Snippits/SnippitCard.vue';
import Expandable from '@/Comp/Expandable.vue';

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
const showMore = ref(false)

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

    if(tags.value.length > 0 || searchDescription.value || searchCode.value){
        showMore.value = true
    }

})

</script>

<template>
    <AppLayout title="Snippit App">
        <div>
            <h1 class="heading-1">Search</h1>
            <div class="mt-4 flex gap-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
                <div class="flex-grow">
                    <InputComponent @enter="search" v-model="searchVal" placeholder="Search" label="Search" type="text" bgClass="bg-primary" class="mb-4 w-full" autofocus />
                    <!-- <h2 class="heading-2">Search in</h2> -->
                </div>
                
                <div class="flex items-start">
                    <button @click="search" class="btn btn-primary mt-6">Search</button>
                </div>
            </div>
            <div class="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
                <Expandable title="More options" :show="showMore" @toggle="showMore = !showMore">
                    <div class="md:flex gap-16 py-2">
                        <div class="flex flex-col gap-2">
                            <p>Search in:</p>
                            <div class="flex flex-row md:flex-col gap-2">
                                <InputToggle v-model="searchTitle" label="Title" />
                                <InputToggle v-model="searchDescription" label="Description" />
                                <InputToggle v-model="searchCode" label="Code" />
                            </div>
                        </div>
                        <div class="flex-grow">
                            <InputTag :tags="tags" @update="tags = $event" placeholder="Tags" label="Tags" bgClass="bg-primary" />
                        </div>
                    </div>
                </Expandable>
            </div>
            <div class="mt-4">
                <p v-if="snippits">Search results: {{ snippits.length }}</p>
                <div class="autogrid gap-4 w-full mt-4">
                    <template v-for="snippit in snippits" >
                        <SnippitCard :snippit="snippit" />
                    </template>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
