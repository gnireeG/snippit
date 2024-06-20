<template>
    <div class="bg-secondary rounded-lg px-4 py-3 flex flex-col jusitfy-between shadow-lg snippit-card" v-show="searchValue.length < 1 || snippit.title.toLowerCase().includes(searchValue.toLowerCase())">
        <Link :href="route('app.snippit.showEdit', {id: snippit.id})" class="h-full">
            <div class="flex justify-between">
                <h3 class="heading-3">{{ snippit.title }}</h3>
                <i :class="iconClass" class="text-2xl devicon" :title="snippit.language"></i>
            </div>
            <p class="mt-2">{{ snippit.description }}</p>
        </Link>
        <div v-if="snippit.tags" class="mt-2">
            <TagContainer :tags="snippit.tags" />
        </div>
        <div class="flex justify-between items-center mt-4 border-t dark:border-slate-600 border-slate-400 pt-4">
            <div class="flex gap-2">
                <button class="btn btn-icon" title="Preview Code" @click="openPreview">
                    <i class="bi bi-eye"></i>
                </button>
                <template v-if="clipBoardAllowed">
                    <button class="btn btn-icon" title="Copy Code to clipboard" @click="copyToClipboard">
                        <i v-if="!copied" class="bi bi-copy"></i>
                        <i v-else class="bi bi-clipboard-check"></i>
                    </button>
                </template>
                <button v-if="deleteAble" class="btn btn-icon" title="Delete Snippit" @click="showDeleteModal = true">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
            <div title="Move Snippit to another folder" :class="[draggable ? 'cursor-move' : '']" :draggable="draggable" @dragstart="handleDragStart" v-if="draggable"><i class="bi bi-folder-symlink"></i></div>
        </div>
    </div>
    <DialogModal :show="showModal" @close="showModal = false" maxWidth="4xl">
        <template v-slot:title>
            <h3 class="heading-3">{{ snippit.title }}</h3>
        </template>
        <template v-slot:content>
            <div class="bg-slate-50 text-gray-800 h-[75vh]">
                <CodeMirror :snippit="snippit" :readonly="true" />
                <!-- <ShikiMonaco :snippit="snippit" @update:snippit="onUpdate($event)" /> -->
            </div>
        </template>
        <template v-slot:footer>
            <Link class="textlink" :href="route('app.snippit.showEdit', {id: snippit.id})">Edit snippit</Link>
            <template v-if="clipBoardAllowed">
                <button class="btn btn-icon" title="Copy Code to clipboard" @click="copyToClipboard">
                        <i v-if="!copied" class="bi bi-copy"></i>
                        <i v-else class="bi bi-clipboard-check"></i>
                    </button>
                <!-- <button class="btn" @click="showModal = false">Close</button> -->
            </template>
        </template>
    </DialogModal>
    <DialogModal :show="showDeleteModal" @close="showDeleteModal = false" maxWidth="lg">
        <template v-slot:title>
            <h3 class="heading-3">Delete Snippit</h3>
        </template>
        <template v-slot:content>
            <p>Are you sure you want to delete this snippit?</p>
        </template>
        <template v-slot:footer>
            <button class="btn" @click="showDeleteModal = false">Cancel</button>
            <button class="btn btn-danger" @click="deleteSnippit">Delete</button>
        </template>
    </DialogModal>
</template>
<script setup>
import { computed, ref, shallowRef } from 'vue';
import { Link } from '@inertiajs/vue3';
import DialogModal from '@/Components/DialogModal.vue';
import TagContainer from '@/Comp/Snippits/TagContainer.vue';
import CodeMirror from '@/Comp/Codeeditors/CodeMirror.vue';
//import ShikiMonaco from '@/Comp/Codeeditors/ShikiMonaco.vue';
import { useStore } from 'vuex';
import http from '@/http';
const store = useStore()
const props = defineProps({
    snippit: Object,
    draggable: {
        type: Boolean,
        default: false
    },
    deleteAble: {
        type: Boolean,
        default: false
    },
    searchValue: {
        type: String,
        default: ''
    }
})

function onUpdate(event){
    
}

function handleDragStart(e){
    e.dataTransfer.setData('event', 'moveSnippit')
    e.dataTransfer.setData('snippitId', props.snippit.id)
    // Get the card element
    let card = e.target.closest('.snippit-card');

    // Create a ghostImage of the card
    let ghostImage = card.querySelector('.devicon').cloneNode(true);
    
    document.body.appendChild(ghostImage);
    ghostImage.style.position = 'fixed';
    ghostImage.style.width = `${ghostImage.offsetWidth}px`;
    ghostImage.style.height = `${ghostImage.offsetHeight}px`;
    e.dataTransfer.setDragImage(ghostImage, 5, 5);

    // Remove the ghostImage from the body after the drag ends
    e.dataTransfer.onend = function() {
      document.body.removeChild(ghostImage);
      e.target.style.opacity = '';
      card.style.opacity = '1'
    };
}

// computed property to check if the user is allowed to copy code to clipboard
const clipBoardAllowed = computed(() => {
    return navigator.clipboard ? true : false
})

// function to copy code to clipboard
const copyToClipboard = () => {
    navigator.clipboard.writeText(props.snippit.code)
    copied.value = true
    setTimeout(() => {
        copied.value = false
    }, 2000)
}

// reactive variable to show/hide modal
const showModal = ref(false)
function openPreview(){
    showModal.value = true
}

// computed property to get the icon class
const iconClass = computed(() => {
    // replace language names with devicon names if it's not the same
    const exceptions = [
        {original: 'css', replacement: 'css3'},
        {original: 'html', replacement: 'html5'},
        {original: 'c++', replacement: 'cplusplus'},
    ]
    let value = props.snippit.language
    const found = exceptions.find(exception => exception.original === props.snippit.language)
    if(found){
        value = found.replacement
    }
    return `devicon-${value}-plain colored`
})

const showDeleteModal = ref(false)
function deleteSnippit(){
    showDeleteModal.value = false
    http.delete(route('app.snippit.destroy', {id: props.snippit.id}))
        .then(response => {
            console.log(response)
            store.commit('removeSnippit', {snippitId: props.snippit.id})
            store.commit('addAlert', {type: 'success', message: response.data.message})
        })
        
}

const copied = ref(false)
</script>