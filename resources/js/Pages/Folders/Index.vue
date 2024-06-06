<script setup>
import { onMounted, ref, computed } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import FolderSelector from '@/Comp/Snippits/FolderSelector.vue';
import SnippitCard from '@/Comp/Snippits/SnippitCard.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DialogModal from '@/Components/DialogModal.vue';
import InputText from '@/Comp/Form/InputText.vue';
import { Link } from '@inertiajs/vue3';
import http from '@/http';


const props = defineProps({
    folder: Object,
    path: Object,
    simplePath: Object
})

const folderLocal = ref(props.folder)
const pathLocal = ref(props.path)
const simplePathLocal = ref(props.simplePath);

const simplePathTransformed = computed(() =>{
    let arr = []
    if(!simplePathLocal.value) return arr;
    arr = simplePathLocal.value.map((folder, index, array) => {
        return {
            ...folder,
            path: array.slice(0, index + 1).map(f => f.slug).join('/')
        };
    });
    arr.pop()
    return arr
})


function handleOnFolderLoad(data){
    console.log(data.path)
    folderLocal.value = data.folder
    simplePathLocal.value = data.path
}

const newFolderModal = ref(false)
const newFolderName = ref('')

function addNewFolder(){
    console.log(folderLocal.value)
    submitNewFolder(folderLocal.value, newFolderName.value)
}

function submitNewFolder(parent, newFolder){

    http.post(route('app.folders.create'), {parent_id: parent.id, name: newFolder}).then(response => {
        const newFolder = response.data;
        // Find the parent folder in pathLocal
        const parentFolder = findFolderInPath(pathLocal.value, newFolder.parent_id);
        // If parent folder is found, push the new folder into its subfolders array
        if (parentFolder) {
            if(parentFolder.subfolders){
                parentFolder.subfolders.push(newFolder);
            }
        }
        // Close the modal
        newFolderModal.value = false;
        newFolderName.value = '';
    })
}

// Recursive function to find a folder in the path by its id
function findFolderInPath(folder, id) {
    if (folder.id === id) {
        return folder;
    }
    if(folder.subfolders){
        for (let i = 0; i < folder.subfolders.length; i++) {
            const foundFolder = findFolderInPath(folder.subfolders[i], id);
            if (foundFolder) {
                return foundFolder;
            }
        }
    }

    return null;
}

function handleAddSubFolder(event){
    submitNewFolder(event.parent, event.newFolderName)
}

</script>

<template>
    <AppLayout title="Folders">
        <div class="p-8">
            <div class="flex gap-4 relative mt-8">
                <div class="min-w-64 flex-grow">
                    <div class="top-0 sticky">
                        <FolderSelector :folders="pathLocal.subfolders" @onFolderLoad="handleOnFolderLoad($event)" :openedFolder="folderLocal" :root="true" @addSubfolder="handleAddSubFolder($event)"/>
                    </div>
                </div>
                <div class="w-full">
                    <div class="flex justify-between">
                        <div>
                            <p class="text-sm mb-2">
                                <Link :href="route('app.folders.index')" class="inline">Home</Link><span class="text-gray-500">&nbsp;/&nbsp;</span>
                                <template v-for="folder in simplePathTransformed">
                                    <Link :href="'/folder/' + folder.path" class="inline">{{ folder.name }}</Link>
                                    <span class="text-gray-500">&nbsp;/&nbsp;</span>
                                </template>
                            </p>
                            <h1 class="heading-1">{{ folderLocal.name }}</h1>
                        </div>
                        <Dropdown align="right" width="48">
                            <template #trigger>
                                <button class="btn">New <i class="bi bi-plus-lg"></i></button>
                            </template>
                            <template #content>
                                <div class="rounded-lg p-2">
                                    <button class="btn btn-transparent w-full"><i class="bi bi-code-slash"></i>&nbsp;Snippit</button>
                                    <button class="btn btn-transparent w-full" @click="newFolderModal = true"><i class="bi bi-folder"></i>&nbsp;Folder</button>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="autogrid gap-4 w-full mt-4">
                        <template v-for="snippit in folderLocal.snippits">
                            <SnippitCard :snippit="snippit" />
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <DialogModal :show="newFolderModal" @close="newFolderModal = false" maxWidth="xl">
            <template v-slot:title>
            <h3 class="heading-3">New Folder</h3>
            </template>
            <template v-slot:content>
                <div>
                    <InputText v-model="newFolderName" label="Folder Name" />
                </div>
            </template>
            <template v-slot:footer>
                <button @click="newFolderModal = false" class="textlink" :href="'#'">Cancel</button>
                <button class="btn" :disabled="newFolderName.length < 3" @click="addNewFolder">Save</button>
            </template>
        </DialogModal>
    </AppLayout>
</template>
