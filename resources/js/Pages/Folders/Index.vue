<script setup>
import { onMounted, ref } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import FolderSelector from '@/Comp/Snippits/FolderSelector.vue';
import SnippitCard from '@/Comp/Snippits/SnippitCard.vue';
const props = defineProps({
    folder: Object,
    path: Object
})

const folderLocal = ref(props.folder)

function handleOnFolderLoad(folder){
    console.log(folder)
    folderLocal.value = folder
}
/* onMounted(() =>{
    console.log(props.path)
}) */
</script>

<template>
    <AppLayout title="Folders">
        <div class="p-8">
            <h1 class="heading-1">Hello {{ $page.props.auth.user.name }}</h1>
            <p class="text-lg mt-2">You are currently in the <b class="italic">{{ $page.props.auth.user.current_team.name }}</b> team.</p>
            <p>{{ folderLocal.name }}</p>
            <button @click="folder.name = 'hallo'">test</button>
            <div class="flex gap-4 relative mt-8">
                <div class="sticky top-0">
                    <FolderSelector :folders="path.subfolders" @onFolderLoad="handleOnFolderLoad($event)" :openedFolder="folderLocal" />
                </div>
                <div class="autogrid gap-4 w-full">
                    <template v-for="snippit in folderLocal.snippits">
                        <SnippitCard :snippit="snippit" />
                    </template>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
