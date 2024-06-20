<template>
    <div :class="[root ? 'py-2' : '']">
        <div class="flex flex-col">
            <Link @dragover.prevent @drop="handleDrop($event, store.state.path.id)" v-if="root" :href="route('app.folders.index')" class="inline"><i class="bi bi-house-door-fill"></i> Home</Link>
            <div v-for="folder in folders" class="pl-1 mt-0.5" @dragover.prevent @drop="handleDrop($event, folder.id)">
                <div class="flex items-center gap-2 text-sm whitespace-nowrap px-1 py-0.5 rounded-md group" :class="[store.state.currentFolder.id == folder.id ? 'bg-secondary' : 'bg-primary hover']">
                    <button title="Load subfolders" @click="loadSubfolders(folder)" class="transform transition-transform py-0.5" :class="[folder.showSubfolders ? 'rotate-90' : '']">
                            <i class="bi bi-caret-right-fill"></i>
                    </button>
                    <button :title="folder.name" @click="openFolder(folder)" class="w-full text-left truncate">{{ folder.name }}</button>
                    <Dropdown align="right" width="28" class="md:opacity-0 md:group-hover:opacity-100">
                        <template #trigger>
                            <button title="Options" class="px-1"><i class="bi bi-three-dots"></i></button>
                        </template>
                        <template #content>
                            <div class="rounded-lg p-2 flex">
                                <button class="btn btn-transparent w-full" title="Rename folder"><i class="bi bi-input-cursor-text text-lg"></i></button>
                                <button class="btn btn-transparent w-full" title="Delete folder" @click="showDeleteFolderModal(folder)"><i class="bi bi-trash2 text-lg"></i></button>
                            </div>
                        </template>
                    </Dropdown>
                </div>
                <div v-if="folder.subfolders && folder.subfolders.length > 0 && folder.showSubfolders" class="pl-1">
                    <FolderSelector :folders="folder.subfolders" @navigate="emit('navigate')" />
                </div>
                <div class="pl-3" v-if="folder.showSubfolders">
                    <form @submit.prevent="()=>{addSubfolder(folder.id, folder.newSubfolderName);folder.newSubfolderName = ''}" class="flex gap-1">
                        <button type="submit" title="Add folder"><i class="bi bi-folder-plus"></i></button>
                        <input type="text" class="bg-transparent border-0 p-0.5 flex-grow focus:ring-0 focus:outline-none min-w-11" placeholder="Add new folder" v-model="folder.newSubfolderName">
                    </form>
                </div>
                
            </div>
            <form v-if="root" @submit.prevent="()=>{addSubfolder(false, topNewFolderName);topNewFolderName = ''}" class="flex gap-1 pl-2">
                <button type="submit" title="Add folder"><i class="bi bi-folder-plus"></i></button>
                <input type="text" class="bg-transparent border-0 p-0.5 flex-grow focus:ring-0 focus:outline-none min-w-11" placeholder="Add new folder" v-model="topNewFolderName">
            </form>
        </div>
    </div>
    <DialogModal :show="deleteFolderModal" @close="cancelDeleteFolder" maxWidth="xl">
        <template v-slot:title>
            <h3 class="heading-3">Delete folder</h3>
        </template>
        <template v-slot:content>
            <p>Are you sure you want to delete the folder <b>{{ deleteFolder.name }}</b>?</p>
            <p>All contents, including subfolders and Snippits will be deleted permanently.</p>
        </template>
        <template v-slot:footer>
            <button class="btn" @click="cancelDeleteFolder">Cancel</button>
            <button class="btn btn-danger" @click="confirmDeleteFolder">Delete</button>
        </template>

    </DialogModal>
</template>

<script setup>
import { ref } from 'vue'
import { router, Link } from '@inertiajs/vue3';
import Dropdown from '@/Components/Dropdown.vue';
import DialogModal from '@/Components/DialogModal.vue';
import http from '@/http';
import store from '@/store';


const props = defineProps({
    folders: {
        type: Object,
        required: true
    },
    root: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['navigate'])

// DELETE FOLDER

const deleteFolderModal = ref(false)
const deleteFolder = ref(null)

const topNewFolderName = ref('')

function showDeleteFolderModal(folder){
    deleteFolder.value = folder
    deleteFolderModal.value = true
}

function cancelDeleteFolder(){
    deleteFolderModal.value = false
}

function confirmDeleteFolder(){
    if(deleteFolder.value){
        http.delete(route('app.folders.delete', {folder_id: deleteFolder.value.id}))
        .then(response => {
            if(response.status == 200) {
                deleteFolderModal.value = false
                store.commit('deleteFolder', response.data.deleted_folder)
                store.commit('addAlert', {type: 'success', message: response.data.message})
                if(store.state.currentFolder.id == response.data.deleted_folder.id){
                    router.visit(route('app.folders.index'))
                }
            }
        })
    }
}


function addSubfolder(parentID, newFolderName){
    if(parentID){
        submitNewFolder(parentID, newFolderName)
    } else{
        let rootFolderId = store.state.path.id
        submitNewFolder(rootFolderId, newFolderName)
    }
}

function submitNewFolder(parent, newFolder){

    http.post(route('app.folders.create'), {parent_id: parent, name: newFolder}).then(response => {
        store.commit('addNewFolder', {folder: response.data, parentID: parent})
    })
}

function loadSubfolders(folder){
    // Load subfolders if they are not already loaded
    if (!folder.subfolders && !folder.loading) {
        folder.loading = true
        http.get(route('app.folders.loadSubfoldersById', {folderId: folder.id}))
            .then(response => {
                store.commit('addLoadedSubfolders', {subfolders: response.data, parentID: folder.id})
            })
    } else {
        folder.showSubfolders = !folder.showSubfolders
    }
}


function openFolder(folder){
    http.get(route('app.folders.loadFolderWithContent', {folderId: folder.id}))
        .then(response => {
            let path = '/app/folder/'
            response.data.path.forEach((folder, i) => {
                //dont add the slash on the end
                if(i < response.data.path.length - 1){
                    path += folder.slug + '/'
                } else{
                    path += folder.slug
                }
            })
            window.history.pushState({}, '', path)
            store.commit('updateCurrentFolder', response.data.folder)
            emit('navigate')
        })
}

function handleDrop(e, folderId){
    e.stopPropagation()
    const event = e.dataTransfer.getData('event')
    const snippitId = e.dataTransfer.getData('snippitId')
    console.log(event, snippitId, folderId)
    http.post(route('app.snippit.move'), {snippit_id: snippitId, folder_id: folderId})
        .then((response)=>{
            if(response.status == 200){
                store.commit('addAlert', {type: 'success', message: response.data.message})
                store.commit('removeSnippit', {snippitId: snippitId, folderId: folderId})
            }
        })
}
</script>