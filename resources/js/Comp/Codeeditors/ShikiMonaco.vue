<template>
    <div id="editor" class="h-full w-full"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect, watch } from 'vue';
import { getHighlighter } from 'shiki';
import { shikiToMonaco } from '@shikijs/monaco';
import * as monaco from 'monaco-editor-core';
import { useStore } from 'vuex';

const emit = defineEmits(['update:snippit']);

const store = useStore();

const props = defineProps({
    snippit: {
        type: Object,
        required: true
    },
    readonly: {
        type: Boolean,
        default: false
    }
})

self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        return URL.createObjectURL(new Blob([`
            self.MonacoEnvironment = {
                baseUrl: 'https://unpkg.com/monaco-editor@0.20.0/min/'
            };
            importScripts('https://unpkg.com/monaco-editor@0.20.0/min/vs/base/worker/workerMain.js');
        `], { type: 'text/javascript' }));
    }
};

let highlighter;
let editor;

onMounted(async () => {
    createEditor();
});

watch(() => props.snippit.language, () => {
    if (editor) {
        // Dispose the old editor
        editor.dispose();

        // Create a new editor with the new language
        createEditor();
    }
});

async function createEditor() {
    let localLang = props.snippit.language;
    if(!localLang){
        localLang = 'plaintext';
    }
    
    highlighter = await getHighlighter({
        themes: ['github-dark', 'github-light'],
        langs: [localLang],
    });
    monaco.languages.register({ id: localLang });

    shikiToMonaco(highlighter, monaco);

    editor = monaco.editor.create(document.querySelector('#editor'), {
        value: props.snippit.code,
        language: localLang,
        theme: store.state.theme === 'dark' ? 'github-dark' : 'github-light',
        readOnly: props.readonly,
        automaticLayout: true,
        autoIndent: 'full',
        matchBrackets: 'always'
    });

    monaco.editor.setModelLanguage(editor.getModel(), localLang);

    editor.onDidChangeModelContent(() => {
        emit('update:snippit', { code: editor.getValue(), language: localLang });
    });
}


watchEffect(( )=>{
    if(editor){
        editor.layout()
    }
})

onBeforeUnmount(() => {
    if (editor) {
        editor.dispose();
    }
});

</script>

