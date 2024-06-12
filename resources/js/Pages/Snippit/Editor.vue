<template>
    <AppLayout title="Create new Snippit">
        <div>
            <h1 class="heading-1">Create New Snippit</h1>
            <div class="flex gap-4 mt-8 w-100 max-w-full flex-col lg:flex-row">
                <div class="bg-secondary p-4 rounded-md shadow-md w-full lg:w-96 flex flex-col gap-2">
                    <InputComponent v-model="form.title" type="text" placeholder="Title" label="Title" required />
                    <InputComponent v-model="form.description" type="textarea" placeholder="Description" label="Description" required />
                    <InputSearch v-model="form.language" placeholder="Language" label="Language" :choices="langChoices" @select="changeLanguage" />
                    <p class="mt-2">Snippit will be saved in:</p>
                    <p class="text-gray-500">
                        <span class="whitespace-nowrap" v-for="(pathItem, index) in path">{{ pathItem.name }}<i v-if="index < path.length - 1" class="bi bi-chevron-right text-sm px-1.5"></i></span>
                    </p>
                </div>
                <div class="bg-secondary rounded-md shadow-md flex-grow editor-container overflow-hidden p-4">
                    <ShikiMonaco :snippit="form" @update:snippit="onUpdate($event)" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { onMounted, reactive, ref } from 'vue';
import ShikiMonaco from '@/Comp/Codeeditors/ShikiMonaco.vue';
import InputComponent from '@/Comp/Form/InputComponent.vue';
import InputSearch from '@/Comp/Form/InputSearch.vue';
function onUpdate(event){
    form.code = event.code
}

const props = defineProps({
    snippit: {
        type: Object,
        required: false,
        default: null
    },
    parentFolder: {
        type: Object,
        required: true
    },
    path: {
        type: Object,
        required: true
    }
})

const form = reactive({
    title: '',
    description: '',
    code: '',
    language: 'css',
    folder_id: null
})

const langChoices = ref([
    { id: 'javascript', name: 'JavaScript' },
    { id: 'php', name: 'PHP' },
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
    { id: 'scss', name: 'SCSS' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'csharp', name: 'C#' },
    { id: 'c', name: 'C' },
    { id: 'cpp', name: 'C++' },
    { id: 'ruby', name: 'Ruby' },
    { id: 'go', name: 'Go' },
    { id: 'swift', name: 'Swift' },
    { id: 'kotlin', name: 'Kotlin' },
    { id: 'rust', name: 'Rust' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'dart', name: 'Dart' },
    { id: 'shell', name: 'Shell' },
    { id: 'powershell', name: 'PowerShell' },
    { id: 'plaintext', name: 'Plain Text'}
])

function changeLanguage(language){
    form.language = language.id
}

onMounted(() =>{
    form.folder_id = props.parentFolder.id
})
</script>