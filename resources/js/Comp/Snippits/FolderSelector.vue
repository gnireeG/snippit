<template>
    <div>
        <div class="flex flex-col">
            <div v-for="folder in folders">
                <div class="flex gap-2 text-sm whitespace-nowrap px-1" :class="[openedFolder.slug == folder.slug ? 'bg-red-500' : '']">
                    <button @click="loadSubfolders(folder)" class="transform transition-transform" :class="[folder.showSubfolders ? 'rotate-90' : '']">
                            <i class="bi bi-caret-right-fill"></i>
                    </button>
                    <button @click="openFolder(folder)" class="w-full text-left">{{ folder.name }}</button>
                </div>
                <div v-if="folder.subfolders && folder.subfolders.length > 0 && folder.showSubfolders" class="ml-2">
                    <FolderSelector :folders="folder.subfolders" :openedFolder="openedFolder" @onFolderLoad="handleOnFolderLoad($event)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue'

const emit = defineEmits(['onFolderLoad'])

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
    }
})

function loadSubfolders(folder){
    // Load subfolders if they are not already loaded
    if (!folder.subfolders && !folder.loading) {
        folder.loading = true
        axios.get(route('app.folders.loadSubfoldersById', {folderId: folder.id}))
            .then(response => {
                folder.subfolders = response.data
                folder.showSubfolders = true
                folder.loading = false
            })
    } else {
        folder.showSubfolders = !folder.showSubfolders
    }
}

function openFolder(folder){
    axios.get(route('app.folders.loadFolderWithContent', {folderId: folder.id}))
        .then(response => {
            let path = '/folder/'
            response.data.path.forEach(folder => {
                path += folder.slug + '/'
            })
            emit('onFolderLoad', response.data.folder)
            window.history.pushState({}, '', path)
        })
}

function handleOnFolderLoad(folder){
    emit('onFolderLoad', folder)
}
</script>