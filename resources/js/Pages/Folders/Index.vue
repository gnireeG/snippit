<script setup>
import { onMounted, ref, computed, reactive } from 'vue';
import { Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import FolderSelector from '@/Comp/Snippits/FolderSelector.vue';
import SnippitCard from '@/Comp/Snippits/SnippitCard.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DialogModal from '@/Components/DialogModal.vue';
import InputText from '@/Comp/Form/InputComponent.vue';
import FolderBreadcrumbs from '@/Comp/Snippits/FolderBreadcrumbs.vue';
import http from '@/http';
import { useStore } from 'vuex';

const store = useStore()

const props = defineProps({
    folder: Object,
    path: Object,
    simplePath: Object
})

onMounted(() =>{
    store.commit('initFolderData', {
        currentFolder: props.folder,
        path: props.path
    })
})


const newFolderModal = ref(false)
const newFolderName = ref('')

function submitNewFolder(){
    if(newFolderName.value.length < 3) return
    http.post(route('app.folders.create'), {parent_id: store.state.currentFolder.id, name: newFolderName.value}).then(response => {
        store.commit('addNewFolder', {folder: response.data, parentID: store.state.currentFolder.id})
    })
    // Close the modal
    newFolderModal.value = false;
    newFolderName.value = '';

}
</script>

<template>
    <AppLayout title="Folders">
        <div>
            <div class="flex gap-4 relative flex-col md:flex-row">
                <div class="min-w-64 flex-grow">
                    <div class="top-0 sticky max-h-48 md:max-h-none overflow-y-auto">
                        <FolderSelector v-if="store.state.path" :root="true" :folders="store.state.path.subfolders" />
                    </div>
                </div>
                <div class="w-full mt-8">
                    <div class="flex justify-between">
                        <div>
                            <p class="text-sm mb-2">
                                <FolderBreadcrumbs />
                            </p>
                            <h1 class="heading-1" v-if="store.state.currentFolder">{{ store.state.currentFolder.name }}</h1>
                            <h1 class="heading-1" v-else>Root</h1>
                        </div>
                        <Dropdown align="right" width="48">
                            <template #trigger>
                                <button class="btn">New <i class="bi bi-plus-lg"></i></button>
                            </template>
                            <template #content>
                                <div class="rounded-lg p-2">
                                    <Link v-if="store.state.currentFolder" :href="route('app.snippit.showCreate') + '?folder_id=' + store.state.currentFolder.id" class="btn btn-transparent w-full block text-center"><i class="bi bi-code-slash"></i>&nbsp;Snippit</Link>
                                    <button class="btn btn-transparent w-full" @click="newFolderModal = true"><i class="bi bi-folder"></i>&nbsp;Folder</button>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="autogrid gap-4 w-full mt-4">
                        <template v-if="store.state.currentFolder">
                            <template v-for="snippit in store.state.currentFolder.snippits">
                                <SnippitCard :snippit="snippit" />
                            </template>
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
                    <form @submit.prevent="submitNewFolder">
                        <InputText v-model="newFolderName" label="Folder Name" />
                    </form>
                </div>
            </template>
            <template v-slot:footer>
                <button @click="newFolderModal = false" class="textlink">Cancel</button>
                <button class="btn" :disabled="newFolderName.length < 3" @click="submitNewFolder">Save</button>
            </template>
        </DialogModal>
    </AppLayout>
</template>
