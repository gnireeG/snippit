<template>
    <AppLayout :title="form.title || 'Create new Snippit'">
        <div>
            <div class="flex gap-4 mt-8 w-100 max-w-full flex-col lg:flex-row">
                <div class="bg-secondary p-4 rounded-md shadow-md w-full lg:w-96 flex flex-col gap-2 flex-shrink-0">
                    <InputComponent v-model="form.title" type="text" placeholder="Title" label="Title" required />
                    <InputComponent v-model="form.description" type="textarea" placeholder="Description" label="Description" required />
                    <InputSearch v-model="form.language" placeholder="Language" label="Language" :choices="langChoices" @select="changeLanguage" />
                    <p class="mt-2">Location</p>
                    <p class="text-gray-500">
                        <span class="whitespace-nowrap" v-for="(pathItem, index) in path">{{ pathItem.name }}<i v-if="index < path.length - 1" class="bi bi-chevron-right text-sm px-1.5"></i></span>
                    </p>
                    <div class="flex justify-end w-full">
                        <button class="btn btn-primary" @click="save">Save Snippit</button>
                    </div>
                </div>
                <div class="bg-secondary rounded-md shadow-md flex-grow editor-container overflow-hidden p-4">
                    <!-- <ShikiMonaco :snippit="form" @update:snippit="onUpdate($event)" /> -->
                    <CodeMirror @updateCode="onUpdate($event)" :snippit="form" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { onMounted, reactive, ref, computed, watch, watchEffect, onUnmounted } from 'vue';
//import ShikiMonaco from '@/Comp/Codeeditors/ShikiMonaco.vue';
import CodeMirror from '@/Comp/Codeeditors/CodeMirror.vue';
import InputComponent from '@/Comp/Form/InputComponent.vue';
import InputSearch from '@/Comp/Form/InputSearch.vue';
import { router, usePage } from '@inertiajs/vue3'




function save(){
    console.log(isNewSnippit.value)
    if(form.title.length > 3){
        if(isNewSnippit.value){
            router.post(route('app.snippit.store'), form)
        } else{
            router.post(route('app.snippit.update'), form)
        }
    }
}

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

const isNewSnippit = computed(() =>{
    return props.snippit === null
})

watch(isNewSnippit, (value) =>{
    populateForm()
})
const form = reactive({
    title: '',
    description: '',
    code: '',
    language: '',
    folder_id: null,
    id: null
})

const langChoices = ref([
    { id: 'javascript', name: 'JavaScript' },
    { id: 'php', name: 'PHP' },
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' },
    { id: 'go', name: 'Go' },
    { id: 'rust', name: 'Rust' },
    { id: 'json', name: 'JSON' },
    { id: 'xml', name: 'XML' },
    { id: 'markdown', name: 'Markdown' },
    { id: 'sql', name: 'SQL' },
    { id: 'yaml', name: 'YAML' },
    { id: 'liquid', name: 'Liquid' },
    { id: 'less', name: 'Less' },
    { id: 'vue', name: 'Vue' },
    { id: 'sass', name: 'Sass' },
    { id: 'angular', name: 'Angular' },
    { id: 'lezer', name: 'Lezer' },
    { id: 'wast', name: 'Wast' },
    { id: 'plaintext', name: 'Plaintext'}
].sort((a, b) => a.name.localeCompare(b.name)))

function changeLanguage(language){
    form.language = language.id
}

onMounted(() =>{
    populateForm()
    document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() =>{
    document.removeEventListener('keydown', handleKeyDown)
})

function populateForm(){
    form.folder_id = props.parentFolder.id
    if(props.snippit){
        form.title = props.snippit.title
        form.description = props.snippit.description
        form.code = props.snippit.code
        form.language = props.snippit.language
        form.id = props.snippit.id
    }
}

function handleKeyDown(e){
    if(e.key === 's' && e.ctrlKey){
        e.preventDefault()
        save()
    }
}
</script>