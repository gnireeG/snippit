<template>
    <div>
        <div class="flex flex-col">
            <button v-if="root" class="text-left px-1 py-0.5" @click="openRoot(folders)"><i class="bi bi-house-door-fill"></i> Home</button>
            <div v-for="folder in folders" class="pl-1 mt-0.5">
                <div class="flex gap-2 text-sm whitespace-nowrap px-1 py-0.5 rounded-md" :class="[openedFolder.id == folder.id ? 'bg-secondary' : 'bg-primary hover']">
                    <button @click="loadSubfolders(folder)" class="transform transition-transform py-0.5" :class="[folder.showSubfolders ? 'rotate-90' : '']">
                            <i class="bi bi-caret-right-fill"></i>
                    </button>
                    <button :title="folder.name" @click="openFolder(folder)" class="w-full text-left truncate">{{ folder.name }}</button>
                </div>
                <div v-if="folder.subfolders && folder.subfolders.length > 0 && folder.showSubfolders" class="pl-1">
                    <FolderSelector :folders="folder.subfolders" :openedFolder="openedFolder" @onFolderLoad="handleOnFolderLoad($event)" @addSubfolder="handleAddSubFolder($event)" />
                </div>
                <div class="pl-3" v-if="folder.showSubfolders">
                    <form @submit.prevent="()=>{addSubfolder(folder, folder.newSubfolderName);folder.newSubfolderName = ''}" class="flex gap-1">
                        <button type="submit" title="Add folder"><i class="bi bi-folder-plus"></i></button>
                        <input type="text" class="bg-transparent border-0 p-0.5 flex-grow focus:ring-0 focus:outline-none min-w-11" placeholder="Add new folder" v-model="folder.newSubfolderName">
                    </form>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3';

import http from '@/http';
const emit = defineEmits(['onFolderLoad', 'addSubfolder'])

const props = defineProps({
    folders: {
        type: Object,
        required: true
    },
    openedFolder: {
        type: Object,
        default: {
            slug: ''
        }
    },
    root: {
        type: Boolean,
        default: false
    }
})

function addSubfolder(parent, newFolderName){

    emit('addSubfolder', {parent, newFolderName})
}
function handleAddSubFolder(event){
    //console.log(event.parent, event.newFolderName)
    addSubfolder(event.parent, event.newFolderName)
}

function loadSubfolders(folder){
    // Load subfolders if they are not already loaded
    if (!folder.subfolders && !folder.loading) {
        folder.loading = true
        http.get(route('app.folders.loadSubfoldersById', {folderId: folder.id}))
            .then(response => {
                folder.subfolders = response.data
                folder.showSubfolders = true
                folder.loading = false
            })
    } else {
        folder.showSubfolders = !folder.showSubfolders
    }
}

function openRoot(){
    http.get(route('app.folders.loadRootFolder'))
        .then(response => {
            emit('onFolderLoad', response.data)
            window.history.pushState({}, '', '/folder')
        })
}

function openFolder(folder){
    http.get(route('app.folders.loadFolderWithContent', {folderId: folder.id}))
        .then(response => {
            let path = '/folder/'
            response.data.path.forEach(folder => {
                path += folder.slug + '/'
            })
            emit('onFolderLoad', response.data)
            window.history.pushState({}, '', path)
            //router.visit(path)
        })
}

function handleOnFolderLoad(folder){
    emit('onFolderLoad', folder)
}
</script>