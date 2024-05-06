<template>
    <div class="bg-secondary rounded-lg px-4 py-3 flex flex-col jusitfy-between shadow-lg">
        <div class="h-full">
            <div class="flex justify-between">
                <h3 class="heading-3">{{ snippit.title }}</h3>
                <i :class="iconClass" class="text-2xl" :title="snippit.language"></i>
            </div>
            <p class="mt-2">{{ snippit.description }}</p>
        </div>
        <div class="flex justify-between items-center mt-4 border-t dark:border-slate-600 border-slate-400 pt-4">
            <div class="flex gap-2">
                <button class="btn btn-icon" title="Preview Code" @click="openPreview">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-icon" title="Copy Code to clipboard" @click="copyToClipboard">
                    <i v-if="!copied" class="bi bi-copy"></i>
                    <i v-else class="bi bi-clipboard-check"></i>
                </button>
            </div>
        </div>
    </div>
    <DialogModal :show="showModal" @close="showModal = false" maxWidth="4xl">
        <template v-slot:title>
            <h3 class="heading-3">{{ snippit.title }}</h3>
        </template>
        <template v-slot:content>
            <Codeeditor :snippit="snippit" />
        </template>
        <template v-slot:footer>
            <Link class="textlink" :href="'#'">Edit snippit</Link>
            <button class="btn btn-icon" title="Copy Code to clipboard" @click="copyToClipboard">
                    <i v-if="!copied" class="bi bi-copy"></i>
                    <i v-else class="bi bi-clipboard-check"></i>
                </button>
            <!-- <button class="btn" @click="showModal = false">Close</button> -->
        </template>
    </DialogModal>
</template>
<script setup>
import { computed, ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import DialogModal from '@/Components/DialogModal.vue';
import Codeeditor from '@/Comp/Snippits/Codeeditor.vue';
const props = defineProps({
    snippit: Object
})

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
    ]
    let value = props.snippit.language
    const found = exceptions.find(exception => exception.original === props.snippit.language)
    if(found){
        value = found.replacement
    }
    return `devicon-${value}-plain`
})

// function to copy code to clipboard
const copyToClipboard = () => {
    navigator.clipboard.writeText(props.snippit.code)
    copied.value = true
    setTimeout(() => {
        copied.value = false
    }, 2000)
}

const copied = ref(false)
</script>